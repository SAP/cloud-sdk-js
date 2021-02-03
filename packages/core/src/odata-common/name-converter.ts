import {
  camelCase,
  upperCaseSnakeCase,
  pascalCase,
  titleFormat
} from '@sap-cloud-sdk/util';

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to the format used by static properties. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toStaticPropertyFormat(str: string): string {
  return upperCaseSnakeCase(str);
}

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to the format used by properties. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toPropertyFormat(str: string): string {
  return camelCase(str);
}

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to PascalCase format e.g. "MyNameInPascalCase".
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toPascalCase(str: string): string {
  return pascalCase(str);
}

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to a human readable format, e.g. it transforms `to_BusinessPartner` to `To Business Partner`. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toTitleFormat(str: string): string {
  return titleFormat(str);
}

/**
 * @deprecated Since v1.32.2. Use functions from @sap-cloud-sdk/util instead.
 * Converts a string to the format used by properties. Use this for serialization.
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toTypeNameFormat(str: string): string {
  return pascalCase(str);
}
