import voca from 'voca';

/**
 * Convert a string to the uppercase snake case. This format is used e. g. for static properties on entity classes.
 *
 * @param str - The string to be transformed.
 * @returns The input string in the case used by static methods on entity-classes.
 */
export function toUpperCaseSnakeCase(str: string): string {
  return voca.upperCase(voca.snakeCase(str));
}

/**
 * Convert a string to camelCase. This format used e. g. for properties on entity class instances.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toCamelCase(str: string): string {
  return voca.camelCase(str);
}

/**
 * Convert a string to a human readable format, e.g. it transforms `to_BusinessPartner` to `To Business Partner`.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toTitleFormat(str: string): string {
  return voca.titleCase(voca.words(str).join(' '));
}

/**
 * Convert a string to pascal case. This format is used e. g. for types.
 * @param str - The string to be transformed.
 * @returns The transformed string.
 */
export function toPascalCase(str: string): string {
  return voca
    .words(str)
    .map(word => voca.capitalize(word))
    .join('');
}
