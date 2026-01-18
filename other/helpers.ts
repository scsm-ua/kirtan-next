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

/**
 *
 */
export function scrollToSection(id: string): void {
  document.getElementById('section-' + id)?.scrollIntoView({
    behavior: 'smooth'
  });
}

/**
 *
 */
export function getIFrameUrl(audioUrl: string): string {
  return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(audioUrl);
}
