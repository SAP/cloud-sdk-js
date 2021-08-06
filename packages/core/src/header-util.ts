import {
  mergeIgnoreCase,
  mergeLeftIgnoreCase,
  pickIgnoreCase,
  pickNonNullish,
  pickValueIgnoreCase,
  toSanitizedObject
} from '@sap-cloud-sdk/util';

/**
 * @deprecated Since v1.32.0. Use [[toSanitizedObject]] instead.
 * Create a header object based on the given key and value if neither key nor value are nullish.
 * @param key - Name of the header.
 * @param value - Value of the header.
 * @returns - An object containing the given key and value of an empty object.
 */
export function toSanitizedHeaderObject(
  key: string,
  value: any
): Record<string, any> {
  return toSanitizedObject(key, value);
}

/**
 * @deprecated Since v1.32.0. Use [[pickIgnoreCase]] instead.
 *
 * Find a header in a given header object, if available, independent of the case (lower / upper).
 * @param key - Name of the header to be found.
 * @param headers - Header object to be searched for given key.
 * @returns - An object containing the given key (and value) in its original case, as found in `headers` or an empty object if not found.
 */
export function getHeader(
  key: string,
  headers: Record<string, any> = {}
): Record<string, any> {
  return pickIgnoreCase(headers, key);
}

/**
 * @deprecated Since v1.32.0. Use [[pickIgnoreCase]] instead.
 *
 * Find headers in a given header object, if available, indepdendent of the case (lower / upper).
 * @param keys - Name of the header to be found.
 * @param headers - Header object to be searched for given key.
 * @returns - An object containing the given keys (and values) in its original case, as found in `headers` or an empty object if not found.
 */
export function getHeaders(
  keys: string[],
  headers: Record<string, any> = {}
): Record<string, any> {
  return pickIgnoreCase(headers, ...keys);
}

/**
 * @deprecated Since v1.32.0. Use [[pickValueIgnoreCase]] instead.
 *
 * Get the value of a header based on the given key, independent of the case (lower / upper).
 * @param key - Name of the header to be found.
 * @param headers - Header object to be searched for given key.
 * @returns The value of the header with the given key or undefined.
 */
export function getHeaderValue(
  key: string,
  headers: Record<string, any> = {}
): any | undefined {
  return pickValueIgnoreCase(headers, key);
}

/**
 * @deprecated Since v1.32.0. Use [[pickNonNullish]] instead.
 *
 * Filter headers that have nullish values.
 * @param headers - A header object to be filtered.
 * @returns - A filtered header object containing only headers with non-nullish values.
 */
export function filterNullishValues(
  headers: Record<string, any> = {}
): Record<string, any> {
  return pickNonNullish(headers);
}

/**
 * @deprecated Since v1.32.0. Use [[mergeLeftIgnoreCase]] instead.
 *
 * Create a header object by replacing headers that are set as custom headers.
 * @param headers - A base header object that contains the headers that will be compared with `customHeaders`.
 * @param customHeaders - A header object to be compared with headers. Only headers present in `headers` will be compared.
 * @returns - An object containing all keys from the original `headers` object, where headers present in the `customHeaders` are replaced. Note that the case (upper / lower) used by `customHeaders` will be used.
 */
export function replaceDuplicateKeys(
  headers: Record<string, any> = {},
  customHeaders: Record<string, any> = {}
): Record<string, any> {
  return mergeLeftIgnoreCase(headers, customHeaders);
}

/**
 * @deprecated Since v1.32.0. Use [[mergeIgnoreCase]] instead.
 *
 * Create a header object by merging two header objects, where the custom headers take precedence.
 * @param headers - A base header object that contains the headers that will be compared with `customHeaders`.
 * @param customHeaders - A header object to be compared with headers. Only headers present in `headers` will be compared.
 * @returns - An object containing all keys from both the header objects, where headers present in the `customHeaders` are replaced. Note that the case (upper / lower) used by `customHeaders` will be used.
 */
export function mergeHeaders(
  headers: Record<string, any> = {},
  customHeaders: Record<string, any> = {}
): Record<string, any> {
  return mergeIgnoreCase(headers, customHeaders);
}
