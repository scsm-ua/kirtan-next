const { CONST } = require('./constants');
const { readFile, writeFile } = require('./ioHelpers');

/**
 * Used to detect song duplicates for handling their page number.
 * @type {string[]}
 */
const songIds = [];

/**
 * @param targetDir {string} - directory of the songbook.
 */
function transformContents(targetDir) {
	const input = transform(readFile(targetDir, CONST.FILES.CONTENTS), targetDir);
	const output = JSON.stringify(input, null, 2);
	writeFile(targetDir, CONST.FILES.CONTENTS, output);
}

/**
 * @param groups {Array<RawContentGroup>}
 * @param targetDir {string} - directory of the songbook.
 * @return {Array<ContentGroup>}
 */
function transform(groups, targetDir) {
	return groups.map((group) => ({
		name: group.name,
		items: group.items.map(mapItem, targetDir)
	}));
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
		return meta.page[0]
	}
	
	return meta.page;
}

/**
 * @param meta {RawSongMeta}
 * @return {Array<number>}
 */
function getPages(meta) {
	if (!meta || !meta.page) return [];
	
	return Array.isArray(meta.page)
		? meta.page
		: [meta.page];
}

/**
 * @param item {RawContentItem}
 * @return {ContentItem}
 */
function mapItem(item) {
	/** @type {RawSong} */
	const song = readFile(`${this}/songs`, `${item.id}.json`);
	// console.log(songInfo);
	// return item;
	
	return {
		aliasName: song.meta.first_line,
		author: song.meta?.author || (song.author && song.author[0]) || null,
		id: item.id,
		page: getPage(song.meta, item.id),
		pages: getPages(song.meta),
		title: item.title,
		has: {
			audio: song.embeds?.length > 0
		}
	};
}

/**/
module.exports = { transformContents };
