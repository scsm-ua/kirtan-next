import { PREFERENCES } from '@/other/constants';

/**
 * Preserve user choice of the Book ID in the Local storage.
 */
export function saveBookChoice(bookId: string): void {
  try {
    localStorage.setItem(PREFERENCES.PREFERRED_BOOK_ID, bookId);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Preserve user choice of show/hide song verses/translation.
 * Value:	'1' - show only verses,
 * 				'2' - show only translation,
 * 				'3' - show both (default).
 */
const SONG_DISPLAY_MODE = 'SONG_DISPLAY_MODE'

/**/
export function getSongDisplayMode(): string {
  const val = localStorage.getItem(SONG_DISPLAY_MODE);
  return val || '3';
}

/**/
export function setSongDisplayMode(value: string) {
  localStorage.setItem(SONG_DISPLAY_MODE, value);
}
