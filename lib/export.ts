import { escHtml as esc } from '@/other/exportDoc';
import { getBooksMap } from '@/lib/books';
import { getContentsByBookId, getIndexesByBookId } from '@/lib/contents';
import { getSongBySlug } from '@/lib/song';
import { processTranslationLines } from '@/other/utils';

import type { TContentGroup, TContentItem } from '@/types/common';
import type { TSong, TVerse } from '@/types/song';


/**/
export type TExportDoc = {
  body: string;
  lang: string;
  title: string;
};

/**
 * Songs explicitly marked as untranslatable (transliteration only).
 */
function isTranslated(song: TSong): boolean {
  return song.meta?.translation !== 'no';
}

/**
 * Escape + encode spaces so Word's HTML importer preserves verse alignment.
 * Leading indent and runs of 2+ spaces become &nbsp; chains.
 */
function escVerseSpaces(line: string): string {
  return line
    .replace(/^ +/, (m) => '&nbsp;'.repeat(m.length))
    .replace(/ {2,}/g, (m) => '&nbsp;'.repeat(m.length));
}

/**
 * Mirrors the bold/non-bold logic from VerseText / getLineContent.
 * Bold parts are wrapped in <strong>; paren groups and non-bold lines are plain.
 */
function renderVerseLine(
  line: string,
  meta: TSong['meta'],
  hasNumber: boolean
): string {
  const escaped = escVerseSpaces(esc(line));

  if (meta?.['inline verse'] === 'non bold' && !hasNumber) {
    return escaped;
  }

  if (meta?.['verse parentheses'] === 'non bold') {
    // Split on (...) groups; odd indices are paren content (plain), even are bold.
    const parts = escaped.split(/(\([^)]+\))/g);
    return parts
      .map((part, i) => (i % 2 === 1 || !part ? part : `<strong>${part}</strong>`))
      .join('');
  }

  return `<strong>${escaped}</strong>`;
}

/**
 * One paragraph per block; source lines are joined with <br> so the block
 * stays a single restylable paragraph in a word processor.
 */
function paragraph(cls: string, lines: string[], isHtml = false): string {
  if (!lines || lines.length === 0) return '';
  const content = (isHtml ? lines : lines.map(esc)).join('<br>\n');
  return `<p class="${cls}">${content}</p>\n`;
}

/**
 *
 */
function heading(level: number, text: string): string {
  if (!text) return '';
  return `<h${level}>${esc(text)}</h${level}>\n`;
}

/**
 *
 */
function renderVerse(verse: TVerse, showNumber: boolean, meta: TSong['meta']): string {
  const num = showNumber && verse.number ? esc(verse.number) : '';
  const hasNumber = !!verse.number;
  let html = `<div class="verse-block" data-number="${num}">\n`;

  if (num) {
    html += heading(5, verse.number);
  }
  if (verse.subtitle?.length > 0) {
    html += paragraph('verse-subtitle', verse.subtitle);
  }
  html += paragraph('verse', verse.text?.map((l) => renderVerseLine(l, meta, hasNumber)), true);
  html += paragraph(
    'wbw',
    processTranslationLines(verse.word_by_word, 'wbw'),
    true
  );
  html += paragraph(
    'translation',
    processTranslationLines(verse.translation, 'translation'),
    true
  );

  return html + '</div>\n';
}

/**
 *
 */
function renderSong(song: TSong): string {
  let html = `<section class="song" data-translated="${
    isTranslated(song) ? 1 : 0
  }">\n`;

  html += heading(2, (song.title || []).join(' '));
  (song.subtitle || []).forEach((s: string) => (html += heading(3, s)));
  (song.author || []).forEach((a: string) => (html += heading(4, a)));
  // Song-level word-by-word note (rendered under the header on the site).
  html += paragraph(
    'wbw',
    processTranslationLines(song.word_by_word, 'wbw'),
    true
  );

  const showNumbers = song.verses.length > 1;
  for (const verse of song.verses) {
    html += renderVerse(verse, showNumbers, song.meta);
  }

  return html + '</section>\n';
}

/**
 *
 */
function renderFirstLines(
  indexes: TContentGroup[],
  translated: Set<string>
): string {
  let html = heading(1, 'First lines');

  for (const group of indexes) {
    for (const item of group.items) {
      // In the a-z file, title and aliasName are swapped vs. contents.
      const line = item.title || item.aliasName;
      const page = item.page ? ` — ${item.page}` : '';
      const flag = translated.has(item.id) ? 1 : 0;
      html += `<p class="first-line" data-translated="${flag}">${esc(
        line
      )}${esc(page)}</p>\n`;
    }
  }

  return html;
}

/**
 * Builds the whole songbook body as minimal HTML suitable for opening in
 * a word processor. The client wraps it into a standalone document after
 * applying the export options.
 */
export async function buildExportHtml(bookId: string): Promise<TExportDoc> {
  const [booksMap, contents, indexes] = await Promise.all([
    getBooksMap(),
    getContentsByBookId(bookId),
    getIndexesByBookId(bookId)
  ]);
  const book = booksMap[bookId];

  let body = '';
  const seen = new Set<string>();
  const translated = new Set<string>();

  for (const group of contents) {
    let groupHtml = group.name ? heading(1, group.name) : '';

    for (const item of group.items as TContentItem[]) {
      // Songs with page duplicates appear twice in contents; emit once.
      if (seen.has(item.id)) continue;
      seen.add(item.id);

      const song = await getSongBySlug(item.id, bookId);
      if (!song) continue;
      if (isTranslated(song)) translated.add(item.id);
      groupHtml += renderSong(song);
    }

    body += `<section class="category">\n${groupHtml}</section>\n`;
  }

  body += renderFirstLines(indexes, translated);

  const lang = bookId.slice(0, 2);
  const title = book?.title || bookId;

  return { body, lang, title };
}
