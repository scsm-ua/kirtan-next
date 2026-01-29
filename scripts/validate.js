const path = require('path');

const { CONST } = require('./constants');
const { readFile } = require('./ioHelpers');
const { validateSongbooks } = require('./validation/validateSongbooks');
const { validateTranslations } = require('./validation/validateTranslations');

/**
 *
 */
function validate() {
	const dependencies = readFile(
		path.resolve(__dirname, '..', CONST.FOLDER.SRC_ROOT),
		CONST.FILES.DEPENDENCIES
	);
	
	const songbooks = readFile(
		path.resolve(__dirname, '..', CONST.FOLDER.SRC_OUTPUT),
		CONST.FILES.SONGBOOKS
	);
	
	const translations = readFile(
		path.resolve(__dirname, '..', CONST.FOLDER.SRC_ROOT),
		CONST.FILES.TRANSLATIONS
	);
	
	const slugs = Object.keys(dependencies);
	validateSongbooks(slugs, songbooks);
	validateTranslations(slugs, translations);
}

/**/
validate();
