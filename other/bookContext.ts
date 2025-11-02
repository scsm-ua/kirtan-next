'use client';
import { createContext } from "react";

import { TBookContext } from '@/types/book';

/**/
export const BookContext = createContext<TBookContext>({
  bookId: null,
  booksMap: {}
});
