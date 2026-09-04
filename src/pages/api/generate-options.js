/**
 * Native Astro API Route: /api/generate-options
 * Server-side endpoint for Gemini AI preset generation.
 * Compatible with local Astro dev server and Cloudflare Pages runtime.
 */

export const prerender = false;

// Configurable model constant at top of file (fastest production flash model)
const GEMINI_MODEL = 'gemini-flash-latest';

// In-memory rate limiting map: ip -> array of request timestamps (5 req / min / IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Checks and updates rate limit for a client IP
 */
function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const timestamps = rateLimitMap.get(ip) || [];
  // Filter timestamps within current window
  const activeTimestamps = timestamps.filter((t) => t > windowStart);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, activeTimestamps);
    return true;
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);

  // Periodically clean up stale IPs if map gets large
  if (rateLimitMap.size > 10000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => t <= windowStart)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

/**
 * Robustly parses and cleans an array of option strings from Gemini output
 */
function parseOptionsArray(rawText, expectedCount) {
  if (!rawText || typeof rawText !== 'string') return null;

  try {
    // 1. Strip markdown fences if present
    let cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    // 2. Fallback regex to extract array or object
    const parsed = JSON.parse(cleaned);
    let rawList = null;

    if (Array.isArray(parsed)) {
      rawList = parsed;
    } else if (parsed && Array.isArray(parsed.options)) {
      rawList = parsed.options;
    } else {
      // Try regex for JSON array
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (match) {
        const arr = JSON.parse(match[0]);
        if (Array.isArray(arr)) rawList = arr;
      }
    }

    if (!Array.isArray(rawList)) return null;

    // 3. Clean, filter and trim options (max 24 chars each)
    const validOptions = rawList
      .map((item) => String(item || '').trim())
      .filter((item) => item.length > 0)
      .map((item) => item.slice(0, 24));

    // Deduplicate case-insensitively while preserving original casing
    const seen = new Set();
    const uniqueOptions = [];
    for (const opt of validOptions) {
      const lower = opt.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        uniqueOptions.push(opt);
      }
    }

    // Must have between 4 and 12 options
    if (uniqueOptions.length < 4) return null;

    return uniqueOptions.slice(0, Math.min(12, Math.max(4, expectedCount)));
  } catch (e) {
    return null;
  }
}

/**
 * Executes a call to Google Gemini REST API with header-based authentication and 25s timeout guard
 */
