/**/
export type TSong = {
  attributes: {
    page: string;
  };
  author: Array<string>;
  embeds: Array<TAudio>;
  meta: {
    author?: string;
  };
  subTitle: Array<string>;
  title: Array<string>;
  verses: Array<TVerse>;
  word_by_word: Array<string>;
};

/**/
export type TAudio = {
  embed_url: string;
  title: string;
};

/**/
export type TVerse = {
  number?: string;
  text: Array<string>;
  translation: Array<string>;
};

/**/
export type TNavItem = {
  path: string;
  title: string;
};

/**/
export type TNavItems = {
  prev: TNavItem | void;
  next: TNavItem | void;
};

/**/
export type TNavItemsMap = { [page: string]: TNavItems };
