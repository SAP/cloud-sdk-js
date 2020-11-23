/**
 * Encode a string to a base64 encoded string.
 * @param str String to encode.
 * @returns Base64 encoded string.
 */
export function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

/**
 * Prepend a string by the given indentation.
 * @param string String to indent.
 * @param indentation Indentation to use.
 * @returns A string with a prefix consisting of spaces with the length of the given indentation.
 */
export const indent = (string, indentation) =>
  string
    .split('\n')
    .map(subString => `${indentation}${subString}`)
    .join('\n');

/**
 * Remove whitespace from the left side of a string.
 * @param string String to trim.
 * @returns String without whitespace on the left side.
 */
export const trimLeft = string => {
  let subStrings = string.split('\n');
  if (!subStrings[0].trim()) {
    subStrings = subStrings.slice(1);
  }
  return subStrings.join('\n');
};

/**
 * Remove whitespace from the right side of a string.
 * @param string String to trim.
 * @returns String without whitespace on the right side.
 */
export const trimRight = string => {
  let subStrings = string.split('\n');
  if (!subStrings[subStrings.length - 1].trim()) {
    subStrings = subStrings.slice(0, -1);
  }
  return subStrings.join('\n');
};

/**
 * Remove whitespace from the left side of a string.
 * @param string String to trim.
 * @returns String without outer whitespace.
 */
export const trim = string => trimRight(trimLeft(string));
