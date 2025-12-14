import type { TSong } from '@/types/song';

/**
 *
 */
export function getLineIndent(line: string) {
  const res = line.match(/^\s+/);

  if (res) {
    const count = Math.floor(res[0].length / 4);
    return count > 4 ? 4 : count;
  }

  return 0;
}

const TAG_RE = /<[^>]+>/gi;
const PARANTHESES_RE = /(\([^\)]+\))/gi;
const PARANTHESES_START_RE = /(\([^\)]+)\s*$/gi; // ) End in next line.
const PARANTHESES_END_RE = /^(\s*)([^\)]+\))/gi; // ( Start in prev line.

/**
 * EJS trims lines even despite 'rmWhitespace: false'.
 * But we want some verse lines have extra space in the beginning.
 */
export function getLineContent(
  aLine: string,
  attributes: TSong['attributes'],
  hasNumber: boolean
): string {
  // Cleanup tags for safety.
  let line = aLine.replace(TAG_RE, '');

  if (attributes && attributes['verse parentheses'] === 'non bold') {
    line = line.replace(
      PARANTHESES_RE,
      '<span class="SongVerse__light">$1</span>'
    );
    line = line.replace(
      PARANTHESES_START_RE,
      '<span class="SongVerse__light">$1</span>'
    );
    line = line.replace(
      PARANTHESES_END_RE,
      '$1<span class="SongVerse__light">$2</span>'
    );
  } else if (
    attributes &&
    attributes['inline verse'] === 'non bold' &&
    !hasNumber
  ) {
    line = `<span class="SongVerse__light">${line}</span>`;
  }

  // Try fix with indents.
  // Remove starting indent (as its fixed by `getLineIndentClass`).
  line = line.replace(/^\s+/, '');
  // Replace inner tabs.
  line = line.replace(
    /\s{4}/gi,
    '<span class="SongVerse__space">&nbsp;&nbsp;&nbsp;&nbsp;</span>'
  );

  return line;
}
