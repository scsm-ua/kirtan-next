import type { Metadata } from 'next';

import { getBooksMap } from '@/lib/books';
import { getBookDescriptionsByBook, getSongBySlug } from '@/lib/song';
import { getCommonMeta } from '@/other/metadata/helpers/getCommonMeta';
import { getOG } from '@/other/metadata/helpers/getOG';
import { getTwitter } from '@/other/metadata/helpers/getTwitter';
import { KEYWORDS, ROBOTS } from '@/other/metadata/helpers/constants';

import type { SongPageProps } from '@/types/book';
import type { TBookDescription, TBooksMap } from '@/types/book';
import type { TSong } from '@/types/song';

/**
 *
 */
export async function getSongPageMeta({
  params
}: SongPageProps): Promise<Partial<Metadata>> {
  const { bookId, slug } = await params;
  if (!bookId || !slug) return null;

  const song = await getSongBySlug(slug, bookId);
  if (!song) return null;

  console.warn('>>>>>>>>> Missing song description (1st line)!');
  const description = null;
  const title = getPageTitle(song);

  const booksMap = await getBooksMap();
  const languages = await getLanguages(slug, booksMap);
  languages['x-default'] = `/${bookId}/${slug}`;

  const authors = song.author?.length > 0
    ? [{ name: song.author[0] }]
    : void 0;

  return {
    ...getCommonMeta(),
    alternates: {
      canonical: `/${bookId}/${slug}`,
      languages: languages
    },
    authors: authors,
    description: description,
    keywords: getKeywords(song, authors),
    openGraph: getOG(bookId, description, title, slug),
    robots: ROBOTS,
    title: title,
    twitter: getTwitter(bookId, description, title)
  } as Metadata;
}

/**
 *
 */
function getPageTitle(song: TSong): string {
  let title = song.title.join(' ');

  if (song.author?.length > 0) {
    title += '. ' + song.author[0];
  }

  if (song.subTitle?.length > 0) {
    title += '. ' + song.subTitle.join(' ');
  }

  return title;
}

/**
 *
 */
function getKeywords(song: TSong, authors?: [{ name: string }]): Array<string> {
  const keywords = KEYWORDS;

  if (authors.length > 0) {
    keywords.push(authors[0].name);
  }

  if (song.title.length > 0) {
    keywords.push(song.title[0]);
  }

  return keywords;
}

/**
 *
 */
async function getLanguages(songSlug: string, booksMap: TBooksMap) {
  const languages = {};
  console.warn('>>>>>>>>> Check this place!');

  const descriptions = (await getBookDescriptionsByBook(
    songSlug,
    /*booksMap*/ {
      'en-pe': {
        title: 'Kirtan Guide',
        subtitle: 'Pocket Edition, 2013',
        slug: 'en-pe',
        language: 'en',
        sort_order: 40,
        path: '/Users/kostya/kostya/projects/scsm-ua/kirtan-mate/node_modules/kirtan-guide-pocket-edition'
      } as any
    }
  )) as TBookDescription[];

  descriptions.forEach((d: TBookDescription) => {
    const lang = d.slug.slice(0, 2);
    languages[lang] = `/${d.slug}/${songSlug}`;
  });

  return languages;
}
