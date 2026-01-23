const Ajv = require('ajv');
const chalk = require('chalk');
const path = require('path');

const { CONST } = require('./constants');
const { readFile } = require('./ioHelpers');
const { TRANSLATION_VALIDATION_SCHEMA } = require('./validationSchema');

/**
 *
 */
function validateTranslations() {
	const dependencies = readFile(
		path.resolve(__dirname, '..', CONST.FOLDER.SRC_ROOT),
		CONST.FILES.DEPENDENCIES
	);
	
	const translations = readFile(
		path.resolve(__dirname, '..', CONST.FOLDER.SRC_ROOT),
		CONST.FILES.TRANSLATIONS
	);
	
	const slugs = Object.keys(dependencies);
	validateBookSlugs(translations, slugs);
	
	const ajv = new Ajv();
	const validate = ajv.compile(TRANSLATION_VALIDATION_SCHEMA);
	
	Object.entries(translations).forEach(([lang, obj]) => {
		const valid = validate(obj);
		
		if (!valid) {
			console.error(chalk.bgRedBright.bold(`Validation error: Missing or extra translation key in "${lang}"!`));
			console.error(validate.errors);
			console.error(chalk.bgRedBright('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'));
			process.exit(1);
		}
	});
}

/**
 * Check that translation for each book is available.
 */
function validateBookSlugs(translations, slugs) {
	const ajv = new Ajv();
	const langSet = new Set();
	
	const props = {};
	const required = [];
	
	slugs.forEach((slug) => langSet.add(slug.slice(0, 2)));
	
	Array.from(langSet).forEach((lang) => {
		props[lang] = { type: 'object' };
		required.push(lang);
	});
	
	const languageKeysSchema = {
		type: 'object',
		properties: props,
		required: required,
		additionalProperties: false
	};
	
	const validate = ajv.compile(languageKeysSchema);
	const valid = validate(translations);
	
	if (!valid) {
		console.error(chalk.bgRedBright.bold('Validation error: Missing or extra language in the translations!'));
		console.error(validate.errors);
		console.error(chalk.bgRedBright('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'));
		process.exit(1);
	}
}

/**/
validateTranslations();
