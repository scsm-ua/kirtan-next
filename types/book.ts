/**/
export type TBookDescription = {
  slug: string;
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

/**/
export type BookListPageProps = {
  params: Promise<{ bookId: string }>;
};

/**/
export type SongPageProps = {
  params: Promise<{
    bookId: string;
    slug: string;
  }>;
};