async function callGeminiApi(apiKey, prompt, count, temperature = 1.0, lang = 'en') {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  const validLangs = {
    en: 'English',
    pt: 'Brazilian Portuguese',
    id: 'Indonesian',
    ar: 'Arabic',
  };
  const validatedLang = validLangs[lang] ? lang : 'en';
  const langName = validLangs[validatedLang];
  const langInstruction = ` Respond ONLY in ${langName}.`;

  const fullText = `Return a JSON array of ${count} short, distinct option strings (1-3 words each) for: "${prompt}".${langInstruction}`;

  const payload = {
    contents: [
      {
        parts: [{ text: fullText }],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature,
      maxOutputTokens: 200,
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.json().catch(() => null);
      return {
        ok: false,
        status: response.status,
        errorBody: errBody,
      };
    }

    const json = await response.json();
    const candidateText =
      json?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return { ok: true, status: response.status, text: candidateText };
  } catch (err) {
    clearTimeout(timeoutId);
    return { ok: false, status: 0, error: err };
  }
}

/**
 * Astro API POST Handler: /api/generate-options
 */
export const POST = async ({ request, locals }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  // 1. Check client IP rate limit (5 req/min/IP)
  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '127.0.0.1';

  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({
        error:
          'Too many requests. Please wait a minute before generating more options.',
        reason: 'rate_limit',
      }),
      { status: 429, headers }
    );
  }

  // 2. Validate environment variable:
  // On Cloudflare Workers: locals.runtime.env.GEMINI_API_KEY
  // In local dev: import.meta.env.GEMINI_API_KEY or process.env.GEMINI_API_KEY
  const apiKey =
    locals?.runtime?.env?.GEMINI_API_KEY ||
    import.meta.env?.GEMINI_API_KEY ||
    (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'Server is not configured with an API key. Please check GEMINI_API_KEY in Cloudflare settings.',
        reason: 'server_config',
      }),
      { status: 500, headers }
    );
  }

  // 3. Parse and validate request JSON body
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON payload provided.', reason: 'invalid_request' }),
      { status: 400, headers }
    );
  }

  const rawPrompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
  const count = Math.max(4, Math.min(12, parseInt(body?.count, 10) || 6));
  const rawLang = typeof body?.lang === 'string' ? body.lang.toLowerCase().trim() : 'en';
  const lang = ['en', 'pt', 'id', 'ar'].includes(rawLang) ? rawLang : 'en';

  // Prompt validation: 3-120 chars
  if (!rawPrompt || rawPrompt.length < 3 || rawPrompt.length > 120) {
    return new Response(
      JSON.stringify({
        error:
          'Please enter a topic description between 3 and 120 characters (e.g. "what to eat for dinner").',
        reason: 'invalid_prompt',
      }),
      { status: 400, headers }
    );
  }

  // Reject gibberish / repetitive characters (e.g. "aaa", ".....")
  const isRepetitive = /^([\p{L}\p{N}])\1{3,}$/iu.test(rawPrompt);
  const hasNoLettersOrDigits = /^[^\p{L}\p{N}]+$/u.test(rawPrompt);
  if (isRepetitive || hasNoLettersOrDigits) {
    return new Response(
      JSON.stringify({
        error:
          'Please enter a descriptive prompt with recognizable words (e.g. "board games", "healthy snacks").',
        reason: 'invalid_prompt',
      }),
      { status: 400, headers }
    );
  }

  // 4. Call Gemini REST API directly (fast model, minimal prompt)
  let result = await callGeminiApi(apiKey, rawPrompt, count, 1.0, lang);

  // If 404 model not found, log server-side (never leaking key) and return 502
  if (!result.ok && result.status === 404) {
    const errorMsg = result.errorBody?.error?.message || 'Unknown error';
    console.error(`[Gemini API Error] Status 404: ${errorMsg} (Model: ${GEMINI_MODEL})`);
    return new Response(
      JSON.stringify({
        error: 'AI model configuration error — please check GEMINI_MODEL.',
        reason: 'model_not_found',
      }),
      { status: 502, headers }
    );
  }

  let parsedOptions = result.ok ? parseOptionsArray(result.text, count) : null;

  // Auto-retry once with lower temperature if output was invalid or unparseable
  if (!parsedOptions && result.status !== 404 && result.error?.name !== 'AbortError') {
    result = await callGeminiApi(apiKey, rawPrompt, count, 0.5, lang);
    parsedOptions = result.ok ? parseOptionsArray(result.text, count) : null;
  }

  // 5. Check timeout or service failure
  if (!parsedOptions || parsedOptions.length < 4) {
    if (result.error?.name === 'AbortError') {
      return new Response(
        JSON.stringify({
          error: 'Generation timed out after 25 seconds. Please try again with a simpler topic.',
          reason: 'timeout',
        }),
        { status: 504, headers }
      );
    }

    if (!result.ok) {
      const errorMsg = result.errorBody?.error?.message || 'Service failure';
      console.error(`[Gemini API Error] Status ${result.status}: ${errorMsg}`);

      if (result.status === 429) {
        return new Response(
          JSON.stringify({
            error: 'Gemini AI rate limit reached. Please wait a moment and try again.',
            reason: 'rate_limit',
          }),
          { status: 429, headers }
        );
      }

      if (result.status >= 500) {
        return new Response(
          JSON.stringify({
            error: 'Gemini AI service is temporarily experiencing high load. Please try again in a few moments.',
            reason: 'upstream_unavailable',
          }),
          { status: 503, headers }
        );
      }
    }

    return new Response(
      JSON.stringify({
        error:
          'Unable to generate options from AI service at this time. Please try again or enter options manually.',
        reason: 'server_error',
      }),
      { status: 502, headers }
    );
  }

  // 6. Return successful response with options array
  return new Response(
    JSON.stringify({
      options: parsedOptions,
      prompt: rawPrompt,
    }),
    { status: 200, headers }
  );
};

/**
 * Handle CORS preflight if needed
 */
export const OPTIONS = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-goog-api-key',
    },
  });
};
