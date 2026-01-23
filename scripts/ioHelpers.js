// const chalk = require('chalk');
const fs = require('node:fs');
const path = require('node:path');

/**
 * @param dir {string}
 * @param filename {string}
 * @returns {*}
 */
function readFile(dir, filename) {
  try {
    const raw = fs.readFileSync(path.resolve(dir, filename), 'utf8');
    return JSON.parse(raw);

  } catch (err) {
    console.error(`Error reading file "${filename}" in ${dir}`);
  }
}

/**
 * @param dir {string}
 * @param fileName {string}
 * @param content {string}
 * @returns {*|undefined}
 */
function writeFile(dir, fileName, content) {
	try {
		return fs.writeFileSync(path.join(dir, fileName), content);
	} catch (e) {
		console.error(e);
	}
}

//
// /**
//  *
//  */
// function logErr(message) {
//   console.error(chalk.yellowBright.bgRedBright.bold(message));
// }
//
// /**
//  *
//  */
// function logWarn(message) {
//   console.warn(chalk.black.bgYellow.bold(message));
// }



/**/
module.exports = {
  // logErr,
  // logWarn,
  readFile,
	writeFile
};
