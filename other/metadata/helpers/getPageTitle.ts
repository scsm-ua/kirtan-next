import { SITE } from '@/other/constants';

/**
 *
 */
export function getPageTitle(title: string): string {
  return `${title} | ${SITE.NAME}`
}
