const path = require('path');
const { execSync } = require('child_process');
const { mkdirSync, writeFileSync } = require('fs');

const chalk = require('chalk');

const { CONST } = require('../constants');
const songbooks = require('../../source/songbooks.json');
const resources = require('../../source/resources.json');

/**/
const SHARED_DIR = path.resolve(__dirname, '..', '..', CONST.FOLDER.SHARED);

/**
 * Phase 1 — download (used for deployment).
 *
 * Installs every book package (source/songbooks.json) + the shared resources
 * package (source/resources.json) in a single `pnpm install` pass into
 * ./shared. Runs from zero on every deploy so the latest versions of the git
 * dependencies are always fetched. The per-book build runs in phase 2 so that
 * local edits to a linked package are always picked up.
 */
function installShared() {
	writeSharedManifest();

	console.log(chalk.bgBlueBright(' Installing shared packages (pnpm) '));
	execSync('pnpm install', { cwd: SHARED_DIR, stdio: 'inherit' });
}

/**
 * Generates ./shared/package.json from the book + resources dependency files so
 * the set of installed packages always stays in sync with the source of truth.
 * Each dependency is installed under its slug (aliased git dependency).
 */
function writeSharedManifest() {
	mkdirSync(SHARED_DIR, { recursive: true });

	const pkg = {
		name: 'kirtan-shared',
		version: '1.0.0',
		private: true,
		dependencies: { ...songbooks, ...resources }
	};

	writeFileSync(
		path.join(SHARED_DIR, CONST.FILES.PACKAGE_JSON),
		JSON.stringify(pkg, null, 2)
	);

	// Copy (instead of hard-link) files from the pnpm store so the phase-2
	// in-package builds cannot corrupt the shared store.
	writeFileSync(
		path.join(SHARED_DIR, CONST.FILES.NPMRC),
		'package-import-method=copy\n'
	);
}

/**/
installShared();
