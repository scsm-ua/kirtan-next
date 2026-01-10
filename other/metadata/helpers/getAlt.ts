import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';

/**
 *
 */
export function getAlt(bookId: string, path?: string): Partial<AlternateURLs> {
  return {
    canonical: '/' + bookId + '/' + (path || ''),
    languages: {
      // todo: keys must be real locales, not just languages
      en: '/en-pe/' + (path || ''),
      es: '/es/' + (path || ''),
      lv: '/lv/' + (path || ''),
      pt: '/pt/' + (path || ''),
      ru: '/ru/' + (path || ''),
      ua: '/ua/' + (path || ''),
      'x-default': '/en/' + (path || '')
    }
  } as any;
}
