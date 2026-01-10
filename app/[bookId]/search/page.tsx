import './SearchPage.scss';

import BookDescription from '@/components/common/BookDescription/BookDescription';
import { getBookIdParamList, getBooksMap } from '@/lib/books';
import { getPagesList } from '@/lib/search';
import { getSearchPageMeta } from '@/other/metadata/getSearchPageMeta';
import Layout from '@/components/common/Layout/Layout';
import PageList from '@/components/search/PageList/PageList';
import SearchModule from '@/components/search/SearchModule/SearchModule';
// import LdJson from '@/other/metadata/LdJson';

import type { BookListPageProps } from '@/types/book';

/**/
export const generateMetadata = getSearchPageMeta;
export const generateStaticParams = getBookIdParamList;

/**
 *
 */
async function SearchPage({ params }: BookListPageProps) {
  const { bookId } = await params;
  const pages = await getPagesList(bookId);
  const booksMap = await getBooksMap();

  const book = booksMap[bookId];
  const pageList = <PageList bookId={bookId} pages={pages} /> as any;

  return (
    <Layout bookId={bookId}>
      <div className="Main__container SearchPage__container">
        <header className="SearchPage__header">
          <BookDescription bookDescription={book} />
        </header>

        <SearchModule bookId={bookId} pageList={pageList} />

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
export default SearchPage;
