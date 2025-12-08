// import BookContextProvider from '@/components/common/BookContextProvider';
import Authors from '@/components/authors/Authors';
import AuthorBadges from '@/components/authors/AuthorBadges';
import BookDescription from '@/components/common/BookDescription/BookDescription';
import { getBookIdParamList, getBooksMap } from '@/lib/books';
// import { getBookListMeta } from '@/other/metadata/getBookListMeta';
import { getAuthorsByBookId } from '@/lib/contents';
import Layout from '@/components/common/Layout/Layout';
import { translate } from '@/other/i18n';
// import LdJson from '@/other/metadata/LdJson';

import type { BookListPageProps } from '@/other/metadata/getBookListMeta';
import { TContentGroup } from '@/types/common';

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
async function AuthorsPage({ params }: BookListPageProps) {
  const { bookId } = await params;
  const contents = await getAuthorsByBookId(bookId);

  const booksMap = await getBooksMap();
  const book = booksMap[bookId];

  const label = translate(bookId, 'AUTHORS_PAGE.NO_AUTHOR');

  const items = contents.filter((g: TContentGroup) => g.name);
  const noAuthor = contents.find(
    (g: TContentGroup) => !g.name && g.items.length > 0
  );

  if (noAuthor) {
    items.push({
      items: noAuthor.items,
      name: label
    });
  }

  return (
    // <BookContextProvider {...context}>
    <Layout bookId={bookId}>
      <div className="Main__container Authors">
        <div className="IndexPage__title">
          <BookDescription bookDescription={book} />
        </div>

        <div className="Main__content">
          <AuthorBadges contents={items} />
          <Authors bookId={bookId} contents={items} />
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
export default AuthorsPage;
