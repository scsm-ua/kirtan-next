const path = require('path');
const { readdirSync } = require('fs');

const { CONST } = require('./constants');

/**
 * Enriches the book descriptions with the info of included songs.
 * @param booksMap {Object}
 * @param bookSlug {string}
 */
function addSongsCount(booksMap, bookSlug) {
  const targetDir = path.resolve(
    __dirname,
    '..',
    `${CONST.FOLDER.SRC_OUTPUT}/${bookSlug}`,
    CONST.FOLDER.SONGS
  );
	
	booksMap[bookSlug] = {
		...booksMap[bookSlug],
		songsCount: readdirSync(targetDir).length
	};
}

/**/
module.exports = { addSongsCount };
