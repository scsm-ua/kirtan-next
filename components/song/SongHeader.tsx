import './SongHeader.scss';
import { PATH } from '@/other/constants';
import { processTranslationLines } from '@/other/utils';
import type { TSong } from '@/types/song';

/**/
type Props = {
  bookId: string;
  song: TSong;
};

/**
 *
 */
function SongHeader({ bookId, song }: Props) {
  const { author, meta, subtitle, title, word_by_word } = song;

  return (
    <section className="SongHeader">
      {title?.length > 0 && (
        <h1 className="SongHeader__title">
          {title.map((item: string) => (
            <div key={item}>{item}</div>
          ))}
        </h1>
      )}

      {getWBW(word_by_word)}

      {(subtitle || []).map((item) => (
        <div className="SongHeader__subtitle" key={item}>
          {item}
        </div>
      ))}

      {author?.map((item) => {
        const href =
          `/${bookId}` +
          PATH.PAGE.AUTHORS +
          (meta.author ? `#section-${meta.author}` : '');

        return (
          <div className="SongHeader__author" key={item}>
            <a href={href}>{item}</a>
          </div>
        );
      })}
    </section>
  );
}

/**
 *
 */
function getWBW(wbw?: string[]) {
  if (!wbw || wbw.length === 0) return null;

  const items = processTranslationLines(wbw, 'SongHeader').map((item: string) => (
    <div
      className="SongHeader__wbw"
      dangerouslySetInnerHTML={{ __html: item }}
      key={item}
    />
  ));

  return <>{items}</>;
}

/**/
export default SongHeader;
