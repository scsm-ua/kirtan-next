import { getContentsByBookId } from '@/lib/contents';
import type { TContentGroup, TContentItem } from '@/types/common';
import type { TPage } from '@/types/search';

/**/
const pagesMap = new Map<string, TPage>();

/**
 *
 */
export function getPagesList(bookId: string): Promise<Array<TPage>> {
  return getContentsByBookId(bookId).then((groups: Array<TContentGroup>) => {
    groups.forEach((g: TContentGroup) => handleGroup(g, bookId));

    return Array.from(pagesMap)
      .sort(
        (a: [string, TPage], b: [string, TPage]) =>
          parseFloat(a[0]) - parseFloat(b[0])
      )
      .map((item: [string, TPage]) => item[1]);
  });
}

/**
 *
 */
function handleGroup(group: TContentGroup, bookId: string): void {
  group.items.forEach((item: TContentItem) =>
    item.pages.forEach((page: string) =>
      pagesMap.set(page, {
        page: page,
        path: `${bookId}/${item.id}?p=${page}`,
        title: item.title
      })
    )
  );
}
