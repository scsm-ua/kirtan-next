/**/
export type TTranslation = {
  [key: string]:
    | string
    | { [key: string]: string | { [key: string]: string } };
};

/**/
export type GetTranslation = (key: string) => string;

/**/
export type TPill = {
  // page: string;
  // path: string;
  title: string;
  // type?: string;
};

/**/
export type TContentItem_obsolete = {
  aliasName: string;            // aliasName ?== id
  duplicates: Array<any>;
  embeds: Array<string>;
  fileName: string;             // id + .html
  id: string;                   // slug
  idx?: number;                 // Build-time field. To be removed.
  name?: string;                // name ?== title
  page: number | Array<number>;
  page_number?: number;         // Build-time field. To be discussed.
  title: string;                // Human-readable title.
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
