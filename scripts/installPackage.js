const path = require('path');
const { execSync } = require('child_process');
const { mkdirSync } = require('fs');

const { CONST } = require('./constants');

/**
 * The installer function: installation, build and build copying.
 * @param npmSrc {string}
 * @param targetDir {string}
 * @param bookSlug {string}
 * @param booksMap {Object}
 */
function installPackage(npmSrc, targetDir, bookSlug, booksMap) {
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
	booksMap[bookSlug] = require(path.resolve(absPathToPackage, CONST.FILES.BOOK_INFO));
}

/**
 * @param absPath {string}
 * @return {string}
 */
function extractPackageName(absPath) {
	const parts = absPath.split('/');
	return parts[parts.length - 1];
}

/**/
module.exports = { installPackage };
