import BookList from '@/components/home/BookList/BookList';
import { getBookIdParamList, getBooksMap } from '@/lib/books';
import { getBookListMeta } from '@/other/metadata/getBookListMeta';
import Layout from '@/components/common/Layout/Layout';
import LdJson from '@/other/metadata/LdJson';

import type { BookListPageProps } from '@/other/metadata/getBookListMeta';

/**/
export const generateMetadata = getBookListMeta;
export const generateStaticParams = getBookIdParamList;

/**
 *
 */
async function BookListPage({ params }: BookListPageProps) {
  const { bookId } = await params;
  const booksMap = await getBooksMap();

  const book = booksMap[bookId];
  const context = { bookId, booksMap };

  return (
    <Layout bookId={bookId}>
      <LdJson
        bookId={bookId}
        description={book.subtitle}
        title={book.title}
      />

      <BookList bookId={bookId} booksMap={booksMap} />
    </Layout>
  );
}

/**/
export default BookListPage;
