/**
 * src/i18n/utils.ts
 * Lightweight, modular internationalization utilities for ToolNest.
 */
import en from './ui/en.json';
import pt from './ui/pt.json';
import id from './ui/id.json';
import ar from './ui/ar.json';

export type TranslationSchema = typeof en;
export type Namespace = keyof TranslationSchema;

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

const dictionaries: Record<Lang, TranslationSchema> = {
  en,
  pt,
  id,
  ar,
};

/**
 * Get translation for a specific namespace and key with build-time fallback to English and warning.
 */
export function t<N extends Namespace, K extends keyof TranslationSchema[N]>(
  lang: Lang | string,
  namespace: N,
  key: K
): string {
  const currentLang: Lang = (lang in dictionaries) ? (lang as Lang) : DEFAULT_LANG;
  const dict = dictionaries[currentLang];
  const nsObj = dict?.[namespace] as any;
  const val = nsObj?.[key];

  if (val !== undefined && val !== null && val !== '') {
    return String(val);
  }

  // Fallback to English and log warning if not English
  if (currentLang !== DEFAULT_LANG) {
    console.warn(`[i18n warning] Missing key "${String(namespace)}.${String(key)}" for language "${currentLang}". Falling back to English.`);
  }

  const fallbackNs = en[namespace] as any;
  return fallbackNs?.[key] !== undefined ? String(fallbackNs[key]) : String(key);
}

/**
 * Load ONLY the specific namespace needed by a page or component, with fallback to English.
 * Prevents bundling unused namespaces.
 */
export function getNamespace<N extends Namespace>(lang: Lang | string, namespace: N): TranslationSchema[N] {
  const currentLang: Lang = (lang in dictionaries) ? (lang as Lang) : DEFAULT_LANG;
  const targetNs = (dictionaries[currentLang]?.[namespace] || {}) as TranslationSchema[N];
  const enNs = en[namespace];

  if (currentLang === DEFAULT_LANG) {
    return enNs;
  }

  // Create a merged object with English fallback for any missing properties
  const result: any = { ...enNs };
  for (const [k, v] of Object.entries(targetNs)) {
    if (v !== undefined && v !== null && v !== '') {
      result[k] = v;
    } else {
      console.warn(`[i18n warning] Key "${String(namespace)}.${k}" is empty in language "${currentLang}". Falling back to English.`);
    }
  }

  return result;
}

/**
 * Get full translations dictionary for a language (backwards compatibility).
 */
export function getTranslations(lang?: string | null): any {
  const dict = (lang && lang in dictionaries) ? dictionaries[lang as Lang] : en;
  return {
    ...dict,
    nav: dict.common?.nav || en.common.nav,
    siteName: dict.common?.siteName || en.common.siteName,
    tagline: dict.common?.tagline || en.common.tagline,
  };
}

/**
 * Determine language from URL or pathname (e.g. /pt/image-compressor -> 'pt', /en/image-compressor -> 'en', /image-compressor -> 'en')
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

/**
 * Alias for getLangFromUrl
 */
export const getLangFromPath = getLangFromUrl;

/**
 * Map any URL/path to the equivalent path in targetLang.
 * NOTE: English URLs always return the bare URL (e.g. /image-compressor) so English users never see /en/ in links.
 */
export function getLocalizedPath(pathname: string, targetLang: Lang): string {
  // Strip any existing language prefix: /en, /pt, /id, /ar
  let cleanPath = pathname.replace(/^\/(en|pt|id|ar)(\/|$)/, '/');
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }

  // Preserve query string or hash if present
  const [basePath, searchAndHash] = cleanPath.split(/(?=[?#])/);
  const suffix = searchAndHash || '';

  if (targetLang === DEFAULT_LANG) {
    return basePath === '' ? `/${suffix}` : `${basePath}${suffix}`;
  }

  if (basePath === '/' || basePath === '') {
    return `/${targetLang}/${suffix}`;
  }

  return `/${targetLang}${basePath}${suffix}`;
}

/**
 * Normalizes canonical path: ensures /en/* canonicalizes to bare URL for en.
 */
export function getCanonicalPath(pathname: string): string {
  let clean = pathname.replace(/^\/en(\/|$)/, '/');
  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }
  return clean;
}

/**
 * Returns whether a given language is RTL
 */
export function isRtlLang(lang: Lang | string): boolean {
  return lang === 'ar' || (LANGUAGES as any)[lang]?.dir === 'rtl';
}
