import './Footer.scss';
import FooterItem from './FooterItem';
import { PATH } from '@/other/constants';
import { translate } from '@/other/i18n';
import type { TFooterNavItemProps } from './FooterItem';

/**/
type Props = {
  bookId: string;
  pageNumber?: number;
};

/**
 *
 */
function getNavItems(bookId: string, pageNumber?: number): TFooterNavItemProps[] {
  return [
    {
      activeIcon: 'icon-books-bold',
      href: '/' + bookId + PATH.PAGE.BOOK_LIST,
      inactiveIcon: 'icon-books',
      label: translate(bookId, 'FOOTER.BOOKS'),
    },
    {
      activeIcon: 'icon-list-music-bold',
      href: '/' + bookId + PATH.PAGE.CONTENTS,
      inactiveIcon: 'icon-list-music',
      label: translate(bookId, 'FOOTER.CONTENTS'),
    },
    {
      activeIcon: 'icon-arrow-up-a-z-old',
      href: '/' + bookId + PATH.PAGE.A_Z,
      inactiveIcon: 'icon-arrow-up-a-z',
      label: translate(bookId, 'FOOTER.INDEX'),
    },
    {
      activeIcon: 'icon-search-bold',
      href: '/' + bookId + PATH.PAGE.SEARCH + (pageNumber ? `?p=${pageNumber}` : ''),
      inactiveIcon: 'icon-search',
      label: translate(bookId, 'FOOTER.SEARCH'),
    }
  ]
}

/**
 *
 */
function Footer({ bookId, pageNumber }: Props) {
  return (
    <footer className="Footer">
      <div className="Footer__container">
        <div className="Footer__content">
          {getNavItems(bookId, pageNumber).map((item: TFooterNavItemProps) => (
            <FooterItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </footer>
  );
}

/**/
export default Footer;
