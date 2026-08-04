/**
 * Pure helpers shared by the server-side builder (`lib/export.ts`) and the
 * client-side export view. Must stay free of node/fs imports.
 */

/**/
export type TVerseNumberMode = 'heading' | 'verse-suffix' | 'translation-prefix';

/**/
export type TExportOptions = {
  onlyTranslated: boolean;
  verseNumberMode: TVerseNumberMode;
  withWbw: boolean;
};

/**
 * Minimal styles: Word/LibreOffice turn each CSS class into a named
 * paragraph style on import, so keep one class per semantic block.
 */
export const DOC_STYLE = `
  p.wbw { font-size: 0.9em; }
  p.verse { margin-left: 40px; }
  p.first-line { margin: 0; }
  h5 { text-align: center; }
`;

/**
 *
 */
export function escHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/**
 * Wraps the document body into a standalone HTML file.
 */
export function wrapExportDoc(
  body: string,
  title: string,
  lang: string
): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${escHtml(title)}</title>
<style>${DOC_STYLE}</style>
</head>
<body>
${body}</body>
</html>
`;
}

/**
 * Applies the toolbar options to the prebuilt body. Browser only — relies
 * on `DOMParser` so the markup markers stay the single source of truth.
 */
export function filterExportBody(
  body: string,
  { onlyTranslated, verseNumberMode, withWbw }: TExportOptions
): string {
  const parsed = new DOMParser().parseFromString(
    `<div>${body}</div>`,
    'text/html'
  );
  const root = parsed.body.firstElementChild as HTMLElement;

  if (onlyTranslated) {
    root
      .querySelectorAll('.song:not([data-translated="1"])')
      .forEach((el) => el.remove());
    root
      .querySelectorAll('.first-line:not([data-translated="1"])')
      .forEach((el) => el.remove());
  }

  if (!withWbw) {
    root.querySelectorAll('p.wbw').forEach((el) => el.remove());
  }

  if (verseNumberMode !== 'heading') {
    root.querySelectorAll('.verse-block').forEach((block) => {
      const num = block.getAttribute('data-number');
      if (!num) return;
      block.querySelector('h5')?.remove();

      if (verseNumberMode === 'verse-suffix') {
        const verse = block.querySelector('p.verse');
        if (verse) verse.appendChild(parsed.createTextNode(`\u00a0\u00a0[${num}]`));
      } else {
        const trans = block.querySelector('p.translation');
        if (trans) {
          const strong = parsed.createElement('strong');
          strong.textContent = `${num}\u00a0\u00a0`;
          trans.prepend(strong);
        }
      }
    });
  }

  // Drop category headings left without songs.
  root.querySelectorAll('.category').forEach((el) => {
    if (!el.querySelector('.song')) el.remove();
  });

  return root.innerHTML;
}
