import type { TResource } from '@/types/resources';

/**/
export type TSong = {
  author: Array<string>;
  meta: {
    author?: string;
    first_line?: string;
    'inline verse'?: 'non bold';
    page?: string | string[];
    translation?: 'no';
    'verse parentheses'?: 'non bold';
  };
  resources: TResource;
  subTitle: Array<string>;
  title: Array<string>;
  verses: Array<TVerse>;
  word_by_word: Array<string>;
};

/**/
export type TVerse = {
  number?: string;
  subtitle?: Array<string>;
  text: Array<string>;
  translation: Array<string>;
  word_by_word: Array<string>;
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
