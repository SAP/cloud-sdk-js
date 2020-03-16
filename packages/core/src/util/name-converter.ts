/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import voca from 'voca';

/**
 * Converts a string to the case used by static methods on entity classes. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The input string in the case used by static methods on entity-classes.
 */
export function toStaticPropertyFormat(str: string): string {
  return voca.upperCase(voca.snakeCase(str));
}

/**
 * Converts a string to the format used by properties. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toPropertyFormat(str: string): string {
  return voca.camelCase(str);
}

/**
 * Converts a string to PascalCase format e.g. "MyNameInPascalCase".
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toPascalCase(str: string): string {
  return voca.capitalize(voca.camelCase(str));
}

/**
 * Converts a string to a human readable format, e.g. it transforms `to_BusinessPartner` to `To Business Partner`. Use this for serialization.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toTitleFormat(str: string): string {
  return voca.titleCase(voca.words(str).join(' '));
}

/**
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
