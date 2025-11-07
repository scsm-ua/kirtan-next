import fs from 'node:fs/promises';
import path from 'path';

import { PATH } from '@/other/constants';
import type { TContentGroup } from '@/types/song';

/**
 *
 */
export async function getContentsByBookId(
  bookId: string
): Promise<Array<TContentGroup>> {
  const p = path.join(process.cwd(), PATH.DIR.SOURCE, bookId, 'contentItems.json');
  const str = await fs.readFile(p, 'utf8');
  return JSON.parse(str);
}

/**
 *
 */
export async function getIndexesByBookId(
  bookId: string
): Promise<Array<TContentGroup>> {
  const p = path.join(process.cwd(), PATH.DIR.SOURCE, bookId, 'indexItems.json');
  const str = await fs.readFile(p, 'utf8');
  return JSON.parse(str);
}
