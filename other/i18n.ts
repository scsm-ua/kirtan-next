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

/**
 *
 */
export function translate(bookId: string, key: string): string {
  return getTranslationsByBookId(bookId)(key);
}
