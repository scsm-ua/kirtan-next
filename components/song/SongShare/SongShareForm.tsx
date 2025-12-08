'use client';
import { type SyntheticEvent, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

import { translate } from '@/other/i18n';

/**/
type Props = {
  bookId: string;
  onClose: () => void;
};

/**/
function selectHref(e: SyntheticEvent) {
  (e.target as HTMLInputElement).select();
}

/**
 *
 */
function SongShareForm({ bookId, onClose }: Props) {
  const [href, setHref] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(href).catch(console.error);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  if (!href) return null;

  return (
    <div className="SongShare">
      <header className="SongShare__header">
        <h4 className="SongShare__title">
          {translate(bookId, 'SONG_PAGE.SHARE')}
        </h4>
      </header>

      <div className="SongShare__qr">
        <QRCode size={240} value={href} />
      </div>

      <div className="SongShare__copy">
        <label htmlFor="" className="SongShare__label">
          {translate(bookId, 'SONG_PAGE.COPY_LINK')}
        </label>

        <div className="SongShare__form">
          <input
            className="SongShare__input"
            onClick={selectHref}
            readOnly
            type="text"
            value={href}
          />

          <button
            className="AppButton RoundButton RoundButton--L RoundButton--dark SongShare__share"
            onClick={handleCopy}
            title={translate(bookId, 'SONG_PAGE.COPY')}
          >
            <span className="icon-copy" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**/
export default SongShareForm;
