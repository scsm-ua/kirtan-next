const path = require('path');
const { readdirSync } = require('fs');

const { CONST } = require('./constants');
const dependencies = require('../source/dependencies.json');
const { readFile, writeFile } = require('./ioHelpers');

/**/
const authorsSet = new Set();
const songsMap = new Map(); // Key -- song slug; value -- map of the embedded audios.

/**
 * One time script. Will be removed soon.
 */
function collectEmbedded() {
	Object.entries(dependencies).forEach(([bookSlug]) => {
		const targetDir = path.resolve(
			__dirname,
			'..',
			`${CONST.FOLDER.SRC_OUTPUT}/${bookSlug}`,
			CONST.FOLDER.SONGS
		);
		
		readdirSync(targetDir).forEach((filename) => {
			const content = readFile(targetDir, filename);
			const songId = filename.split('.')[0];
			
			if (!songsMap.has(songId)) {
				songsMap.set(songId, new Map());
			}
			
			handleSong(content.embeds, songId);
		});
	});
	
	const authorsMap = Array.from(authorsSet)
		.map((author) => ({
			id: author,
			i18n: {
				en: author,
				ru: author
			}
		}));
	
	const embedsMap = Array.from(songsMap)
		.map(([songSlug, infoMap]) => {
			const audio = Array.from(infoMap.values());
			
			 return [songSlug, {
				 ...(audio.length > 0 && { audio })
			 }]
		});
	
	// writeFile(
	// 	__dirname,
	// 	'authors.json',
	// 	JSON.stringify(authorsMap, null, 2)
	// );
	
	writeFile(
		__dirname,
		'embeds.json',
		JSON.stringify(Object.fromEntries(embedsMap), null, 2)
	);
}

/**
 *
 */
function handleSong(embeds, songId) {
	if (!embeds || embeds?.length === 0) return;
	
	const infoMap = songsMap.get(songId);
	
	embeds.forEach((item) => {
		authorsSet.add(item.title);
		
		infoMap.set(item.embed_url, {
			title: item.title,
			embed_url: item.embed_url,
			iframe_url: item.iframe_url
		});
	});
}

/**/
collectEmbedded();
