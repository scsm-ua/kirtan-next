import BookDescription from '@/components/common/BookDescription/BookDescription';
import Contents from '@/components/contents/Contents';
import { getBookIdParamList, getBooksMap } from '@/lib/books';
import { getContentsByBookId } from '@/lib/contents';
import { getContentsPageMeta } from '@/other/metadata/getContentsPageMeta';
import Layout from '@/components/common/Layout/Layout';
import LdJson from '@/other/metadata/LdJson';
import { PATH } from '@/other/constants';

import type { BookListPageProps } from '@/types/book';

/**/
export const generateMetadata = getContentsPageMeta;
export const generateStaticParams = getBookIdParamList;

/**
 *
 */
async function ContentsPage({ params }: BookListPageProps) {
  const { bookId } = await params;

  const contents = await getContentsByBookId(bookId);

  const booksMap = await getBooksMap();
  const book = booksMap[bookId];

  return (
    <Layout bookId={bookId}>
      <div className="Main__container Contents">
        <div className="IndexPage__title">
          <BookDescription bookDescription={book} />
        </div>

        <div className="Main__content">
          <Contents bookId={bookId} contents={contents} />
        </div>

        <LdJson bookId={bookId} pageKey="CONTENTS_PAGE" pagePath={PATH.PAGE.CONTENTS} />
      </div>
    </Layout>
  );
}

/**/
export default ContentsPage;
