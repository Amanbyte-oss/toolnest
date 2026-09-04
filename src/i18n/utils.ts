/**
 * src/i18n/utils.ts
 * Core utilities for ToolNest internationalization (i18n).
 * Provides t(), getLangFromUrl(), getLocalizedPath(), and build-time fallback warning logger.
 */

import en from './ui/en.json';
import pt from './ui/pt.json';
import id from './ui/id.json';
import ar from './ui/ar.json';

export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr' as const,
    flag: '🇺🇸',
  },
  pt: {
    code: 'pt',
    name: 'Português',
    nativeName: 'Português',
    dir: 'ltr' as const,
    flag: '🇧🇷',
  },
  id: {
    code: 'id',
    name: 'Bahasa Indonesia',
    nativeName: 'Bahasa Indonesia',
    dir: 'ltr' as const,
    flag: '🇮🇩',
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    nativeName: 'العربية',
    dir: 'rtl' as const,
    flag: '🇪🇬',
  },
} as const;

export type Lang = keyof typeof LANGUAGES;
export const DEFAULT_LANG: Lang = 'en';
export const LOCALES: Lang[] = ['en', 'pt', 'id', 'ar'];
export const NON_DEFAULT_LOCALES: Lang[] = ['pt', 'id', 'ar'];

export type TranslationSchema = typeof en;
export type Namespace = keyof TranslationSchema;

const dictionaries: Record<Lang, any> = {
  en,
  pt,
  id,
  ar,
};

/**
 * Build-time cache of warned missing keys to prevent spamming console
 */
const loggedWarnings = new Set<string>();

/**
 * Retrieve a translated string with build-time fallback to English and console warning
 * Supports dynamic interpolation: t(lang, 'wheel', 'removeWinnerToast', { winner: 'Pizza' })
 */
export function t<N extends Namespace, K extends keyof TranslationSchema[N]>(
  lang: string | null | undefined,
  namespace: N,
  key: K,
  params?: Record<string, string | number>
): string {
  const activeLang: Lang = (lang && lang in LANGUAGES ? lang : DEFAULT_LANG) as Lang;
  const dict = dictionaries[activeLang] || en;
  const nsDict = dict[namespace];

  let value = nsDict?.[key];

  // Fallback to English if key missing or empty in target language
  if ((value === undefined || value === null || value === '') && activeLang !== DEFAULT_LANG) {
    const warningKey = `${activeLang}:${String(namespace)}.${String(key)}`;
    if (!loggedWarnings.has(warningKey)) {
      loggedWarnings.add(warningKey);
      console.warn(`⚠️ [i18n warning] Missing key "${String(namespace)}.${String(key)}" in "${activeLang}". Falling back to English.`);
    }
    value = (en as any)[namespace]?.[key];
  }

  if (value === undefined || value === null) {
    return String(key);
  }

  let result = String(value);

  // Parameter interpolation e.g. {winner} or {count}
  if (params && typeof params === 'object') {
    for (const [paramKey, paramVal] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
    }
  }

  return result;
}

/**
 * Returns scoped translations for only the requested namespaces.
 * Avoids passing global megabundles to client components.
 */
export function useTranslations<N extends Namespace>(
  lang: string | null | undefined,
  namespaces: N[]
): { [K in N]: TranslationSchema[K] } {
  const activeLang: Lang = (lang && lang in LANGUAGES ? lang : DEFAULT_LANG) as Lang;
  const result = {} as { [K in N]: TranslationSchema[K] };

  for (const ns of namespaces) {
    const langNs = dictionaries[activeLang]?.[ns];
    const enNs = (en as any)[ns];

    if (!langNs && activeLang !== DEFAULT_LANG) {
      console.warn(`⚠️ [i18n warning] Namespace "${String(ns)}" completely missing in "${activeLang}". Falling back to English.`);
      result[ns] = enNs;
    } else {
      // Merge with English fallback per key
      const merged = { ...enNs, ...(langNs || {}) };
      result[ns] = merged;
    }
  }

  return result;
}

/**
 * Parse language from URL pathname (e.g. /pt/decision-wheel -> 'pt', /en/countdown -> 'en', /birthday-facts -> 'en')
 */
export function getLangFromUrl(url: URL | string): Lang {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (first && (first === 'en' || first === 'pt' || first === 'id' || first === 'ar')) {
    return first as Lang;
  }

  return DEFAULT_LANG;
}

export const getLangFromPath = getLangFromUrl;

/**
 * Map any URL path to the equivalent target language path.
 * - For English ('en'):
 *   - By default (canonicalForEnglishBare = true), returns bare URL:
 *     '/pt/decision-wheel' -> '/decision-wheel'
 *     '/en/decision-wheel' -> '/decision-wheel'
 *     '/pt/' -> '/'
 *   - When canonicalForEnglishBare = false, preserves '/en/':
 *     '/decision-wheel' -> '/en/decision-wheel'
 * - For other languages ('pt', 'id', 'ar'):
 *   - '/decision-wheel' -> '/pt/decision-wheel'
 *   - '/pt/decision-wheel' -> '/ar/decision-wheel'
 *   - '/' -> '/pt/'
 */
export function getLocalizedPath(
  pathname: string,
  targetLang: Lang,
  canonicalForEnglishBare = true
): string {
  // Strip any existing language prefix: /en, /pt, /id, /ar
  let cleanPath = pathname.replace(/^\/(en|pt|id|ar)(\/|$)/, '/');
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }

  // Preserve query string or hash if present
  const [basePath, searchAndHash] = cleanPath.split(/(?=[?#])/);
  const suffix = searchAndHash || '';

  if (targetLang === DEFAULT_LANG && canonicalForEnglishBare) {
    return basePath === '' ? `/${suffix}` : `${basePath}${suffix}`;
  }

  if (targetLang === DEFAULT_LANG && !canonicalForEnglishBare) {
    if (basePath === '/' || basePath === '') {
      return `/en/${suffix}`;
    }
    return `/en${basePath}${suffix}`;
  }

  if (basePath === '/' || basePath === '') {
    return `/${targetLang}/${suffix}`;
  }

  return `/${targetLang}${basePath}${suffix}`;
}

/**
 * Returns whether a given language is RTL (Arabic)
 */
export function isRtlLang(lang: string | null | undefined): boolean {
  return lang === 'ar';
}

/**
 * Get full translation dictionary with backward compatibility
 */
export function getTranslations(lang?: string | null): any {
  const activeLang: Lang = (lang && lang in LANGUAGES ? lang : DEFAULT_LANG) as Lang;
  const dict = dictionaries[activeLang] || en;
  // Deep clone/merge with fallback to English so all legacy properties exist
  return {
    ...en,
    ...dict,
    common: { ...en.common, ...dict.common },
    nav: { ...en.common.nav, ...dict.common?.nav },
    meta: { ...en.meta, ...dict.meta },
    wheel: { ...en.wheel, ...dict.wheel },
    picker: { ...en.picker, ...dict.picker },
    age: { ...en.age, ...dict.age },
    birthday: { ...en.birthday, ...dict.birthday },
    countdown: { ...en.countdown, ...dict.countdown },
    names: { ...en.names, ...dict.names },
    about: { ...en.about, ...dict.about },
    contact: { ...en.contact, ...dict.contact },
    privacy: { ...en.privacy, ...dict.privacy },
    notFound: { ...en.notFound, ...dict.notFound },
    errors: { ...en.errors, ...dict.errors },
  };
}
