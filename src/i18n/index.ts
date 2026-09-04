import type { TranslationDictionary } from './types';
import { en } from './en';
import { pt } from './pt';
import { id } from './id';
import { ar } from './ar';

export type { TranslationDictionary };

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

const dictionaries: Record<Lang, TranslationDictionary> = {
  en,
  pt,
  id,
  ar,
};

/**
 * Get translations dictionary for a language with fallback to English
 */
export function getTranslations(lang?: string | null): TranslationDictionary {
  if (lang && lang in dictionaries) {
    return dictionaries[lang as Lang];
  }
  return en;
}

/**
 * Determine language from pathname (e.g. /pt/decision-wheel -> 'pt', /decision-wheel -> 'en')
 */
export function getLangFromPath(pathname: string): Lang {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && (first === 'pt' || first === 'id' || first === 'ar')) {
    return first as Lang;
  }
  return DEFAULT_LANG;
}

/**
 * Map any URL/path to the equivalent path in targetLang
 * Examples:
 * - getLocalizedPath('/', 'pt') -> '/pt/'
 * - getLocalizedPath('/pt/', 'en') -> '/'
 * - getLocalizedPath('/decision-wheel', 'pt') -> '/pt/decision-wheel'
 * - getLocalizedPath('/pt/decision-wheel', 'ar') -> '/ar/decision-wheel'
 * - getLocalizedPath('/ar/decision-wheel', 'en') -> '/decision-wheel'
 * - getLocalizedPath('/pt/name/oliver', 'id') -> '/id/name/oliver'
 */
export function getLocalizedPath(pathname: string, targetLang: Lang): string {
  // Strip any existing language prefix: /pt, /id, /ar
  let cleanPath = pathname.replace(/^\/(pt|id|ar)(\/|$)/, '/');
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
 * Returns whether a given language is RTL
 */
export function isRtlLang(lang: Lang): boolean {
  return LANGUAGES[lang]?.dir === 'rtl';
}
