import fs from 'node:fs/promises';
import path from 'path';

import { FILES, PATH } from '@/other/constants';
import { getContentsByBookId } from '@/lib/contents';

import type { TBookDescription, TBooksMap } from '@/types/book';
import type { TContentGroup, TContentItem } from '@/types/common';
import type { TNavItems } from '@/types/song';
import type { TNavItemsMap, TSong } from '@/types/song';

/**
 *
 */
export async function getSongSlugParam({
  params
}: {
  params: { bookId: string };
}): Promise<Array<{ bookId: string; slug: string }>> {
  // console.log('^^^^^^^^^^^^^^^^^');
  //
  // if (!params?.bookId) {
  //   return [{ bookId: 'en-pe', slug: '' }];
  // }

  // console.log(
  //   '++++++++++++++',
  //   process.cwd(),
  //   PATH.DIR.SOURCE,
  //   params.bookId,
  //   FILES.CONTENTS
  // );
  const p = path.join(
    process.cwd(),
    PATH.DIR.SOURCE_BOOKS,
    params.bookId || '',
    FILES.CONTENTS
  );

  try {
    const str = await fs.readFile(p, 'utf8');
    const resp = contents2slugs(JSON.parse(str) as TContentGroup[])
      .map((x) => ({ ...x, bookId: params.bookId}));
    // console.log(JSON.stringify(resp, null,2));

    return resp;

  } catch (e) {
    console.error(e);
    return [{ bookId: params.bookId, slug: '' }];
  }
}

/**
 * Returns book descriptions of those books that contain the song.
 */
export async function getBookDescriptionsByBook(
  songSlug: string,
  booksMap: TBooksMap
): Promise<Array<TBookDescription> | void> {
  const bookIds = Object.keys(booksMap);

  return Promise.all(bookIds.map(getContentsByBookId))
    .then((arrOfContents: Array<TContentGroup[]>) => {
      return arrOfContents
        .map(contents2slugs)
        .map((items: Array<{ slug: string }>, idx: number): string | void => {
          const slug = items.find((item) => item.slug === songSlug);
          return slug && bookIds[idx];
        })
        .filter(Boolean)
        .map((bookId: string) => booksMap[bookId]);
    })
    .catch(console.error);
}

/**
 *
 */
export async function getSongBySlug(
  songSlug: string,
  bookId: string
): Promise<TSong> {
  // console.log(
  //   '++++++++++++++',
  //   process.cwd(),
  //   PATH.DIR.SOURCE,
  //   bookId,
  //   PATH.DIR.SONGS,
  //   songSlug + '.json'
  // );

  const p = path.join(
    process.cwd(),
    PATH.DIR.SOURCE_BOOKS,
    bookId,
    PATH.DIR.SONGS,
    songSlug + '.json'
  );

  try {
    const str = await fs.readFile(p, 'utf8');
    return JSON.parse(str) as TSong;
  } catch (e) {
    console.error(e);
    return null;
  }


}

/**
 *
 */
export async function getNavItems(
  songSlug: string,
  bookId: string
): Promise<TNavItemsMap> {
  const p = path.join(process.cwd(), PATH.DIR.SOURCE_BOOKS, bookId, FILES.CONTENTS);
  const str = await fs.readFile(p, 'utf8');

  const songs = (JSON.parse(str) as TContentGroup[]).flatMap(
    (group: TContentGroup) => group.items
  ) as TContentItem[];

  return getNavItemsBySlug(songSlug, bookId, songs);
}

/**
 *
 */
function contents2slugs(contents: TContentGroup[]): Array<{ slug: string }> {
  return contents
    .flatMap((group: TContentGroup) => group.items)
    .map((item: TContentItem) => ({ slug: item.id }));
}

/**
 *
 */
function getNavItemsByPage(
  page: string,
  bookId: string,
  songs: TContentItem[]
): TNavItems {
  const prev = songs.find(
    (item: TContentItem) => item.page === parseInt(page) - 1 + ''
  );
  const next = songs.find(
    (item: TContentItem) => item.page === parseInt(page) + 1 + ''
  );

  return {
    prev: prev && {
      path: bookId + '/' + prev.id,
      title: prev.title
    },
    next: next && {
      path: bookId + '/' + next.id,
      title: next.title
    }
  };
}

/**
 *
 */
function getNavItemsBySlug(
  songSlug: string,
  bookId: string,
  songs: TContentItem[]
) {
  const indexes = songs.reduce(
    (arr: number[], item: TContentItem, idx: number) => {
      if (item.id === songSlug) arr.push(idx);
      return arr;
    },
    []
  );

  const pages = indexes.map((idx: number) => songs[idx].page).filter(Boolean);

  if (pages.length === 0) return {};

  const navs = indexes.map((idx: number) => {
    const prev = songs[idx - 1];
    const next = songs[idx + 1];

    return {
      prev: prev && {
        path: '/' + bookId + '/' + prev.id,
        title: prev.title
      },
      next: next && {
        path: '/' + bookId + '/' + next.id,
        title: next.title
      }
    };
  });

  return Object.fromEntries(
    pages.map((p: string, idx: number) => [p, navs[idx]])
  );
}
