/**/
export type TContentItem = {
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
