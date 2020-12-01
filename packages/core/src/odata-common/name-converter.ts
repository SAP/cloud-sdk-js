import voca from 'voca';

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to the case used by static methods on entity classes. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The input string in the case used by static methods on entity-classes.
 */
export function toStaticPropertyFormat(str: string): string {
  return voca.upperCase(voca.snakeCase(str));
}

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to the format used by properties. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toPropertyFormat(str: string): string {
  return voca.camelCase(str);
}

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to PascalCase format e.g. "MyNameInPascalCase".
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toPascalCase(str: string): string {
  return voca.capitalize(voca.camelCase(str));
}

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to a human readable format, e.g. it transforms `to_BusinessPartner` to `To Business Partner`. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toTitleFormat(str: string): string {
  return voca.titleCase(voca.words(str).join(' '));
}

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to the format used by properties. Use this for serialization.
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toTypeNameFormat(str: string): string {
  return voca
    .words(str)
    .map(word => voca.capitalize(word))
    .join('');
}
