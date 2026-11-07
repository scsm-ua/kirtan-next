import type { TContentItem } from '@/types/common';

/**/
export type TAudioTrack = {
  url: string;
  title?: string;
};

/**/
export type TAudioEntry = {
  item: TContentItem;
  label: string;
  tracks: Array<TAudioTrack>;
};

/**/
export type TAudioGroup = {
  name?: string;
  items: Array<TAudioEntry>;
};

/** Sort/source of the list: first lines (`a-z`) or titles (`contents`). */
export type TAudioSort = 'a-z' | 'contents';
