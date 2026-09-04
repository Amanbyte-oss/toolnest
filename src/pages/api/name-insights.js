/**
 * Native Astro API Route: /api/name-insights
 * Server-side endpoint for Gemini AI rich name insights and personality analysis.
 * Compatible with local Astro dev server and Cloudflare Pages runtime.
 */

export const prerender = false;

// Configurable model constant
const GEMINI_MODEL = 'gemini-3-flash-preview';

// In-memory rate limiting map: ip -> array of request timestamps (10 req / min / IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

/**
 * Checks and updates rate limit for a client IP
 */
function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const timestamps = rateLimitMap.get(ip) || [];
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
 * Parses and sanitizes JSON insights from Gemini response
 */
function parseNameInsights(rawText, fallbackName) {
  if (!rawText || typeof rawText !== 'string') return null;

  try {
    // 1. Strip markdown code fences if present
    const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    if (!parsed || typeof parsed !== 'object') return null;

    // 2. Validate and coerce meaning
    const meaning = typeof parsed.meaning === 'string'
      ? parsed.meaning.trim().slice(0, 200)
      : `A distinctive and evocative name associated with wisdom, character, and strength.`;

    // 3. Validate origin
    const origin = typeof parsed.origin === 'string' && parsed.origin.trim()
      ? parsed.origin.trim().slice(0, 60)
      : 'International';

    // 4. Validate personality traits (cap at 4, max 40 chars each)
    let personality = Array.isArray(parsed.personality)
      ? parsed.personality
          .map((item) => String(item || '').trim())
          .filter((item) => item.length > 0)
          .map((item) => item.slice(0, 40))
          .slice(0, 4)
      : [];
    if (personality.length === 0) {
      personality = ['Resilient', 'Charismatic', 'Intuitive', 'Thoughtful'];
    }

    // 5. Validate famous namesakes (cap at 3, max 100 chars each)
    const famous = Array.isArray(parsed.famous)
      ? parsed.famous
          .map((item) => String(item || '').trim())
          .filter((item) => item.length > 0)
          .map((item) => item.slice(0, 100))
          .slice(0, 3)
      : [];

    // 6. Validate similar names (cap at 4, max 40 chars each)
    const similar = Array.isArray(parsed.similar)
      ? parsed.similar
          .map((item) => String(item || '').trim().replace(/[^\p{L}\s'-]/gu, ''))
          .filter((item) => item.length > 0)
          .map((item) => item.slice(0, 40))
          .slice(0, 4)
      : [];

    // 7. Validate funFact
    const funFact = typeof parsed.funFact === 'string' && parsed.funFact.trim()
      ? parsed.funFact.trim().slice(0, 200)
      : `Historically celebrated across multiple cultures for its harmonious phonetics and memorable cadence.`;

    // 8. Validate style (must be one of: classic|modern|timeless|rare|trendy)
    const validStyles = ['classic', 'modern', 'timeless', 'rare', 'trendy'];
    const rawStyle = String(parsed.style || '').trim().toLowerCase();
    const style = validStyles.includes(rawStyle) ? rawStyle : 'timeless';

    return {
      meaning,
      origin,
      personality,
      famous,
      similar,
      funFact,
      style,
    };
  } catch (e) {
    return null;
  }
}

/**
 * Calls Google Gemini REST API with header-based authentication and 10s timeout
 */
async function callGeminiApi(apiKey, name, temperature = 1.0, lang = 'en') {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  let langInstruction = '';
  if (lang === 'pt') {
    langInstruction = ' All explanations, meaning, origin, traits, funFact must be written in Brazilian Portuguese.';
  } else if (lang === 'id') {
    langInstruction = ' All explanations, meaning, origin, traits, funFact must be written in Indonesian.';
  } else if (lang === 'ar') {
    langInstruction = ' All explanations, meaning, origin, traits, funFact must be written in Modern Standard Arabic.';
  }

  const promptText = `You are a name expert. For the name "${name}", return ONLY JSON with this exact shape:
{
  "meaning": "one-sentence meaning/essence",
  "origin": "origin language/culture",
  "personality": ["trait1", "trait2", "trait3", "trait4"],
  "famous": ["Famous Person (role)", "Famous Person (role)"],
  "similar": ["name1", "name2", "name3"],
  "funFact": "one interesting sentence about the name",
  "style": "classic|modern|timeless|rare|trendy"
}
If the name is not a real known name, still return a friendly creative interpretation with origin 'unknown'.
Be concise. Generate JSON immediately without long reasoning.${langInstruction}`;

  const payload = {
    contents: [
      {
        parts: [{ text: promptText }],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature,
      maxOutputTokens: 1536,
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
    const candidateText = json?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return { ok: true, status: response.status, text: candidateText };
  } catch (err) {
    clearTimeout(timeoutId);
    return { ok: false, status: 0, error: err };
  }
}

/**
 * Astro API POST Handler: /api/name-insights
 */
export const POST = async ({ request, locals }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  // 1. Check client IP rate limit (10 req/min/IP)
  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '127.0.0.1';

  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({
        error: 'Too many lookups — please wait a minute before analyzing more names.',
      }),
      { status: 429, headers }
    );
  }

  // 2. Validate environment variable
  const apiKey =
    locals?.runtime?.env?.GEMINI_API_KEY ||
    import.meta.env?.GEMINI_API_KEY ||
    (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'Server is not configured with an API key.',
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
      JSON.stringify({ error: 'Invalid JSON payload provided.' }),
      { status: 400, headers }
    );
  }

  const rawName = typeof body?.name === 'string' ? body.name.trim() : '';
  const lang = typeof body?.lang === 'string' ? body.lang.toLowerCase() : 'en';

  // Name validation: 2-30 chars, letters/spaces/hyphens/apostrophes only (Unicode-aware)
  const nameRegex = /^[\p{L}\s'-]{2,30}$/u;
  if (!rawName || !nameRegex.test(rawName)) {
    return new Response(
      JSON.stringify({
        error: 'Please enter a valid name between 2 and 30 characters (letters, spaces, hyphens, or apostrophes only).',
      }),
      { status: 400, headers }
    );
  }

  // 4. Call Gemini REST API directly
  let result = await callGeminiApi(apiKey, rawName, 1.0, lang);

  // If 404 model not found, log server-side (never leaking key) and return 502
  if (!result.ok && result.status === 404) {
    const errorMsg = result.errorBody?.error?.message || 'Model not found';
    console.error(`[Gemini API Error] Status 404: ${errorMsg} (Model: ${GEMINI_MODEL})`);
    return new Response(
      JSON.stringify({
        error: 'AI service model unavailable. Please check GEMINI_MODEL configuration.',
      }),
      { status: 502, headers }
    );
  }

  let insights = result.ok ? parseNameInsights(result.text, rawName) : null;

  // Auto-retry once with lower temperature if JSON parsing failed
  if (!insights && result.status !== 404 && result.error?.name !== 'AbortError') {
    result = await callGeminiApi(apiKey, rawName, 0.7, lang);
    insights = result.ok ? parseNameInsights(result.text, rawName) : null;
  }

  // 5. Check timeout or service failure
  if (!insights) {
    if (result.error?.name === 'AbortError') {
      return new Response(
        JSON.stringify({
          error: 'Name analysis timed out after 10 seconds. Please try again.',
        }),
        { status: 504, headers }
      );
    }

    if (!result.ok) {
      const errorMsg = result.errorBody?.error?.message || 'Upstream service error';
      console.error(`[Gemini API Error] Status ${result.status}: ${errorMsg}`);
    }

    return new Response(
      JSON.stringify({
        error: 'Unable to analyze name insights from AI service at this time. Please try again.',
      }),
      { status: 502, headers }
    );
  }

  // 6. Return structured insights
  return new Response(
    JSON.stringify({
      name: rawName,
      insights,
    }),
    { status: 200, headers }
  );
};

/**
 * Handle CORS preflight
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
