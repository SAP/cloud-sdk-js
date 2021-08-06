import { unixEOL } from './string-formatter';
/**
 * Encode a string to a base64 encoded string.
 * @param str - String to encode.
 * @returns Base64 encoded string.
 */
export function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

/**
 * Remove whitespace from the left side of a string.
 * @param string -  String to trim.
 * @returns String without whitespace on the left side.
 */
export function trimLeft(string: string): string {
  let subStrings = string.split(unixEOL);
  if (!subStrings[0].trim()) {
    subStrings = subStrings.slice(1);
  }
  return subStrings.join(unixEOL);
}

/**
 * Remove whitespace from the right side of a string.
 * @param string -  String to trim.
 * @returns String without whitespace on the right side.
 */
export function trimRight(string: string): string {
  let subStrings = string.split(unixEOL);
  if (!subStrings[subStrings.length - 1].trim()) {
    subStrings = subStrings.slice(0, -1);
  }
  return subStrings.join(unixEOL);
}

/**
 * Remove whitespace from the left side of a string.
 * @param string -  String to trim.
 * @returns String without outer whitespace.
 */
export function trim(string: string): string {
  return trimRight(trimLeft(string));
}

/**
 * Remove file extension from a string, e.g. remove 'test.jpg' would return 'test'
 * @param fileName -  File name to remove the file extension from.
 * @returns File name without extension.
 */
export function removeFileExtension(fileName: string): string {
  return fileName.includes('.')
    ? fileName.split('.').slice(0, -1).join('.')
    : fileName;
}
