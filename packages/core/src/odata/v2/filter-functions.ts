/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  Field,
  StringFilterFunction,
  BooleanFilterFunction,
  NumberFilterFunction,
  filterFunction
} from '../common';
import { Entity } from './entity';

/* String Functions */
/**
 * Build a filter function to test whether a string is a substring of the other. Evaluates to boolean.
 * @param substr - The substring to test for. This can either be a string, a reference to a field or another filter function.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function substringOf<EntityT extends Entity>(
  substr: string | Field<EntityT> | StringFilterFunction<EntityT>,
  str: string | Field<EntityT> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('substringof', 'bool', substr, str);
}

/**
 * Build a filter function to test whether a string ends with another. Evaluates to boolean.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 * @param suffix - The suffix to test for. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function endsWith<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>,
  suffix: string | Field<EntityT> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('endswith', 'bool', str, suffix);
}

/**
 * Build a filter function to test whether a string starts with another. Evaluates to boolean.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 * @param prefix - The prefix to test for. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function startsWith<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>,
  prefix: string | Field<EntityT> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('startsWith', 'bool', str, prefix);
}

/**
 * Build a filter function to get the length of a string. Evaluates to int.
 * @param str - The string to compute the length for. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function length<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>
): NumberFilterFunction<EntityT> {
  return filterFunction('length', 'int', str);
}

/**
 * Build a filter function to get the start index of a substring. Evaluates to int.
 * @param str - The string to get the index from. This can either be a string, a reference to a field or another filter function.
 * @param substr - The substring to get the index for. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function indexOf<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>,
  substr: string | Field<EntityT> | StringFilterFunction<EntityT>
): NumberFilterFunction<EntityT> {
  return filterFunction('indexof', 'int', str, substr);
}

/**
 * Build a filter function to replace the occurence of a search string with another string. Evaluates to string.
 * @param str - The string to get the index from. This can either be a string, a reference to a field or another filter function.
 * @param searchStr - The substring to get the index for. This can either be a string, a reference to a field or another filter function.
 * @param replaceStr - The substring to get the index for. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function replace<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>,
  searchStr: string | Field<EntityT> | StringFilterFunction<EntityT>,
  replaceStr: string | Field<EntityT> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('replace', 'string', str, searchStr, replaceStr);
}

/**
 * Build a filter function to get a substring starting from a designated position. Evaluates to string.
 * @param str - The string to get a substring from. This can either be a string, a reference to a field or another filter function.
 * @param pos - The starting position of the substring. This can be either a number, a reference to a field or another filter function.
 * @param len - The length of the substring. This can be either a number, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function substring<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>,
  pos: number | Field<EntityT> | NumberFilterFunction<EntityT>,
  len?: number | Field<EntityT> | NumberFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return typeof len === 'undefined'
    ? filterFunction('substring', 'string', str, pos)
    : filterFunction('substring', 'string', str, pos, len);
}

/**
 * Build a filter function to transform a string to lower case. Evaluates to string.
 * @param str - The string to transform. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function toLower<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('tolower', 'string', str);
}

/**
 * Build a filter function to transform a string to upper case. Evaluates to string.
 * @param str - The string to transform. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function toUpper<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('toupper', 'string', str);
}

/**
 * Build a filter function to trim whitespace from a string. Evaluates to string.
 * @param str - The string to trim whitespace from. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function trim<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('trim', 'string', str);
}

/**
 * Build a filter function to concatenate two strings. Evaluates to string.
 * @param str1 - The first string to concatenate. This can either be a string, a reference to a field or another filter function.
 * @param str2 - The second string to concatenate. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function concat<EntityT extends Entity>(
  str1: string | Field<EntityT> | StringFilterFunction<EntityT>,
  str2: string | Field<EntityT> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('concat', 'string', str1, str2);
}

/* Math Functions */
/**
 * Build a filter function to round a number. Evaluates to decimal or double.
 * @param num - The number to round. This can either be a number, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function round<EntityT extends Entity>(
  num: number | Field<EntityT> | NumberFilterFunction<EntityT>
): NumberFilterFunction<EntityT> {
  // Using arbitrary number type 'double' to create a NumberFilterFunction. It is used only to determine the type of FilterFunction.
  return filterFunction('round', 'double', num);
}

/**
 * Build a filter function to floor a number. Evaluates to decimal or double.
 * @param num - The number to floor. This can either be a number, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function floor<EntityT extends Entity>(
  num: number | Field<EntityT> | NumberFilterFunction<EntityT>
): NumberFilterFunction<EntityT> {
  // Using arbitrary number type 'double' to create a NumberFilterFunction. It is used only to determine the type of FilterFunction.
  return filterFunction('floor', 'double', num);
}

/**
 * Build a filter function to ceil a number. Evaluates to decimal or double.
 * @param num - The number to ceil. This can either be a number, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function ceiling<EntityT extends Entity>(
  num: number | Field<EntityT> | NumberFilterFunction<EntityT>
): NumberFilterFunction<EntityT> {
  // Using arbitrary number type 'double' to create a NumberFilterFunction. It is used only to determine the type of FilterFunction.
  return filterFunction('ceiling', 'double', num);
}

/* Type Functions */
/**
 * Build a filter function to test whether a selection is of a given type. Evaluates to boolean.
 * @param type - The type to test for, e. g. `API_BUSINESS_PARTNER.A_BusinessPartner`.
 *
 * @returns The newly created filter function
 */
export function isOf<EntityT extends Entity>(
  type: string
): BooleanFilterFunction<EntityT>;
/**
 * Build a filter function to test whether a field is of a given type. Evaluates to boolean.
 * @param expression - A reference to a field to test for type.
 * @param type - The type to test for, e. g. `API_BUSINESS_PARTNER.A_BusinessPartner`.
 *
 * @returns The newly created filter function
 */
export function isOf<EntityT extends Entity>(
  expression: Field<EntityT>,
  type: string
): BooleanFilterFunction<EntityT>;
export function isOf<EntityT extends Entity>(
  expressionOrType: Field<EntityT> | string,
  type?: string
): BooleanFilterFunction<EntityT> {
  if (type) {
    return filterFunction('substringof', 'bool', expressionOrType, type);
  }
  return filterFunction('substringof', 'bool', expressionOrType);
}
