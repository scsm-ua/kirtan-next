const TAG_REGEX = /<[^>]+>/gi;
const NOTE_MD_REGEX = /\*\*\*(.*?)\*\*\*/gm;
const TERM_MD_REGEX = /\*{1,2}(.*?)\*{1,2}/gm;

/**
 * If a value is object.
 */
export function isObject(x: any): boolean {
  return typeof x === 'object' && !Array.isArray(x) && x !== null;
}

/**
 *
 */
export function processTranslationLines(lines: string[], cssPrefix: string): string[] {
  if (!lines) {
    return [];
  }
  return lines
    .join('\n')
    // Cleanup tags for safety.
    .replace(TAG_REGEX, '')
    .replace(NOTE_MD_REGEX, `<i class="${cssPrefix}__note">$1</i>\n`)
    .replace(TERM_MD_REGEX, `<i class="${cssPrefix}__term">$1</i>`)
    .replaceAll('\\\n', '<br />')
    .split(/\n/);
}
