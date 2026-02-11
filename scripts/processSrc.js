const chalk = require('chalk');
const path = require('path');

/**/
const { addSongsCount } = require('./addSongsCount');
const { CONST } = require('./constants');
const { createAuthors } = require('./createAuthors');
const { createAZ } = require('./createAZ');
const dependencies = require('../source/dependencies.json');
const { fetchSharedResources } = require('./fetchSharedResources');
const { installPackage } = require('./installPackage');
const { transformContents } = require('./transformContents');
const { writeFile } = require('./ioHelpers');

/**/
const booksMap = {};

/**
 *
 */
Object.entries(dependencies).forEach(([bookSlug, npmSrc]) => {
	console.log(
		chalk.bgBlueBright('~~~~~~~~~~~~~~~ Processing '),
		chalk.bgYellow.underline.bold(bookSlug),
		chalk.bgBlueBright(' ~~~~~~~~~~~~~~~~~~~~~~~~~~')
	);
	
	const targetDir = path.resolve(__dirname, '..', `${CONST.FOLDER.SRC_OUTPUT}/${bookSlug}`);
	
	// Order matters.
	installPackage(npmSrc, targetDir, bookSlug, booksMap);
	addSongsCount(booksMap, bookSlug);
	
	const resourceMap = fetchSharedResources();
	transformContents(targetDir, resourceMap);
	createAZ(targetDir);
	createAuthors(targetDir);
});

/**/
writeFile(
	path.resolve(__dirname, '..', CONST.FOLDER.SRC_OUTPUT),
	CONST.FILES.SONGBOOKS,
	JSON.stringify(booksMap, null, 2)
);
