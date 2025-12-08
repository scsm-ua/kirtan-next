import fs from 'node:fs/promises';
import path from 'path';

import { FILES, PATH } from '@/other/constants';
import { TContentGroup } from '@/types/common';

/**/
export function getAuthorsByBookId(bookId: string): Promise<Array<TContentGroup>> {
  return getListDataByBookId(bookId, FILES.AUTHORS);
}

/**/
export function getContentsByBookId(bookId: string): Promise<Array<TContentGroup>> {
  return getListDataByBookId(bookId, FILES.CONTENTS);
}

/**/
export function getIndexesByBookId(bookId: string): Promise<Array<TContentGroup>> {
  return getListDataByBookId(bookId, FILES.A_Z);
}

/**
 *
 */
async function getListDataByBookId(
  bookId: string,
  fileName: string
): Promise<Array<TContentGroup>> {
  const p = path.join(process.cwd(), PATH.DIR.SOURCE, bookId, fileName);
  const str = await fs.readFile(p, 'utf8');
  return JSON.parse(str);
}
