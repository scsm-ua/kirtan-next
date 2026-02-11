const { CONST } = require('./constants');
const { readFile, writeFile } = require('./ioHelpers');

/**
 * Used to detect song duplicates for handling their page number.
 * @type {string[]}
 */
const songIds = [];

/**
 * @param targetDir {string} - directory of the songbook.
 * @param resourceMap {ResourceMap}
 */
function transformContents(targetDir, resourceMap) {
  const input = transform(
    readFile(targetDir, CONST.FILES.CONTENTS),
    resourceMap,
    targetDir
  );

  const output = JSON.stringify(input, null, 2);
  writeFile(targetDir, CONST.FILES.CONTENTS, output);
}

/**
 * @param groups {Array<RawContentGroup>}
 * @param resourceMap {ResourceMap}
 * @param targetDir {string} - directory of the songbook.
 * @return {Array<ContentGroup>}
 */
function transform(groups, resourceMap, targetDir) {
  return groups.map((group) => {
    return {
      name: group.name,
      items: group.items.map((item) => {
				/** @type {RawSong} */
				const rawSong = readFile(`${targetDir}/songs`, `${item.id}.json`);
				const resources = resourceMap[item.id];
	
				/** @type {Song} */
				const song = { ...rawSong, resources };
	
				writeFile(
					`${targetDir}/songs`,
					`${item.id}.json`,
					JSON.stringify(song, null, 2)
				);
				
				return mapItem(item, song);
			})
    };
  });
}

/**
 * @param meta {RawSongMeta}
 * @param id {string}
 * @return {number}
 */
function getPage(meta, id) {
  if (!meta) return null;

  if (Array.isArray(meta.page)) {
    if (songIds.includes(id)) return meta.page[1];

    songIds.push(id);
    return meta.page[0];
  }

  return meta.page;
}

/**
 * @param meta {RawSongMeta}
 * @return {Array<number>}
 */
function getPages(meta) {
  if (!meta || !meta.page) return [];

  return Array.isArray(meta.page) ? meta.page : [meta.page];
}

/**
 * @param item {RawContentItem}
 * @param song {Song}
 * @return {ContentItem}
 */
function mapItem(item, song) {
  return {
    aliasName: song.meta.first_line,
    author: song.meta?.author || (song.author && song.author[0]) || null,
    id: item.id,
    page: getPage(song.meta, item.id),
    pages: getPages(song.meta),
    title: item.title,
    has: {
      audio: song.resources.audio?.length > 0,
      translation:
        !('translation' in song.meta) || song.meta.translation !== 'no'
    }
  };
}

/**/
module.exports = { transformContents };
