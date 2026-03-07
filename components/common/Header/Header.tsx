'use client';

import './Header.scss';
import FeedbackWidget from '@/components/feedback/FeedbackWidget';
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

          <FeedbackWidget bookId={bookId} />
        </div>
      </div>
    </header>
  );
}

/**/
export default Header;
