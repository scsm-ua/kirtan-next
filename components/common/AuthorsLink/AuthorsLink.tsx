import './AuthorsLink.scss';
import { PATH } from '@/other/constants';
import { translate } from '@/other/i18n';

/**/
type Props = { bookId: string };

/**
 *
 */
function AuthorsLink({ bookId }: Props) {
  let href = '/' + bookId + PATH.PAGE.AUTHORS;

  return (
    <li className="AuthorsLink">
      <header className="AuthorsLink__header" />

      <div className="AuthorsLink__content">
        <a href={href} className="AuthorsLink__link">
          <h6 className="AuthorsLink__title">
            {translate(bookId, 'AUTHORS_PAGE.LINK_FULL_TITLE')}
          </h6>

          <div className="AuthorsLink__suffix">
            <span className="AuthorsLink__icon icon-chevron-right" />
          </div>
        </a>
      </div>
    </li>
  );
}

/**/
export default AuthorsLink;
