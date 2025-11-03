import type { TBookDescription, TBooksMap } from '@/types/book';

/**
 *
 */
export async function getBooksMap(): Promise<TBooksMap> {
  return (await import('@/source/book-list.json')).default;
}

/**
 *
 */
export async function getBookIdParamList(): Promise<Array<{ bookId: string }>> {
  const books = await getBooksMap();
  return Object.keys(books)
    .map((bookId: string) => ({ bookId }));
}

/**
 *
 */
export async function getBookIdList(): Promise<Array<string>> {
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
