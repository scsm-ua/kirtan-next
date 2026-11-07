import type { Metadata } from 'next';

import { getPageMeta } from '@/other/metadata/helpers/getPageMeta';
import { hasBookAudio } from '@/lib/audio';
import type { BookListPageProps } from '@/types/book';
import type { TAudioPage } from '@/other/paths';

/**
 *
 */
export function createAudioPageMeta(page: TAudioPage) {
  return async function getAudioPageMeta({
    params
  }: BookListPageProps): Promise<Partial<Metadata>> {
    const { bookId } = await params;

    return getPageMeta({
      bookId,
      descriptionKey: 'AUDIO_PAGE.HEAD.DESCRIPTION',
      page,
      hasPage: hasBookAudio
    });
  };
}
