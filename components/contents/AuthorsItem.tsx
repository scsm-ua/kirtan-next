import './ContentGroup.scss';
import { PATH } from '@/other/constants';
import { translate } from '@/other/i18n';

/**/
type Props = { bookId: string };

/**
 *
 */
function AuthorsItem({ bookId }: Props) {
  let href = '/' + bookId + PATH.PAGE.AUTHORS;

  return (
    <li className="ContentGroup">
      <header className="ContentGroup__header ContentGroup__header--empty">
        <h6 className="ContentGroup__title">&nbsp;</h6>
      </header>

      <ul className="ContentGroup__list">
        <li className="ContentItem">
          <a href={href} className="ContentItem__link">
            <h6 className="ContentItem__menu">
              {translate(bookId, 'AUTHORS_PAGE.LINK_FULL_TITLE')}
            </h6>

            <div className="ContentItem__suffix">
              <div className="ContentItem__icon icon-chevron-right" />
            </div>
          </a>
        </li>
      </ul>
    </li>
  );
}

/**/
export default AuthorsItem;
