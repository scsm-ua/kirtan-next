'use client';
import { useEffect, useRef, useState } from 'react';

import ExportToolbar from '@/components/export/ExportToolbar';
import { filterExportBody, wrapExportDoc } from '@/other/exportDoc';
import type { TVerseNumberMode } from '@/other/exportDoc';
import './ExportToolbar.scss';

/**/
type Props = {
  body: string;
  fileName: string;
  lang: string;
  title: string;
};

/**
 * Owns the export options and keeps the preview in sync with the document
 * that gets downloaded / copied.
 */
function ExportView({ body, fileName, lang, title }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [onlyTranslated, setOnlyTranslated] = useState<boolean>(true);
  const [withWbw, setWithWbw] = useState<boolean>(true);
  const [verseNumberMode, setVerseNumberMode] = useState<TVerseNumberMode>('heading');

  const getBody = () => filterExportBody(body, { onlyTranslated, verseNumberMode, withWbw });

  useEffect(() => {
    if (previewRef.current) previewRef.current.innerHTML = getBody();
  }, [body, onlyTranslated, verseNumberMode, withWbw]);

  return (
    <>
      <ExportToolbar
        fileName={fileName}
        getHtml={() => wrapExportDoc(getBody(), title, lang)}
        onlyTranslated={onlyTranslated}
        onOnlyTranslatedChange={setOnlyTranslated}
        onWithWbwChange={setWithWbw}
        onVerseNumberModeChange={setVerseNumberMode}
        verseNumberMode={verseNumberMode}
        withWbw={withWbw}
      />

      <div
        className="ExportPage"
        ref={previewRef}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </>
  );
}

/**/
export default ExportView;
