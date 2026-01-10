import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import { getBannerUrl } from '@/other/helpers';

/**
 *
 */
export function getTwitter(
  bookId: string,
  description: string,
  title: string
): Partial<Twitter> {
  return {
    title: title,
    card: 'summary',
    description: description,
    image: getBannerUrl(bookId)
  } as any;
}
