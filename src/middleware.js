import { defineMiddleware } from 'astro:middleware';
import { getLocalizedPath } from './i18n';

const ARABIC_COUNTRIES = new Set([
  'EG', 'SA', 'AE', 'MA', 'DZ', 'TN', 'KW', 'QA', 'OM', 'JO', 'LY', 'SD', 'SY', 'YE', 'BH', 'IQ', 'LB'
]);

const BOT_USER_AGENTS = /googlebot|bingbot|yandex|duckduckbot|baiduspider|slurp|facebookexternalhit|twitterbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|applebot|semrushbot|ahrefsbot/i;

const STATIC_EXTENSIONS = /\.(?:css|js|json|png|jpg|jpeg|webp|gif|svg|ico|webmanifest|xml|txt|woff|woff2|ttf|map)$/i;

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies } = context;
  const pathname = url.pathname;

  // 1. Never redirect static assets, API routes, or Astro internals
  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/api/') ||
    STATIC_EXTENSIONS.test(pathname)
  ) {
    return next();
  }

  // 2. Never redirect bots / search engine crawlers
  const userAgent = request.headers.get('user-agent') || '';
  if (BOT_USER_AGENTS.test(userAgent)) {
    return next();
  }

  // 3. Never redirect /en/* URLs (canonicalizes for en, rendered directly)
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return next();
  }

  // 4. If visitor explicitly navigates to /[lang]/..., record their choice
  // (user choice beats IP detection forever)
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && ['pt', 'id', 'ar'].includes(firstSegment)) {
    cookies.set('toolnest_lang', firstSegment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    cookies.set('lang-hint', '1', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return next();
  }

  // 5. Only intercept bare root "/" and bare tool URLs on first visit
  const userPref = cookies.get('toolnest_lang')?.value || cookies.get('lang')?.value;
  const langHint = cookies.get('lang-hint')?.value;

  // Priority 1: User choice cookie if set -> redirect to that lang once if not already hinted
  if (userPref) {
    if (['pt', 'id', 'ar'].includes(userPref) && !langHint) {
      cookies.set('lang-hint', '1', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
      return context.redirect(getLocalizedPath(pathname, userPref), 302);
    }
    // If user explicitly chose English or already hinted, stay on bare URL
    return next();
  }

  // If visitor already received a lang-hint, do not redirect again (never trap users)
  if (langHint) {
    return next();
  }

  // Priority 2: IP-based country detection via Cloudflare Worker cf.country or header
  const cfCountry = (
    request.headers.get('cf-ipcountry') ||
    request.cf?.country ||
    context.locals?.runtime?.cf?.country ||
    ''
  ).toUpperCase();

  let targetLang = null;

  if (cfCountry === 'BR') {
    targetLang = 'pt';
  } else if (cfCountry === 'ID') {
    targetLang = 'id';
  } else if (ARABIC_COUNTRIES.has(cfCountry)) {
    targetLang = 'ar';
  }

  // Priority 3: Fallback to Accept-Language header if cfCountry didn't match or is absent
  if (!targetLang && (!cfCountry || cfCountry === 'XX' || cfCountry === 'T1' || cfCountry === 'US')) {
    const acceptLanguage = request.headers.get('accept-language')?.toLowerCase() || '';
    if (acceptLanguage.includes('pt-br') || acceptLanguage.startsWith('pt')) {
      targetLang = 'pt';
    } else if (acceptLanguage.startsWith('id') || acceptLanguage.includes(',id')) {
      targetLang = 'id';
    } else if (acceptLanguage.startsWith('ar') || acceptLanguage.includes(',ar')) {
      targetLang = 'ar';
    }
  }

  // Set cookie "lang-hint=1" so redirect happens ONLY on the very first visit
  cookies.set('lang-hint', '1', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });

  if (targetLang && targetLang !== 'en') {
    return context.redirect(getLocalizedPath(pathname, targetLang), 302);
  }

  return next();
});
