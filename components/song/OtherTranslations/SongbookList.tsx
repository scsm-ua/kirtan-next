import './SongbookList.scss';
import SongBookItem from '@/components/song/OtherTranslations/SongBookItem';
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

        return (
          <SongBookItem
            bookId={description.slug}
            href={href}
            isActive={description.slug === bookId}
            key={description.slug}
            subtitle={description.subtitle}
            title={description.title}
          />
        );
      })}
    </ul>
  );
}

/**/
export default SongbookList;
