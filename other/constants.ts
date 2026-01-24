/**/
export const SITE = {
  NAME: 'Kirtan Site',
  ORIGIN: process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3333/'
};

/**/
export const FILES = {
  A_Z: 'a-z.json',
  AUTHORS: 'authors.json',
  SONGBOOKS: 'songbooks.json',
  CONTENTS: 'contents.json',
  SITEMAP: 'sitemap.xml'
};

/**/
export const PATH = {
  DIR: {
    SONGS: 'songs',
    SOURCE_BOOKS: 'source/books',
    SOURCE_ROOT: 'source'
  },
  // FILE: {
  //   BOOK_LIST: '@/source/book-list.json'
  // },
  IMG: {
    COVER: SITE.ORIGIN + 'images/cover/',
    FAV: SITE.ORIGIN + 'images/favicon/',
    LOGO: SITE.ORIGIN + 'images/svg/kirtan-site.svg',
    SVG: SITE.ORIGIN + 'images/svg/',
    THUMBNAIL: SITE.ORIGIN + 'images/thumbnail/'
  },
  PAGE: {
    A_Z: '/a-z',
    AUTHORS: '/authors',
    BOOK_LIST: '',
    CONTENTS: '/contents',
    SEARCH: '/search'
  }
};

/**/
export const PREFERENCES = {
  PREFERRED_BOOK_ID: 'CURRENT_BOOK_ID'
};

/**/
export const MODAL_CLASS_NAMES = {
  modal: 'AppModal__container',
  overlay: 'AppModal__mask',
  closeButton: 'AppModal__button',
  closeIcon: 'AppModal__icon'
};
