const chalk = require('chalk');
const { execSync } = require('child_process');
const path = require('path');
const request = require('sync-request');

const { CONST } = require('./constants');
const { readFile, writeFile } = require('./ioHelpers');

/**/
const SHARED_RESOURCES_REPO =
  'git+https://github.com/scsm-ua/songbook-resources.git';

/**
 * @typedef {{ [personId: string]: I18n }} PersonsMap
 */

/**
 * @return {ResourceMap}
 */
function fetchSharedResources() {
  execSync(`npm i --no-save ${SHARED_RESOURCES_REPO}`);

  const absPathToPackage = execSync(
    `npm ls ${SHARED_RESOURCES_REPO} --parseable --depth=0`,
    {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    }
  ).trim();

  /** @type {ResourceMap} */
  const result = {};

  /** @type {Array<Person>} */
  const persons = readFile(absPathToPackage, CONST.FILES.PERSONS);

  /** @type {{ [songSlug: string]: ResourceRaw }} */
  const resources = readFile(absPathToPackage, CONST.FILES.RESOURCES);

  /** @type {PersonsMap} */
  const personsMap = {};
  persons.forEach(({ id, i18n }) => (personsMap[id] = i18n));

  Object.entries(resources).forEach(
    ([songSlug, res /** @type {ResourceRaw} */]) => {
      const audio = handleAudio(res.audio, personsMap);
      result[songSlug] = audio ? { audio } : {};
    }
  );

  writeFile(
    path.resolve(__dirname, '..', CONST.FOLDER.SRC_OUTPUT),
    CONST.FILES.RESOURCES,
    JSON.stringify(result, null, 2)
  );

  return result;
}

/**
 *
 * @param audioArr {Array<AudioRaw> | void}
 * @param personsMap {PersonsMap}
 * @return {Array<AudioObj> | void}
 */
function handleAudio(audioArr, personsMap) {
  if (!audioArr) return;
	
	audioArr.forEach(checkExists);

  return audioArr
    .sort((a) => (a.title.includes('Dev-Goswami') ? -1 : 1))
    .map((a) => ({
      ...a,
      title: personsMap[a.title]
    }));
}

/**
 * @param audio {AudioRaw}
 */
function checkExists(audio) {
  const base = 'https://soundcloud.com/oembed?format=json&url=';
	const url = base + encodeURIComponent(audio.embed_url);
	const data = request('HEAD', url);

	if (data.statusCode !== 200) {
		const msg = `Missing resource at "${audio.embed_url}"!`;
		console.error(chalk.bgRedBright.bold(data.statusCode, msg));
		throw new Error(msg);
	}
}

/**/
module.exports = { fetchSharedResources };
