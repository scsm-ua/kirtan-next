'use client';
import { BookContext } from '@/other/bookContext';
import type { TBookContext } from '@/types/book';

/**/
type Props = TBookContext & { children: React.ReactNode };

/**
 *
 */
function BookContextProvider({ bookId, booksMap, children }: Props) {
  const context = { bookId, booksMap };
  return (
    <BookContext.Provider value={context}>
      {children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;
