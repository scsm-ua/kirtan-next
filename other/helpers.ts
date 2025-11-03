import { PATH, SITE } from '@/other/constants';

/**
 *
 */
export function getBannerUrlBase(bookId: string): string {
  return SITE.ORIGIN + '/' + PATH.IMG.COVER + 'banner-' + bookId;
}

/**
 *
 */
export function getBannerUrl(bookId: string): string {
  return getBannerUrlBase(bookId) + '.jpg';
}
