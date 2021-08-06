/**
 * Checks whether a value is either `null` or `undefined`.
 * @param val - Value to check
 * @returns true for null or undefined, false otherwise.
 */
export function isNullish(val: any): val is null | undefined {
  return val === null || val === undefined;
}
