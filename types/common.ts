/**/
export type TPill = {
  // page: string;
  // path: string;
  title: string;
  // type?: string;
};

/**/
export type TContentGroup = {
  items: Array<TContentItem>;
  name?: string;
};

/**/
export type TContentItem = {
  aliasName: string;    // The first line of the first verse.
  // author?: string;      // not used at the moment
  id: string;           // Slug of the song.
  page: string;
  pages: Array<string>; // Contains more than one item if page has duplicates.
  title: string;        // Human-readable title.
  has: {
    audio: boolean;
    translation: boolean;
  }
};
/**/
export type TTranslationMode = '1' | '2' | '3';

/**/
declare global {
  interface Window {
    SC: {
      Widget: any;
    };
  }
}
