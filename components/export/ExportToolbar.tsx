'use client';
import { useState } from 'react';

import './ExportToolbar.scss';

import type { TVerseNumberMode } from '@/other/exportDoc';

/**/
type Props = {
  fileName: string;
  getHtml: () => string;
  onlyTranslated: boolean;
  onOnlyTranslatedChange: (value: boolean) => void;
  onVerseNumberModeChange: (value: TVerseNumberMode) => void;
  onWithWbwChange: (value: boolean) => void;
  verseNumberMode: TVerseNumberMode;
  withWbw: boolean;
};

/**
 * Floating controls for saving/copying the export document.
 * Hidden in print so File > Print > PDF stays clean.
 */
function ExportToolbar({
  fileName,
  getHtml,
  onlyTranslated,
  onOnlyTranslatedChange,
  onVerseNumberModeChange,
  onWithWbwChange,
  verseNumberMode,
  withWbw
}: Props) {
  const [copied, setCopied] = useState<string>('');

  const handleDownload = () => {
    const blob = new Blob([getHtml()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const d = new Date();
    const ts = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0'),
      String(d.getHours()).padStart(2, '0'),
      String(d.getMinutes()).padStart(2, '0')
    ].join('-');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}-${ts}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const flashCopied = (label: string) => {
    setCopied(label);
    window.setTimeout(() => setCopied(''), 2000);
  };

  // text/html flavor lets Word / Google Docs paste with heading styles.
  const handleCopy = async () => {
    const html = getHtml();
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([html], { type: 'text/plain' })
        })
      ]);
      flashCopied('Copied as rich text');
    } catch {
      await navigator.clipboard.writeText(html);
      flashCopied('Copied as text');
    }
  };

  return (
    <div className="ExportToolbar">
      <label className="ExportToolbar__option">
        <input
          checked={onlyTranslated}
          onChange={(e) => onOnlyTranslatedChange(e.target.checked)}
          type="checkbox"
        />
        Only translated
      </label>

      <label className="ExportToolbar__option">
        <input
          checked={withWbw}
          onChange={(e) => onWithWbwChange(e.target.checked)}
          type="checkbox"
        />
        Word by word
      </label>

      <label className="ExportToolbar__option">
        Verse number
        <select
          value={verseNumberMode}
          onChange={(e) => onVerseNumberModeChange(e.target.value as TVerseNumberMode)}
        >
          <option value="heading">Heading h5</option>
          <option value="verse-suffix">Suffix [N] to verse</option>
          <option value="translation-prefix">Prefix to translation</option>
        </select>
      </label>

      <button type="button" onClick={handleDownload}>
        Download .html
      </button>
      <button type="button" onClick={handleCopy}>
        Copy HTML
      </button>
      {copied && <span className="ExportToolbar__copied">{copied}</span>}
    </div>
  );
}

/**/
export default ExportToolbar;
