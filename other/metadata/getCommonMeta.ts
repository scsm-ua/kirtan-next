// import type { Metadata } from 'next';
// import { SITE } from '@/other/constants';

/**/
export const CREATOR = 'Sri Chaitanya Saraswat Math Worldwide';
export const KEYWORDS = ['Kirtan', 'Sri Chaitanya Saraswat Math', 'Gaudiya gitanjali', 'Vaishnava songbook'];
export const PUBLISHER = 'Sri Chaitanya Saraswat Math Worldwide';


  /**
 *
 */
export function getCommonMeta()/*: Metadata*/ {
  return {
    authors: ['Srila Bhaktivinod Thakur', 'Srila Narottam Das Thakur'],
    creator: CREATOR,
    keywords: KEYWORDS,
    publisher: PUBLISHER,
  };
}

/**/
const FAVICON_META = {

};
