/**
 * @typedef {Object} RawContentGroup
 * @property {Array<RawContentItem>} items
 * @property {string} name
 */

/**
 * @typedef {Object} RawContentItem
 * @property {string} filepath
 * @property {string} id - slug of the song.
 * @property {string} title
 */

/**
 * @typedef {Object} RawSong
 * @property {Array<string>} [author]
 * @property {RawSongMeta} meta
 * @property {Array<RawEmbed>} embeds
 */

/**
 * @typedef {Object} RawSongMeta
 * @property {string} [author]
 * @property {string} first_line
 * @property {number | string | Array<number>} page
 */

/**
 * @typedef {Object} RawEmbed
 * @property {string} embed_code
 * @property {string} embed_url
 * @property {string} iframe_url
 * @property {string} title
 */

/**
 * @typedef {Object} ContentGroup
 * @property {Array<ContentItem>} items
 * @property {string} name
 */

/**
 * @typedef {Object} ContentItem
 * @property {string} aliasName - the first line of the first verse.
 * @property {string} [author]
 * @property {string} id - slug of the song.
 * @property {number | string} page
 * @property {Array<number | string>} pages
 * @property {string} title
 * @property {Object} has
 * @property {boolean} has.audio
 */
