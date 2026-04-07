const path = require('path');
const { readdirSync, readFileSync } = require('fs');

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

  // Get all files in the target directory.
  const files = readdirSync(targetDir);

  // Count only files that do NOT contain '"translation": "no"'.
  const filesWithTranslation = files.filter((file) => {
    const filePath = path.join(targetDir, file);
    try {
      const content = readFileSync(filePath, 'utf8');
      return !content.includes('"translation": "no"');
    } catch (err) {
      // If file can't be read, exclude it from count.
      return false;
    }
  });

  booksMap[bookSlug] = {
    ...booksMap[bookSlug],
    songsCount: filesWithTranslation.length
  };
}

/**/
module.exports = { addSongsCount };
