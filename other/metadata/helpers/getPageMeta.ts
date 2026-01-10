import type { Metadata } from 'next';

import { getAlt } from '@/other/metadata/helpers/getAlt';
import { getCommonMeta } from '@/other/metadata/helpers/getCommonMeta';
import { getOG } from '@/other/metadata/helpers/getOG';
import { getPageTitle } from '@/other/metadata/helpers/getPageTitle';
import { getTranslationsByBookId } from '@/other/i18n';
import { getTwitter } from '@/other/metadata/helpers/getTwitter';
import { ROBOTS } from '@/other/metadata/helpers/constants';

/**/
type TPageMetaOptions = {
  bookId: string;
  descriptionKey: string;
  titleKey: string;
  pagePath?: string;
};

/**
 *
 */
export function getPageMeta({
  bookId,
  descriptionKey,
  titleKey,
  pagePath
}: TPageMetaOptions): Partial<Metadata> {
  const translate = getTranslationsByBookId(bookId);

  const description = translate(descriptionKey);
  const title = getPageTitle(translate(titleKey));

  return {
    ...getCommonMeta(),
    alternates: getAlt(bookId, pagePath),
    description: description,
    openGraph: getOG(bookId, description, title, pagePath),
    robots: ROBOTS,
    title: title,
    twitter: getTwitter(bookId, description, title)
  } as Metadata;
}
