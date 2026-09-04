import { defineMiddleware } from 'astro:middleware';

const ARABIC_COUNTRIES = new Set([
  'EG', 'SA', 'AE', 'MA', 'DZ', 'TN', 'KW', 'QA', 'OM', 'JO', 'LY', 'SD', 'SY', 'YE', 'BH'
]);

const BOT_REGEX = /bot|crawler|spider|slurp|facebookexternalhit|twitterbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkshare|w3c_validator/i;

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies } = context;
  const pathname = url.pathname;

  // 1. Never redirect: API routes, Astro internals, static files with extensions
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/_worker.js') ||
    pathname.startsWith('/favicon') ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return next();
  }

  // 2. Never redirect: bots and crawlers (SEO critical for search indexing)
  const userAgent = request.headers.get('user-agent') || '';
  if (BOT_REGEX.test(userAgent)) {
    return next();
  }

  // 3. Never redirect: /en/* paths
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return next();
  }

  // 4. Respect: any explicit /[lang]/... URL visit sets preference cookie (user choice beats IP forever)
  const langMatch = pathname.match(/^\/(pt|id|ar)(\/|$)/);
  if (langMatch) {
    const explicitLang = langMatch[1];
    cookies.set('lang', explicitLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    cookies.set('toolnest_lang', explicitLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    cookies.set('lang-hint', '1', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return next();
  }

  // 5. Only intercept bare paths (e.g. "/" and bare tool URLs when user has no cookie)
  // Inner navigation or subsequent visits must never be force-redirected
  const cookieLang = cookies.get('lang')?.value || cookies.get('toolnest_lang')?.value;
  const hasLangHint = cookies.get('lang-hint')?.value === '1';

  // If user already received the one-time hint, never redirect again
  if (hasLangHint) {
    return next();
  }

  // If user previously set a preference cookie:
  if (cookieLang) {
    cookies.set('lang-hint', '1', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    if (['pt', 'id', 'ar'].includes(cookieLang)) {
      const redirectTarget = pathname === '/' ? `/${cookieLang}/` : `/${cookieLang}${pathname}`;
      return context.redirect(redirectTarget, 302);
    }
    return next(); // User chose 'en'
  }

  // 6. First visit with no cookies: IP-based country detection via Cloudflare Worker
  const cfCountry = (
    request.headers.get('cf-ipcountry') ||
    request.cf?.country ||
    context.locals?.runtime?.cf?.country ||
    ''
  ).toUpperCase();

  let detectedLang = null;

  if (cfCountry === 'BR') {
    detectedLang = 'pt';
  } else if (cfCountry === 'ID') {
    detectedLang = 'id';
  } else if (ARABIC_COUNTRIES.has(cfCountry)) {
    detectedLang = 'ar';
  }

  // 7. Fallback: Accept-Language header if cf.country is missing or unmapped
  if (!detectedLang) {
    const acceptLanguage = request.headers.get('accept-language')?.toLowerCase() || '';
    if (acceptLanguage.includes('pt-br') || acceptLanguage.startsWith('pt')) {
      detectedLang = 'pt';
    } else if (acceptLanguage.startsWith('id') || acceptLanguage.includes(',id')) {
      detectedLang = 'id';
    } else if (acceptLanguage.startsWith('ar') || acceptLanguage.includes(',ar')) {
      detectedLang = 'ar';
    }
  }

  // Mark lang-hint=1 so detection runs only on the visitor's first visit
  cookies.set('lang-hint', '1', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  if (detectedLang && ['pt', 'id', 'ar'].includes(detectedLang)) {
    cookies.set('lang', detectedLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    cookies.set('toolnest_lang', detectedLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    const redirectTarget = pathname === '/' ? `/${detectedLang}/` : `/${detectedLang}${pathname}`;
    return context.redirect(redirectTarget, 302);
  }

  return next();
});
