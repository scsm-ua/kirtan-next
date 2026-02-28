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
const resourceMap = fetchSharedResources();

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
	
	try {
		// Order matters.
		installPackage(npmSrc, targetDir, bookSlug, booksMap);
		addSongsCount(booksMap, bookSlug);
		
		transformContents(targetDir, resourceMap);
		createAZ(targetDir);
		createAuthors(targetDir);
		
	} catch (e) {
		console.error(chalk.bgRedBright.bold(bookSlug));
		console.error(chalk.bgRedBright(e));
	}
});

/**/
writeFile(
	path.resolve(__dirname, '..', CONST.FOLDER.SRC_OUTPUT),
	CONST.FILES.SONGBOOKS,
	JSON.stringify(booksMap, null, 2)
);
