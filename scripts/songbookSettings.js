const songbooks = require('../source/songbooks.json');

/**
 * Per-book settings from source/songbooks.json. Each value is either a git
 * repo URL string (legacy shorthand) or a settings object.
 * @typedef {Object} SongbookSettings
 * @property {string} repository - git repo URL of the songbook package.
 * @property {Object} [audio]
 * @property {Object} [audio.filter]
 * @property {Array<string>} [audio.filter.by_title] - person ids; only audio
 *   tracks with these raw titles are kept for the book.
 */

/**
 * @param bookSlug {string}
 * @return {SongbookSettings}
 */
function getSongbookSettings(bookSlug) {
	const entry = songbooks[bookSlug];
	return typeof entry === 'string' ? { repository: entry } : entry;
}

/**
 * @return {{ [bookSlug: string]: string }} - slug → git repo URL map.
 */
function getSongbookRepositories() {
	const repos = {};

	Object.keys(songbooks).forEach((bookSlug) => {
		repos[bookSlug] = getSongbookSettings(bookSlug).repository;
	});

	return repos;
}

/**
 * @param bookSlug {string}
 * @return {Array<string> | null}
 */
function getAudioTitleFilter(bookSlug) {
	return getSongbookSettings(bookSlug).audio?.filter?.by_title || null;
}

/**/
module.exports = {
	getAudioTitleFilter,
	getSongbookRepositories,
	getSongbookSettings
};
