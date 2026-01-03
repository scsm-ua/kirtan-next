import { isObject } from './utils';
import translations from '../source/translations.json';

/**/
export const DEFAULT_LANGUAGE = 'en';

/**
 *
 */
function getLanguageSet(language = '') {
  const lang = language.slice(0, 2);
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}

function getLanguageSetNotDefault(language) {
  const lang = language.slice(0, 2);
  return translations[lang];
}

/**
 *
 */
export function isValidBookId(id: string): boolean {
  return !!translations[id];
}

/**
 *
 */
export function getTranslationsByBookId(bookId?: string) {
  return (keyChain) => {
    const keys = keyChain.split('.');
    let value = getLanguageSet(bookId);

    keys.forEach((k) =>
      value = isObject(value) ? value[k] : (value || '')
    );

    return value || (bookId && getTranslationsByBookId()(keyChain)) || '';
  };
}

function getTranslationOrigin(lang, text) {
  let data = getLanguageSetNotDefault(lang);
  if (data?.i18n) {
    for (const [key, value] of Object.entries(data.i18n)) {
      if (value === text) {
        return key;
      }
    }
  }
}

function getStrictTranslation(lang, text) {
  let data = getLanguageSetNotDefault(lang);
  return data?.i18n && data.i18n[text] || text;
}

function isDefaultLanguage(language) {
  const lang = language.slice(0, 2);
  return lang === DEFAULT_LANGUAGE;
}

/**
 *
 */
export function translate(bookId: string, key: string): string {
  return getTranslationsByBookId(bookId)(key);
}
