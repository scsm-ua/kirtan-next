import BookList from '@/components/home/BookList/BookList';
import { getBooksMap } from '@/lib/books';
import { getBookListPageMeta } from '@/other/metadata/getBookListPageMeta';
import Layout from '@/components/common/Layout/Layout';
import LdJson from '@/other/metadata/LdJson';
import { PATH } from '@/other/constants';

import type { BookListPageProps } from '@/types/book';

/**/
export const dynamicParams = false;
export const generateMetadata = getBookListPageMeta;
/* See the comments in the `app/layout.tsx` file. */
// export const generateStaticParams = getBookIdParamList;

/**
 *
 */
async function BookListPage({ params }: BookListPageProps) {
  const { bookId } = await params;
  const booksMap = await getBooksMap();

  return (
    <Layout bookId={bookId}>
      <BookList bookId={bookId} booksMap={booksMap} />

      <LdJson
        bookId={bookId}
        pageKey="BOOK_LIST_PAGE"
        pagePath={PATH.PAGE.BOOK_LIST}
      />
    </Layout>
  );
}

/**/
export default BookListPage;
