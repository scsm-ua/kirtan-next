import classNames from 'classnames';

import './SongBookItem.scss';
import BookThumbnail from '@/components/common/BookThumnail/BookThumbnail';

/**/
type Props = {
  bookId: string;
  href: string;
  isActive?: boolean;
  subtitle: string;
  title: string;
};

/**
 *
 */
function SongBookItem({ bookId, href, isActive, subtitle, title }: Props) {
  const cls = (classNames as any)(
    'SongBookItem__title',
    isActive && 'SongBookItem__title--active'
  );

  return (
    <li className="SongBookItem">
      <a href={href}>
        <div className="SongBookItem__container">
          <BookThumbnail bookId={bookId} />

          <div className="SongBookItem__info">
            <h5 className={cls}>{title}</h5>

            <div className="ellipsis SongBookItem__subtitle">
              {subtitle}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}

/**/
export default SongBookItem;
