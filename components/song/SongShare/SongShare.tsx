'use client';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';

import './SongShare.scss';
import { MODAL_CLASS_NAMES } from '@/other/constants';
import SongShareForm from '@/components/song/SongShare/SongShareForm';
import { translate } from '@/other/i18n';

/**/
type Props = {
  bookId: string;
};

/**
 *
 */
function SongShare({ bookId }: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button
        className="NoBorderButton SongShare__button"
        onClick={() => setOpen(true)}
        title={translate(bookId, 'SONG_PAGE.SHARE_SONG')}
      >
        <span className="icon-arrow-up-from-bracket" />
      </button>

      <Modal
        center
        classNames={MODAL_CLASS_NAMES}
        onClose={() => setOpen(false)}
        open={isOpen}
      >
        <div className="AppModal__content">
          <SongShareForm bookId={bookId} onClose={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  );
}

/**/
export default SongShare;
