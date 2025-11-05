'use client';
import './BookThumbnail.scss';
import { PATH } from '@/other/constants';
import type { TBookDescription } from '@/types/book';

/**/
type Props = {
  bookDescription: TBookDescription;
};

/**
 *
 */
function BookThumbnail({ bookDescription }: Props) {
  const { slug, subtitle, title } = bookDescription;
  const src = PATH.IMG.THUMBNAIL + 'thumbnail-' + slug + '.jpg';

  const srcSet =
    PATH.IMG.THUMBNAIL +
    'thumbnail-' +
    slug +
    '.jpg 1x,' +
    PATH.IMG.THUMBNAIL +
    'thumbnail-' +
    slug +
    '@2.jpg 2x';

  return (
    <section className="BookThumbnail">
      <div className="BookThumbnail__content">
        <div className="BookThumbnail__box">
          <img
            alt=""
            className="BookThumbnail__image"
            srcSet={srcSet}
            src={src}
          />
        </div>

        <div className="BookThumbnail__info">
          <h3 className="BookThumbnail__title">{title}</h3>
          <div className="BookThumbnail__subtitle ellipsis">{subtitle}</div>
        </div>
      </div>
    </section>
  );
}

/**/
export default BookThumbnail;
