'use client';
import { lazy } from 'react';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';

import './FeedbackWidget.scss';
import { MODAL_CLASS_NAMES } from '@/other/constants';
import { translate } from '@/other/i18n';

/**/
type Props = {
  bookId: string;
};

const Form = lazy(() => import('./FeedbackForm'));

/**
 *
 */
function FeedbackWidget({ bookId }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!isOpen);

  return (
    <div className="FeedbackWidget">
      <button
        className="RoundButton RoundButton--dark FeedbackWidget__button"
        onClick={handleOpen}
        // title={translate(bookId, 'SEARCH_PAGE.FIND')}
      >
        {/*<span className="icon-search" />*/}
        Feedback
      </button>

      <Modal
        center
        classNames={MODAL_CLASS_NAMES}
        onClose={handleOpen}
        open={isOpen}
      >
        <div className="AppModal__content">
          <Form bookId={bookId} />
        </div>
      </Modal>
    </div>
  );
}

/**/
export default FeedbackWidget;
