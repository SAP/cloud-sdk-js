import moment from 'moment';
import { Entity } from '../entity';
import { Field } from '../selectable';
import { StringFilterFunction } from './string-filter-function';
import { BooleanFilterFunction } from './boolean-filter-function';
import { filterFunction } from './filter-function';
import { NumberFilterFunction } from './number-filter-function';

/* String Functions */
/**
 * Build a filter function to test whether a string ends with another. Evaluates to boolean.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 * @param suffix - The suffix to test for. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function endsWith<EntityT extends Entity>(
  str:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  suffix:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('endswith', 'boolean', str, suffix);
}

/**
 * Build a filter function to test whether a string starts with another. Evaluates to boolean.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 * @param prefix - The prefix to test for. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function startsWith<EntityT extends Entity>(
  str:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  prefix:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('startswith', 'boolean', str, prefix);
}

/**
 * Build a filter function to get the length of a string. Evaluates to int.
 * @param str - The string to compute the length for. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function length<EntityT extends Entity>(
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
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
  str:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  substr:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>
): NumberFilterFunction<EntityT> {
  return filterFunction('indexof', 'int', str, substr);
}

/**
 * Build a filter function to get a substring starting from a designated position. Evaluates to string.
 * @param str - The string to get a substring from. This can either be a string, a reference to a field or another filter function.
 * @param pos - The starting position of the substring. This can be either a number, a reference to a field or another filter function.
 * @param len - The length of the substring. This can be either a number, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function substring<EntityT extends Entity>(
  str:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  pos:
    | number
    | Field<EntityT, boolean, boolean>
    | NumberFilterFunction<EntityT>,
  len?:
    | number
    | Field<EntityT, boolean, boolean>
    | NumberFilterFunction<EntityT>
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
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('tolower', 'string', str);
}

/**
 * Build a filter function to transform a string to upper case. Evaluates to string.
 * @param str - The string to transform. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function toUpper<EntityT extends Entity>(
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('toupper', 'string', str);
}

/**
 * Build a filter function to trim whitespace from a string. Evaluates to string.
 * @param str - The string to trim whitespace from. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function trim<EntityT extends Entity>(
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
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
  str1:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  str2:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('concat', 'string', str1, str2);
}

/* Math Functions */
/**
 * Build a filter function to round a number. Evaluates to double or decimal, defaults to double.
 * @param num - The number to round. This can either be a number, a reference to a field or another filter function.
 * @param returnType - The return type to use.
 * @returns The newly created filter function
 */
export function round<EntityT extends Entity>(
  num:
    | number
    | Field<EntityT, boolean, boolean>
    | NumberFilterFunction<EntityT>,
  returnType: 'double' | 'decimal' = 'double'
): NumberFilterFunction<EntityT> {
  return filterFunction('round', returnType, num);
}

/**
 * Build a filter function to floor a number. Evaluates to double or decimal, defaults to double.
 * @param num - The number to floor. This can either be a number, a reference to a field or another filter function.
 * @param returnType - The return type to use.
 * @returns The newly created filter function
 */
export function floor<EntityT extends Entity>(
  num:
    | number
    | Field<EntityT, boolean, boolean>
    | NumberFilterFunction<EntityT>,
  returnType: 'double' | 'decimal' = 'double'
): NumberFilterFunction<EntityT> {
  return filterFunction('floor', returnType, num);
}

/**
 * Build a filter function to ceil a number. Evaluates to double or decimal, defaults to double.
 * @param num - The number to ceil. This can either be a number, a reference to a field or another filter function.
 * @param returnType - The return type to use.
 * @returns The newly created filter function
 */
export function ceiling<EntityT extends Entity>(
  num:
    | number
    | Field<EntityT, boolean, boolean>
    | NumberFilterFunction<EntityT>,
  returnType: 'double' | 'decimal' = 'double'
): NumberFilterFunction<EntityT> {
  return filterFunction('ceiling', returnType, num);
}

/* Date Functions */
/**
 * Build a filter function to get the day of a date. Evaluates to int.
 * @param date - The date to get the day for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function day<EntityT extends Entity>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('day', 'int', date);
}

/**
 * Build a filter function to get the hour of a date. Evaluates to int.
 * @param date - The date to get the hour for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function hour<EntityT extends Entity>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('hour', 'int', date);
}

/**
 * Build a filter function to get the minute of a date. Evaluates to int.
 * @param date - The date to get the minute for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function minute<EntityT extends Entity>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('minute', 'int', date);
}

/**
 * Build a filter function to get the month of a date. Evaluates to int.
 * @param date - The date to get the month for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function month<EntityT extends Entity>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('month', 'int', date);
}

/**
 * Build a filter function to get the second of a date. Evaluates to int.
 * @param date - The date to get the second for. This can either be a date (moment.Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function second<EntityT extends Entity>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('second', 'int', date);
}

/**
 * Build a filter function to get the year of a date. Evaluates to int.
 * @param date - The date to get the year for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function year<EntityT extends Entity>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('year', 'int', date);
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
  expression: Field<EntityT, boolean, boolean>,
  type: string
): BooleanFilterFunction<EntityT>;

export function isOf<EntityT extends Entity>(
  expressionOrType: Field<EntityT, boolean, boolean> | string,
  type?: string
): BooleanFilterFunction<EntityT> {
  return type
    ? filterFunction('isof', 'boolean', expressionOrType, type)
    : filterFunction('isof', 'boolean', expressionOrType);
}

/**
 * Filter functions common to both OData v2 and OData v4. See below for version specific filter functions.
 *
 * Filter functions are used to create more complex filtering expresions, e. g. when filtering by the first letter of a property:
 * ```
 *  .filter(startsWith(BusinessPartner.FIRST_NAME, 'A').equals(true))
 * ```
 */
export const filterFunctions = {
  endsWith,
  startsWith,
  length,
  indexOf,
  substring,
  toLower,
  toUpper,
  trim,
  concat,
  round,
  floor,
  ceiling,
  day,
  hour,
  minute,
  month,
  second,
  year,
  isOf
};
