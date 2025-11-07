// import BookContextProvider from '@/components/common/BookContextProvider';
import AZ from '@/components/a-z/AZ';
import BookThumbnail from '@/components/common/BookThumbnail/BookThumbnail';
import Contents from '@/components/contents/Contents';
import { getBookIdParamList, getBooksMap } from '@/lib/books';
// import { getBookListMeta } from '@/other/metadata/getBookListMeta';
import { getIndexesByBookId } from '@/lib/contents';
import Layout from '@/components/common/Layout/Layout';
import Pills from '@/components/common/Pills/Pills';
// import LdJson from '@/other/metadata/LdJson';

import type { BookListPageProps } from '@/other/metadata/getBookListMeta';
import { TContentGroup } from '@/types/song';

/**/
// export const generateMetadata = getBookListMeta;
// export const generateStaticParams = getBookIdParamList;
export const generateStaticParams = () => [{ bookId: 'en-pe' }];

// const items = [
//   { title: 'A' },
//   { title: 'b' },
//   { title: 'C' },
//   { title: 'D' },
//   { title: 'Dw' },
//   { title: 'E' },
//   { title: 'F' },
//   { title: 'F45' },
//   { title: 'F23' },
//   { title: 'FSD' },
//   { title: '54R' },
// ];

/**
 *
 */
async function AZPage({ params }: BookListPageProps) {
  const { bookId } = await params;
  const contents = await getIndexesByBookId(bookId);

  const booksMap = await getBooksMap();
  const book = booksMap[bookId];
  const items = contents.map((item: TContentGroup) => ({ title: item.name }));

  return (
    // <BookContextProvider {...context}>
      <Layout bookId={bookId}>
        <div className="Main__container AZ">
          <div className="IndexPage__title">
            <BookThumbnail bookDescription={book} />
          </div>

          <div className="Main__content">
            <div className="AZ__list">
              <Pills items={items} />
            </div>

            <AZ bookId={bookId} contents={contents} />
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
export default AZPage;
