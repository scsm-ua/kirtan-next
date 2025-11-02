/**/
export type TBookDescription = {
  // path: string;
  slug: string;
  // sort_order: number;
  songsCount: number;
  subtitle: string;
  title: string;
};

/**/
export type TBooksMap = Record<string, TBookDescription>;

/**/
export type TBookContext = {
  bookId: string;
  booksMap: TBooksMap;
};
