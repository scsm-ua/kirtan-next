import classNames from 'classnames';

import './SongbookList.scss';
import BookThumbnail from '@/components/common/BookThumnail/BookThumbnail';
import type { TBookDescription } from '@/types/book';

/**/
type Props = {
  bookId: string;
  bookDescriptions: Array<TBookDescription>;
  slug: string;
};

/**
 *
 */
function SongbookList({ bookId, bookDescriptions, slug }: Props) {
  return (
    <ul className="SongbookList">
      {bookDescriptions.map((description: TBookDescription) => {
        const href = `/${description.slug}/${slug}`;

        const cls = (classNames as any)(
          'SongbookList__title',
          description.slug === bookId && 'SongbookList__title--active'
        );

        return (
          <li className="SongbookList__item" key={description.slug}>
            <a href={href}>
              <div className="SongbookList__container">
                <BookThumbnail bookId={description.slug} />

                <div className="SongbookList__info">
                  <h5 className={cls}>{description.title}</h5>

                  <div className="ellipsis SongbookList__subtitle">
                    {description.subtitle}
                  </div>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/**/
export default SongbookList;
