import { defineMiddleware } from 'astro:middleware';

const ARABIC_COUNTRIES = new Set([
  'EG', 'SA', 'AE', 'MA', 'DZ', 'TN', 'KW', 'QA', 'OM', 'JO', 'LY', 'SD', 'IQ', 'YE', 'BH', 'LB'
]);

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies } = context;

  // 1. Only run language detection on root homepage "/"
  if (url.pathname === '/' || url.pathname === '') {
    // Check if visitor has a preferred language cookie or already received a hint
    const userPref = cookies.get('toolnest_lang')?.value;
    const langHint = cookies.get('lang-hint')?.value;

    // Explicit user choice wins over IP detection
    if (userPref) {
      if (['pt', 'id', 'ar'].includes(userPref)) {
        return context.redirect(`/${userPref}/`, 302);
      }
      return next(); // user explicitly chose English 'en'
    }

    // If lang-hint is already set, do not redirect again (runs only on first visit)
    if (langHint) {
      return next();
    }

    // 2. IP-based country detection via Cloudflare Worker request.cf or header
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

    // 3. Fallback: Accept-Language header if cf.country didn't resolve to a target language or is absent
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

    // Set cookie "lang-hint" so this redirect only ever happens once
    cookies.set('lang-hint', targetLang || 'en', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });

    if (targetLang && targetLang !== 'en') {
      return context.redirect(`/${targetLang}/`, 302);
    }
  }

  return next();
});
