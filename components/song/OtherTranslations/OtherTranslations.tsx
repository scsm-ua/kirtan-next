'use client';
import { ReactNode, useState } from 'react';

import './OtherTranslations.scss';
import AppModal from '@/components/common/Modal/AppModal';
import { translate } from '@/other/i18n';

/**/
type Props = {
  bookId: string;
  children: ReactNode;
  disabled: boolean;
};

/**
 *
 */
function OtherTranslations({ bookId, children, disabled }: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button
        className="NoBorderButton OtherTranslations__button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        title={translate(bookId, 'SONG_PAGE.OTHER_TRANSLATIONS')}
      >
        <span className="OtherTranslations__label">{bookId.toUpperCase()}</span>
      </button>

      <AppModal header=" " isOpen={isOpen} onClose={() => setOpen(false)}>
        {children}
      </AppModal>
    </>
  );
}

/**/
export default OtherTranslations;
