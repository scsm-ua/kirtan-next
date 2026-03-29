import { getContentsByBookId } from '@/lib/contents';
import type { TContentGroup, TContentItem } from '@/types/common';
import type { TPage } from '@/types/search';

/**
 *
 */
export function getPagesList(bookId: string): Promise<Array<TPage>> {
  const pagesMap = new Map<string, TPage>();

  return getContentsByBookId(bookId).then((groups: Array<TContentGroup>) => {
    groups.forEach((group: TContentGroup) =>
      group.items.forEach((item: TContentItem) =>
        item.pages.forEach((page: string) => {

          let path = `/${bookId}/${item.id}`;
          // Put page number to navigation, only if required by variations. First page is default.
          if (item.pages?.length > 1 && item.pages[0] != page) {
            path += `?p=${page}`;
          } else {
            path += `/`; 
          }

          return pagesMap.set(page, {
            page: page + '',
            path,
            title: item.title
          })
        })
      )
    );

    return Array.from(pagesMap)
      .sort(
        (a: [string, TPage], b: [string, TPage]) =>
          parseFloat(a[0]) - parseFloat(b[0])
      )
      .map((item: [string, TPage]) => item[1]);
  });
}
