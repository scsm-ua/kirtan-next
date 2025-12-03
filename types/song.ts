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
export type TIndexList = Record<string, string>;

/**/
export type TContentItem = {
  aliasName: string;    // The first line of the first verse.
  author?: string;      // not used at the moment
  id: string;           // Slug of the song.
  page: number;
  pages: Array<number>; // Contains more than one item if page has duplicates.
  title: string;        // Human-readable title.
  has: {
    audio: boolean;
  }
};
