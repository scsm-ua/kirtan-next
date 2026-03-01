import { PATH } from '@/other/constants';

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
export function getIFrameUrl(audioUrl: string): string {
  return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(audioUrl);
}

/**
 *
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById('section-' + id);
  el && scrollIt(el, 250);
}

/**
 * Thanks to https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
 */
function scrollIt(destination: HTMLElement, duration: number) {
  const scrollable = getScrollParent(destination);
  const topMargin = parseInt(getComputedStyle(destination).scrollMarginTop) || 0;

  const start = scrollable.scrollTop;
  const destinationTop = destination.offsetTop - topMargin;
  const startTime = performance.now();

  (function scroll() {
    const now = performance.now();
    const time = Math.min(1, (now - startTime) / duration);

    const y = Math.ceil(easeOutQuad(time) * (destinationTop - start) + start);
    scrollable.scroll(0, y);

    y < destinationTop && requestAnimationFrame(scroll);
  }());
}

/**
 *
 */
function easeOutQuad(t: number): number {
  return t * (2 - t);
}

/**
 *
 */
function getScrollParent(node): HTMLElement {
  if (node === null) return null;

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
}
