import './AudioIndex.scss';
import '@/styles/index-page.scss';

import AudioEntry from '@/components/audio/AudioEntry';
import ContentGroup from '@/components/contents/ContentGroup';
import IndexLink from '@/components/common/IndexLink/IndexLink';
import Pills from '@/components/common/Pills/Pills';
import PlayerDock from '@/components/player/PlayerDock';
import { AUDIO_PAGE, getSongbookPagePath } from '@/other/paths';
import { translate } from '@/other/i18n';

import type { TAudioEntry, TAudioGroup, TAudioSort } from '@/types/audio';
import type { TAudioPage } from '@/other/paths';

/**/
type Props = {
  bookId: string;
  groups: Array<TAudioGroup>;
  page: TAudioPage;
};

/**/
const VARIANTS: Record<TAudioPage, { bySinger: boolean; sort: TAudioSort }> = {
  [AUDIO_PAGE.BY_SINGER_A_Z]: { bySinger: true, sort: 'a-z' },
  [AUDIO_PAGE.BY_SINGER_CONTENTS]: { bySinger: true, sort: 'contents' },
  [AUDIO_PAGE.BY_SONG_A_Z]: { bySinger: false, sort: 'a-z' },
  [AUDIO_PAGE.BY_SONG_CONTENTS]: { bySinger: false, sort: 'contents' }
};

/**/
function getAudioPage(bySinger: boolean, sort: TAudioSort): TAudioPage {
  return (Object.keys(VARIANTS) as Array<TAudioPage>).find(
    (page) => VARIANTS[page].bySinger === bySinger && VARIANTS[page].sort === sort
  );
}

/**
 *
 */
function AudioIndex({ bookId, groups, page }: Props) {
  const { bySinger, sort } = VARIANTS[page];
  const otherSort: TAudioSort = sort === 'a-z' ? 'contents' : 'a-z';
  const pills = !bySinger && sort === 'a-z'
    ? groups.map((group: TAudioGroup) => ({ title: group.name }))
    : null;

  return (
    <>
      <h1 className="AudioIndex__title">
        {translate(bookId, bySinger ? 'AUDIO_PAGE.BY_SINGER' : 'AUDIO_PAGE.BY_SONG')}
      </h1>

      {pills && (
        <div className="AudioIndex__pills">
          <Pills items={pills} />
        </div>
      )}

      <ul className="IndexPage__list">
        <IndexLink
          href={getSongbookPagePath(bookId, getAudioPage(!bySinger, sort))}
          title={translate(bookId, bySinger ? 'AUDIO_PAGE.BY_SONG' : 'AUDIO_PAGE.BY_SINGER')}
        />
        <IndexLink
          href={getSongbookPagePath(bookId, getAudioPage(bySinger, otherSort))}
          title={translate(
            bookId,
            otherSort === 'a-z' ? 'AUDIO_PAGE.SORT_FIRST_LINES' : 'AUDIO_PAGE.SORT_TITLES'
          )}
        />

        {groups.map((group: TAudioGroup, index: number) => (
          <ContentGroup
            bookId={bookId}
            group={group}
            key={index}
            renderItem={(entry: TAudioEntry) => (
              <AudioEntry bookId={bookId} entry={entry} key={entry.item.id} />
            )}
          />
        ))}
      </ul>

      <PlayerDock />
    </>
  );
}

/**/
export default AudioIndex;
