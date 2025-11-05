import { PATH, SITE } from '@/other/constants';

/**
 *
 */
export function getBannerUrlBase(bookId: string): string {
  return PATH.IMG.COVER + 'banner-' + bookId;
}

/**
 *
 */
export function getBannerUrl(bookId: string): string {
  return getBannerUrlBase(bookId) + '.jpg';
}
