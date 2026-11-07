import fs from 'node:fs';
import path from 'path';

import { getBookIdParamList } from '@/lib/books';
import { getContentsByBookId, getIndexesByBookId } from '@/lib/contents';
import { compareFirstLines } from '@/scripts/compareHelpers';
import { PATH } from '@/other/constants';
import { ITEM_TYPE } from '@/types/common';

import type { TAudioEntry, TAudioGroup, TAudioSort } from '@/types/audio';
import type { TContentGroup, TContentItem } from '@/types/common';
import type { TAudio } from '@/types/resources';
import type { TSong } from '@/types/song';

/**/
type TSongAudioMap = Map<string, Array<TAudio>>;

/**
 * Per-build memo of song audio lists keyed by bookId. Disabled in dev so
 * source edits show up without a server restart.
 */
const cache = new Map<string, TSongAudioMap>();

/**
 * Audio lists of every song with audio in the book, keyed by song slug.
 */
function getSongAudioMap(bookId: string): TSongAudioMap {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && cache.has(bookId)) return cache.get(bookId);

  const map: TSongAudioMap = new Map();

  for (const item of getAllItems(getContentsByBookId(bookId))) {
    if (!isAudioSong(item) || map.has(item.id)) continue;

    const p = path.join(
      process.cwd(),
      PATH.DIR.SOURCE_BOOKS,
      bookId,
      PATH.DIR.SONGS,
      item.id + '.json'
    );
    const song = JSON.parse(fs.readFileSync(p, 'utf8')) as TSong;
    const audio = song.resources?.audio;
    if (audio?.length) map.set(item.id, audio);
  }

  if (isProd) cache.set(bookId, map);
  return map;
}

/**/
export function hasBookAudio(bookId: string): boolean {
  return getSongAudioMap(bookId).size > 0;
}

/**/
export function getAudioBookIdParamList(): Array<{ bookId: string }> {
  return getBookIdParamList().filter(({ bookId }) => hasBookAudio(bookId));
}

/**
 * Songs with audio in the existing a-z (first lines) or contents (titles)
 * grouping; each song lists its recordings titled by singer.
 */
export function getAudioBySong(bookId: string, sort: TAudioSort): Array<TAudioGroup> {
  const audioMap = getSongAudioMap(bookId);
  const groups = sort === 'a-z' ? getIndexesByBookId(bookId) : getContentsByBookId(bookId);
  const seen = new Set<string>();

  return groups
    .map((group: TContentGroup) => ({
      name: group.name,
      items: group.items
        .filter((item: TContentItem) => {
          if (!audioMap.has(item.id) || seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        })
        .map((item: TContentItem): TAudioEntry => ({
          item,
          label: item.title,
          tracks: audioMap.get(item.id).map((audio: TAudio) => ({
            url: audio.embed_url,
            title: audio.title
          }))
        }))
    }))
    .filter((group: TAudioGroup) => group.items.length > 0);
}

/**
 * Recordings grouped by singer. Singers keep their first-appearance order
 * with Dev-Goswami Maharajs moved to the front; songs sort by first line
 * (`a-z`) or title (`contents`).
 */
export function getAudioBySinger(bookId: string, sort: TAudioSort): Array<TAudioGroup> {
  const audioMap = getSongAudioMap(bookId);
  const singers = new Map<string, TAudioGroup>();
  const seen = new Set<string>();

  for (const item of getAllItems(getContentsByBookId(bookId))) {
    const audioList = audioMap.get(item.id);
    if (!audioList || seen.has(item.id)) continue;
    seen.add(item.id);

    for (const audio of audioList) {
      const key = audio.personId;
      if (!singers.has(key)) {
        singers.set(key, { name: audio.title, items: [] });
      }
      const items = singers.get(key).items;
      const last = items[items.length - 1];
      // Same singer, several recordings of one song → one entry with many tracks.
      if (last?.item.id === item.id) {
        last.tracks.push({ url: audio.embed_url });
        continue;
      }
      items.push({
        item,
        label: sort === 'a-z' ? item.aliasName : item.title,
        tracks: [{ url: audio.embed_url }]
      });
    }
  }

  const keys = Array.from(singers.keys());
  const isMain = (key: string) => key.includes('Dev-Goswami');

  return [...keys.filter(isMain), ...keys.filter((key) => !isMain(key))].map((key) => {
    const group = singers.get(key);
    group.items.sort((a, b) => compareFirstLines(a.label, b.label));
    return group;
  });
}

/**/
function getAllItems(groups: Array<TContentGroup>): Array<TContentItem> {
  return groups.flatMap((group: TContentGroup) => group.items);
}

/**/
function isAudioSong(item: TContentItem): boolean {
  return item.type === ITEM_TYPE.SONG && item.has?.audio && !item.title.includes('(hidden)');
}
