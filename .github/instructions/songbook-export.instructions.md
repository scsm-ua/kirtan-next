---
description: "Use when modifying the songbook HTML export feature: the /[bookId]/export page, the buildExportHtml document builder in lib/export.ts, the export options (only translated / word by word), the ExportToolbar download/copy buttons, or the export document structure (heading levels, verse/wbw/translation paragraph classes, first-lines index)."
applyTo: ["lib/export.ts", "other/exportDoc.ts", "app/[bookId]/export/**", "components/export/**"]
---

# Songbook HTML Export

`/{bookId}/export` renders the entire songbook as one minimal HTML document meant to be **opened in a word processor** (Word / LibreOffice / Pages / Google Docs) for styling and printing. Everything is prebuilt at build time (`output: 'export'` — no runtime server).

## Architecture

```
lib/export.ts  buildExportHtml(bookId) ──► { body, lang, title }   (server, build time)
                                              │
app/[bookId]/export/page.tsx (static, noindex, NO site Layout)
                                              ▼
components/export/ExportView.tsx (client)  owns the options state
     │  filterExportBody(body, opts)  ──► preview innerHTML
     └► ExportToolbar  getHtml() = wrapExportDoc(filterExportBody(...))
                                    └─► Download .html / Copy HTML

other/exportDoc.ts — pure, node-free: DOC_STYLE, escHtml, wrapExportDoc, filterExportBody
```

- **Single source of truth**: the body string built in `lib/export.ts`. The preview and the downloaded/copied file are both `filterExportBody(body, opts)` — never derive them separately.
- Only the body is shipped to the client; the standalone document shell is added by `wrapExportDoc` at download/copy time (don't also send a prebuilt full doc — it doubles the payload).
- The page intentionally does **not** use `components/common/Layout` — the markup stays near-raw.
- Data loading reuses `getContentsByBookId`, `getSongBySlug`, `getIndexesByBookId`; never duplicate song parsing here.
- `other/exportDoc.ts` is imported by a client component — keep it free of `fs`/`path` imports.

## Export Options

| Checkbox | Default | Effect |
|---|---|---|
| Only translated | on | Removes `.song:not([data-translated="1"])` and the matching `.first-line` entries |
| Word by word | on | When off, removes every `p.wbw` |

Both are applied by `filterExportBody` (browser-only — it uses `DOMParser`). Categories left without songs are dropped automatically. Because filtering runs in an effect, the server-rendered preview is briefly unfiltered — that's expected; don't try to filter during SSG.

Any new option must be expressible as a **DOM query over the prebuilt markup**. If it can't be, add a marker attribute in `lib/export.ts` rather than rebuilding the body on the client.

## Document Structure (fixed contract)

| Element | Content |
|---|---|
| `section.category` | Wraps one contents group (heading + its songs) |
| `h1` | Category (contents group `name`); also "First lines" section at the end |
| `section.song[data-translated]` | Wraps one song; `data-translated="1"` when any verse has a translation |
| `h2` | Song title (lines joined with space) |
| `h3` | Subtitle (one heading per line) |
| `h4` | Author |
| `h5` | Verse number (only when the song has >1 verse) |
| `p.verse` | Origin verse lines |
| `p.wbw` | Classical word-by-word block (also song-level `word_by_word` after the author) |
| `p.translation` | Translation |
| `p.first-line[data-translated]` | One entry of the alphabetical first-lines index (`aliasName` + page) |

Changing heading levels or class names breaks documents users have already styled, and breaks `filterExportBody` — treat this mapping as a contract.

## Word-Processor Semantics (why the markup looks this way)

- Word/LibreOffice map `h1`–`h6` to *Heading 1–6* paragraph styles on import.
- Word/LibreOffice convert CSS classes from the `<style>` block into **named paragraph styles** (`verse`, `wbw`, `translation`). Keep exactly one class per semantic block and keep `DOC_STYLE` minimal — it exists to seed those styles, not to look good.
- Multi-line blocks join lines with `<br>` inside a **single `<p>`** so each block stays one restylable paragraph. Do not emit one `<p>` per line.
- The doc must keep `<meta charset="utf-8">` — diacritics break in Word without it.

## Content Rules

- Plain-text lines (titles, verse text, first lines) go through `escHtml()`. Translation/wbw lines go through `processTranslationLines()` (other/utils.ts), which returns HTML — insert unescaped, never double-escape.
- Songs with page duplicates appear multiple times in contents; emit each slug **once** (the `seen` set), at first occurrence.
- Inline/learn wbw tables are deliberately excluded — classical `word_by_word` only.

## Toolbar (components/export/ExportToolbar.tsx)

- Client component; Download uses a Blob + `a[download]`, Copy writes a `ClipboardItem` with **`text/html`** flavor (this is what makes Word/Docs paste with heading styles) plus `text/plain`, with `writeText` fallback.
- The document is produced by the `getHtml()` prop at click time, so it always reflects the current checkbox state.
- The toolbar is `position: fixed` and hidden via `@media print` — keep it out of any print/PDF path.

## Discoverability

Hidden from the UI on purpose. Reachable by URL and the `e` hotkey (`useGlobalHotkeys` → `router.push('/{bookId}/export')`; listed in `HotkeysModal`). `export` is in `NON_SONG_SEGMENTS` in `useGlobalHotkeys.ts` — keep it there or the page gets treated as a song page. Page metadata is `noindex`; the route is not in `app/sitemap.ts`.

## Verification

- `pnpm build` → `out/{bookId}/export/index.html` exists per book.
- Open the downloaded file in Word/LibreOffice: Heading 1–6 map correctly and `verse`/`wbw`/`translation` appear in the Styles pane.
