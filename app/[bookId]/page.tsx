import BookContextProvider from '@/components/common/BookContextProvider';
import BookList from '@/components/home/BookList/BookList';
import Footer from '@/components/common/Footer/Footer';
import { getBookIdParamList, getBooksMap } from '@/lib/books';
import Layout from '@/components/common/Layout/Layout';

/**/
export const generateStaticParams = getBookIdParamList;

/**/
type Props = {
  params: Promise<{ bookId: string }>;
};

/**
 *
 */
export default async function BookListPage({ params }: Props) {
  const { bookId } = await params;
  const booksMap = await getBooksMap();

  const context = { bookId, booksMap };
  const footer = <Footer bookId={bookId} />;

  return (
    <BookContextProvider {...context}>
      <Layout footer={footer}>
        <BookList bookId={bookId} booksMap={booksMap} />
      </Layout>
    </BookContextProvider>
  );
}
