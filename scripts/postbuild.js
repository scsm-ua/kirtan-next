const fs = require('node:fs');
const path = require('node:path');
const {CONST} = require('./constants');

fs.writeFile(
	path.resolve(__dirname, '..', CONST.FOLDER.BUILD, '.nojekyll'),
	'',
	console.error
);
