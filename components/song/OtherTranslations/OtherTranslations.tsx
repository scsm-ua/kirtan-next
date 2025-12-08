'use client';
import { ReactNode, useState } from 'react';
import { Modal } from 'react-responsive-modal';

import './OtherTranslations.scss';
import { MODAL_CLASS_NAMES } from '@/other/constants';
import { translate } from '@/other/i18n';

/**/
type Props = {
  bookId: string;
  children: ReactNode;
};

/**
 *
 */
function OtherTranslations({ bookId, children }: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button
        className="NoBorderButton OtherTranslations__button"
        onClick={() => setOpen(true)}
        title={translate(bookId, 'SONG_PAGE.OTHER_TRANSLATIONS')}
      >
        <span className="OtherTranslations__label">{bookId.toUpperCase()}</span>
      </button>

      <Modal
        center
        classNames={MODAL_CLASS_NAMES}
        onClose={() => setOpen(false)}
        open={isOpen}
      >
        <div className="OtherTranslations__content">{children}</div>
      </Modal>
    </>
  );
}

/**/
export default OtherTranslations;
