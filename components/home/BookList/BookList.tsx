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
          {Object.entries(booksMap)
            .sort(([bid, book]: [string, TBookDescription]) =>
              bid === bookId ? -1 : 1
            )
            .map(([bid, book]: [string, TBookDescription]) => (
              <li className="BookList__tem" key={book.slug}>
                <BookCard bookDescription={book} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

/**/
export default BookList;
