import './SongHeader.scss';
import { PATH } from '@/other/constants';
import { processWBW } from '@/other/utils';
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
  const { author, meta, subTitle, title, word_by_word } = song;

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
      {/*{getWBW(["**avatāra** — encarnación; **sāra** — la mejor; **gorā** — Gaurāṅga; **avatāra** — encarnación; **keno** — ¿por qué?; **nā** — no; **bhajili** — adorado; **tā̐re** — a él; **kori** — hacer; **nīre** — en el agua; **bāsa** — obligado; **gelo** — ir; **nā** — no; **piyāsa** — beber; **āpana** — propia; **karama** — acitividad fruitiva; **phere** — deambular."])}*/}

      {(subTitle || []).map((item) => (
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

  const items = processWBW(wbw, 'SongHeader').map((item: string) => (
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
