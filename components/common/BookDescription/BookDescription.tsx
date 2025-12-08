'use client';
import './BookDescription.scss';
import BookThumbnail from '@/components/common/BookThumnail/BookThumbnail';
import type { TBookDescription } from '@/types/book';

/**/
type Props = {
  bookDescription: TBookDescription;
};

/**
 *
 */
function BookDescription({ bookDescription }: Props) {
  const { slug, subtitle, title } = bookDescription;

  return (
    <section className="BookDescription">
      <div className="BookDescription__content">
        <BookThumbnail bookId={slug} />

        <div className="BookDescription__info">
          <h3 className="BookDescription__title">{title}</h3>
          <div className="BookDescription__subtitle ellipsis">{subtitle}</div>
        </div>
      </div>
    </section>
  );
}

/**/
export default BookDescription;
