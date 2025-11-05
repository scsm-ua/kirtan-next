/**/
export const SITE = {
  NAME: 'Kirtan Site',
  ORIGIN: process.env.PUBLIC_ORIGIN || 'http://localhost:3333/'
};

/**/
export const PATH = {
  DIR: {
    SOURCE: 'source'
  },
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
