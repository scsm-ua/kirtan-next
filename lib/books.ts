import fs from 'node:fs/promises';

import { FILES, PATH } from '@/other/constants';
import path from 'path';
import type { TBookDescription, TBooksMap } from '@/types/book';

/**
 *
 */
export async function getBooksMap(): Promise<TBooksMap> {
  const p = path.join(process.cwd(), PATH.DIR.SOURCE, FILES.BOOK_LIST);
  const str = await fs.readFile(p, 'utf8');
  return JSON.parse(str);
}

/**
 *
 */
export async function getBookIdParamList(): Promise<Array<{ bookId: string }>> {
  return Promise.resolve([{ bookId: 'en-pe' }]);

  const books = await getBooksMap();
  return Object.keys(books)
    .map((bookId: string) => ({ bookId }));
}

/**
 *
 */
export async function getBookIdList(): Promise<Array<string>> {
  // return Promise.resolve(['en-pe']);

  const books = await getBooksMap();
  return Object.keys(books);
}

/**
 *
 */
export async function getBookDescriptionById(
  id: string
): Promise<TBookDescription> {
  const list = await getBooksMap();
  return list[id];
}
