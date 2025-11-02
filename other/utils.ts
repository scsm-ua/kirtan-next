/**
 * If a value is object.
 */
export function isObject(x: any): boolean {
  return typeof x === 'object' && !Array.isArray(x) && x !== null;
}
