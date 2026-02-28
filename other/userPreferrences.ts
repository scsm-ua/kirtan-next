import { PREFERENCES } from '@/other/constants';
import type { TTranslationMode } from '@/types/common';

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
const SONG_DISPLAY_MODE = 'SONG_DISPLAY_MODE';

/**/
const SHOW_HIDDEN_BOOKS = 'SHOW_HIDDEN_BOOKS';

/**/
export function getSongDisplayMode(): TTranslationMode {
  const val = localStorage.getItem(SONG_DISPLAY_MODE);
  return (val || '3') as TTranslationMode;
}

/**/
export function setSongDisplayMode(value: TTranslationMode) {
  localStorage.setItem(SONG_DISPLAY_MODE, value);
}

/**/
export function shouldShowHiddenBooks(): boolean {
  return !!localStorage.getItem(SHOW_HIDDEN_BOOKS);
}
