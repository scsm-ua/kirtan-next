'use client';

import './AudioList.scss';
import PlayerDock from '@/components/player/PlayerDock';
import PlayerWidget from '@/components/player/PlayerWidget';
import type { TAudio } from '@/types/resources';

/**/
type Props = {
  audio: Array<TAudio>;
  caption: string;
  songTitle?: string;
};

function AudioList({ audio, caption, songTitle }: Props) {
  return (
    <section className="AudioList">
      {caption && <h2 className="AudioList__caption">{caption}</h2>}

      <ul className="AudioList__list">
        {audio.map((item: TAudio) => (
          <li key={item.embed_url}>
            <PlayerWidget source={{ url: item.embed_url }} subtitle={songTitle} title={item.title} />
          </li>
        ))}
      </ul>

      <PlayerDock />
    </section>
  );
}

/**/
export default AudioList;
