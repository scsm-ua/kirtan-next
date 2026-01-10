import type { Metadata } from 'next';

import { getPageMeta } from '@/other/metadata/helpers/getPageMeta';
import { PATH } from '@/other/constants';
import type { BookListPageProps } from '@/types/book';

/**
 *
 */
export async function getAuthorsPageMeta({
  params
}: BookListPageProps): Promise<Partial<Metadata>> {
  const { bookId } = await params;

  return getPageMeta({
    bookId,
    descriptionKey: 'AUTHORS_PAGE.HEAD.DESCRIPTION',
    titleKey: 'AUTHORS_PAGE.HEAD.TITLE',
    pagePath: PATH.PAGE.AUTHORS
  });
}
