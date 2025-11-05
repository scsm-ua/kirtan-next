// import BookContextProvider from '@/components/common/BookContextProvider';
import BookThumbnail from '@/components/common/BookThumbnail/BookThumbnail';
import Contents from '@/components/contents/Contents';
import { getBookIdParamList, getBooksMap } from '@/lib/books';
// import { getBookListMeta } from '@/other/metadata/getBookListMeta';
import { getContentsByBookId } from '@/lib/contents';
import Layout from '@/components/common/Layout/Layout';
// import LdJson from '@/other/metadata/LdJson';

import type { BookListPageProps } from '@/other/metadata/getBookListMeta';

/**/
// export const generateMetadata = getBookListMeta;
// export const generateStaticParams = getBookIdParamList;
export const generateStaticParams = () => [{ bookId: 'en-pe' }];

/**
 *
 */
async function ContentsPage({ params }: BookListPageProps) {
  const { bookId } = await params;

  const contents = await getContentsByBookId(bookId);

  const booksMap = await getBooksMap();
  const book = booksMap[bookId];

  return (
    // <BookContextProvider {...context}>
      <Layout bookId={bookId}>
        <div className="Main__container Contents">
          <div className="IndexPage__title">
            <BookThumbnail bookDescription={book} />
          </div>

          <div className="Main__content">
            <Contents bookId={bookId} contents={contents} />
          </div>

        {/*<LdJson*/}
        {/*  bookId={bookId}*/}
        {/*  description={book.subtitle}*/}
        {/*  title={book.title}*/}
        {/*/>*/}
        </div>
      </Layout>
    // </BookContextProvider>
  );
}

/**/
export default ContentsPage
