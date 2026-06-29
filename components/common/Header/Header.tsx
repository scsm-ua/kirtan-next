'use client';

import './Header.scss';
import FeedbackWidget from '@/components/feedback/FeedbackWidget';
import HotkeyHint from '@/components/common/GlobalHotkeys/HotkeyHint';
import { PATH } from '@/other/constants';

/**
 *
 */
function Header({ bookId }: { bookId: string }) {
  const href = '/' + bookId;

  return (
    <header className="Header">
      <div className="Header__container">
        <div className="Header__content">
          <a href={href} className="Header__home">
            <img
              alt="Home"
              className="Header__logo"
              src={PATH.IMG.LOGO}
            />
          </a>

          <div className="Header__actions">
            <HotkeyHint />
            <FeedbackWidget bookId={bookId} />
          </div>
        </div>
      </div>
    </header>
  );
}

/**/
export default Header;
