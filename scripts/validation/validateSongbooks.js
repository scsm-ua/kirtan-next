const Ajv = require('ajv');
const chalk = require('chalk');
const { SONGBOOKS_VALIDATION_SCHEMA } = require('./validationSchema');

/**
 * @param slugs {Array<string>}
 * @param songbooks {Object}
 */
function validateSongbooks(slugs, songbooks) {
	validateSlugs(slugs, songbooks);
	
	const ajv = new Ajv();
	const validate = ajv.compile(SONGBOOKS_VALIDATION_SCHEMA);
	
	Object.entries(songbooks).forEach(([slug, obj]) => {
		const valid = validate(obj);
		
		if (!valid) {
			console.error(chalk.bgRedBright.bold(`Validation error: Missing property in "${slug}"!`));
			console.error(validate.errors);
			console.error(chalk.bgRedBright('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'));
			process.exit(1);
		}
	});
}

/**
 * @param slugs {Array<string>}
 * @param songbooks {Object}
 */
function validateSlugs(slugs, songbooks) {
	const ajv = new Ajv();
	const props = {};
	const required = [];
	
	slugs.forEach((slug) => {
		props[slug] = { type: 'object' };
		required.push(slug);
	});
	
	const validate = ajv.compile({
		type: 'object',
		properties: props,
		required: required,
		additionalProperties: false
	});
	
	const valid = validate(songbooks);
	
	if (!valid) {
		console.error(chalk.bgRedBright.bold('Validation error: Missing or extra slug in the songbooks.json!'));
		console.error(validate.errors);
		console.error(chalk.bgRedBright('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'));
		process.exit(1);
	}
}

/**/
module.exports = { validateSongbooks };
