const chalk = require('chalk');
const { execSync } = require('child_process');
const { mkdirSync } = require('fs');
const path = require('path');

/**/
const { CONST } = require('./constants');
const { createAuthors } = require('./createAuthors');
const { createAZ } = require('./createAZ');
const dependencies = require('../source/dependencies.json');
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

	handleDependency(bookSlug, npmSrc, targetDir);
	// Order matters.
	transformContents(targetDir);
	createAZ(targetDir);
	createAuthors(targetDir);
	
	writeFile(
		path.resolve(__dirname, '..', CONST.FOLDER.SRC_OUTPUT),
		CONST.FILES.SONGBOOKS,
		JSON.stringify(booksMap, null, 2)
	);
});

/**
 * The installer function: installation, build and build copying.
 */
function handleDependency(bookSlug, npmSrc, targetDir) {
	// Silent installation of the book package.
  execSync(`npm i --no-save ${npmSrc}`);

  const absPathToPackage = execSync(`npm ls ${npmSrc} --parseable --depth=0`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  }).trim();

	// Building the book source into jsons.
  const packageName = extractPackageName(absPathToPackage);
  execSync(`npm --prefix node_modules/${packageName} run build`);

	// Copying the jsons to the project.
	mkdirSync(targetDir, { recursive: true });
	execSync(`cp -a ${path.resolve(absPathToPackage, CONST.FOLDER.SRC_INPUT)}/. ${targetDir}`)
	
	// Inserting the book info into the variable.
	const info = require(path.resolve(absPathToPackage, CONST.FILES.BOOK_INFO));
	booksMap[bookSlug] = info;
}

/* Helpers */

/**/
function extractPackageName(absPath) {
  const parts = absPath.split('/');
  return parts[parts.length - 1];
}
