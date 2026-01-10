import AZ from '@/components/a-z/AZ';
import BookDescription from '@/components/common/BookDescription/BookDescription';
import { getAzPageMeta } from '@/other/metadata/getAzPageMeta';
import { getBookIdParamList, getBooksMap } from '@/lib/books';
import { getIndexesByBookId } from '@/lib/contents';
import Layout from '@/components/common/Layout/Layout';
import Pills from '@/components/common/Pills/Pills';
// import LdJson from '@/other/metadata/LdJson';

import type { BookListPageProps } from '@/types/book';
import type { TContentGroup } from '@/types/common';

/**/
export const generateMetadata = getAzPageMeta;
// export const generateStaticParams = getBookIdParamList;
export const generateStaticParams = () => [{ bookId: 'en-pe' }];

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
    <Layout bookId={bookId}>
      <div className="Main__container AZ">
        <div className="IndexPage__title">
          <BookDescription bookDescription={book} />
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
  );
}

/**/
export default AZPage;
