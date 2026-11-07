import './AudioEntry.scss';
import PlayerWidget from '@/components/player/PlayerWidget';
import { getSongPathWithPage } from '@/other/paths';

import type { TAudioEntry, TAudioTrack } from '@/types/audio';

/**/
type Props = {
  bookId: string;
  entry: TAudioEntry;
};

/**
 *
 */
function AudioEntry({ bookId, entry }: Props) {
  const { item, label, tracks } = entry;
  const page = Array.isArray(item.page) ? item.page.join(', ') : item.page;

  return (
    <li className="AudioEntry">
      <a href={getSongPathWithPage(bookId, item)} className="AudioEntry__link">
        <h6 className="AudioEntry__title">{label}</h6>
        {page && (
          <span className="AudioEntry__page" title="Page in paper songbook">{page}</span>
        )}
        <span className="AudioEntry__icon icon-chevron-right" />
      </a>

      <ul className="AudioEntry__tracks">
        {tracks.map((track: TAudioTrack) => (
          <li key={track.url}>
            <PlayerWidget source={{ url: track.url }} title={track.title} />
          </li>
        ))}
      </ul>
    </li>
  );
}

/**/
export default AudioEntry;
