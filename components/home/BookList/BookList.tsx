import './BookList.scss';
import BookCard from '@/components/home/BookCard/BookCard';

import type { TBookDescription } from '@/types/book';
import type { TBooksMap } from '@/types/book';

/**/
type Props = {
  bookId: string;
  booksMap: TBooksMap;
};

/**
 *
 */
function BookList({ bookId, booksMap }: Props) {
  return (
    <div className="BookList">
      <div className="Main__content BookList__content">
        <ul className="BookList__list">
          <BookCard bookDescription={booksMap[bookId]} key={bookId} />

          {Object.entries(booksMap)
            .filter(([bid]: [string, TBookDescription]) => bid !== bookId)
            .sort(
              ([bid, book]: [string, TBookDescription], b) =>
                (book.sort_order || Number.MAX_SAFE_INTEGER) -
                (b[1].sort_order || Number.MAX_SAFE_INTEGER)
            )
            .map(([_, book]: [string, TBookDescription]) => (
              <BookCard bookDescription={book} key={book.slug} />
            ))}
        </ul>
      </div>
    </div>
  );
}

/**/
export default BookList;
