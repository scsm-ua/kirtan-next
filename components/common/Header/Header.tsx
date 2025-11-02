'use client';
import { useContext } from 'react';

import './Header.scss';
import { BookContext } from '@/other/bookContext';
import { PATH } from '@/other/constants';

/**
 *
 */
function Header() {
  const { bookId } = useContext(BookContext);
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
        </div>
      </div>
    </header>
  );
}

/**/
export default Header;
