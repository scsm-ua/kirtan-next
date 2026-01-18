import { TSong } from '@/types/song';

/**
 *
 */
export function getSongPageTitle(song: TSong): string {
  let title = song.title.join(' ');

  if (song.author?.length > 0) {
    title += '. ' + song.author[0];
  }

  if (song.subTitle?.length > 0) {
    title += '. ' + song.subTitle.join(' ');
  }

  return title;
}
