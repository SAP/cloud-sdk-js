import moment from 'moment';
import BigNumber from 'bignumber.js';
import { DeSerializers } from '../de-serializers';
import { EntityBase } from '../entity-base';
import { Field } from '../selectable/field';
import { StringFilterFunction } from './string-filter-function';
import { BooleanFilterFunction } from './boolean-filter-function';
import { filterFunction } from './filter-function';
import { NumberFilterFunction } from './number-filter-function';

/* String Functions */
/**
 * @internal
 * Build a filter function to test whether a string ends with another. Evaluates to boolean.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 * @param suffix - The suffix to test for. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function endsWith<EntityT extends EntityBase>(
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
 * @internal
 * Build a filter function to test whether a string starts with another. Evaluates to boolean.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 * @param prefix - The prefix to test for. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function startsWith<EntityT extends EntityBase>(
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
 * @internal
 * Build a filter function to get the length of a string. Evaluates to int.
 * @param str - The string to compute the length for. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function length<EntityT extends EntityBase>(
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
): NumberFilterFunction<EntityT> {
  return filterFunction('length', 'int', str);
}

/**
 * @internal
 * Build a filter function to get the start index of a substring. Evaluates to int.
 * @param str - The string to get the index from. This can either be a string, a reference to a field or another filter function.
 * @param substr - The substring to get the index for. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function indexOf<EntityT extends EntityBase>(
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
 * @internal
 * Build a filter function to get a substring starting from a designated position. Evaluates to string.
 * @param str - The string to get a substring from. This can either be a string, a reference to a field or another filter function.
 * @param pos - The starting position of the substring. This can be either a number, a reference to a field or another filter function.
 * @param len - The length of the substring. This can be either a number, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function substring<EntityT extends EntityBase>(
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
 * @internal
 * Build a filter function to transform a string to lower case. Evaluates to string.
 * @param str - The string to transform. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function toLower<EntityT extends EntityBase>(
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('tolower', 'string', str);
}

/**
 * @internal
 * Build a filter function to transform a string to upper case. Evaluates to string.
 * @param str - The string to transform. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function toUpper<EntityT extends EntityBase>(
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('toupper', 'string', str);
}

/**
 * @internal
 * Build a filter function to trim whitespace from a string. Evaluates to string.
 * @param str - The string to trim whitespace from. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function trim<EntityT extends EntityBase>(
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('trim', 'string', str);
}

/**
 * @internal
 * Build a filter function to concatenate two strings. Evaluates to string.
 * @param str1 - The first string to concatenate. This can either be a string, a reference to a field or another filter function.
 * @param str2 - The second string to concatenate. This can either be a string, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function concat<EntityT extends EntityBase>(
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
 * @internal
 */
export function round<EntityT extends EntityBase>(
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
 * @internal
 */
export function floor<EntityT extends EntityBase>(
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
 * @internal
 */
export function ceiling<EntityT extends EntityBase>(
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
 * @internal
 */
export function day<EntityT extends EntityBase>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('day', 'int', date);
}

/**
 * Build a filter function to get the hour of a date. Evaluates to int.
 * @param date - The date to get the hour for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 * @internal
 */
export function hour<EntityT extends EntityBase>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('hour', 'int', date);
}

/**
 * Build a filter function to get the minute of a date. Evaluates to int.
 * @param date - The date to get the minute for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 * @internal
 */
export function minute<EntityT extends EntityBase>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('minute', 'int', date);
}

/**
 * Build a filter function to get the month of a date. Evaluates to int.
 * @param date - The date to get the month for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 * @internal
 */
export function month<EntityT extends EntityBase>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('month', 'int', date);
}

/**
 * Build a filter function to get the second of a date. Evaluates to int.
 * @param date - The date to get the second for. This can either be a date (moment.Moment) or a reference to a field.
 * @returns The newly created filter function
 * @internal
 */
export function second<EntityT extends EntityBase>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('second', 'int', date);
}

/**
 * Build a filter function to get the year of a date. Evaluates to int.
 * @param date - The date to get the year for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 * @internal
 */
export function year<EntityT extends EntityBase>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('year', 'int', date);
}

/* Type Functions */
/**
 * Build a filter function to test whether a selection is of a given type. Evaluates to boolean.
 * @param type - The type to test for, e.g. `API_BUSINESS_PARTNER.A_BusinessPartner`.
 * @returns The newly created filter function
 * @internal
 */
export function isOf<EntityT extends EntityBase>(
  type: string
): BooleanFilterFunction<EntityT>;
/**
 * Build a filter function to test whether a field is of a given type. Evaluates to boolean.
 * @param expression - A reference to a field to test for type.
 * @param type - The type to test for, e.g. `API_BUSINESS_PARTNER.A_BusinessPartner`.
 * @returns The newly created filter function
 * @internal
 */
export function isOf<EntityT extends EntityBase>(
  expression: Field<EntityT, boolean, boolean>,
  type: string
): BooleanFilterFunction<EntityT>;

/**
 * @param expressionOrType - expressionOrType
 * @param type - type
 * @returns returns if the type matches
 * @internal
 */
export function isOf<EntityT extends EntityBase>(
  expressionOrType: Field<EntityT, boolean, boolean> | string,
  type?: string
): BooleanFilterFunction<EntityT> {
  return type
    ? filterFunction('isof', 'boolean', expressionOrType, type)
    : filterFunction('isof', 'boolean', expressionOrType);
}

/**
 * Filter functions common to both OData v2 and OData v4. See below for version specific filter functions.
 * Filter functions are used to create more complex filtering expressions, e.g. when filtering by the first letter of a property:
 * ```
 *  .filter(startsWith(BusinessPartner.FIRST_NAME, 'A').equals(true))
 * ```
 * @internal
 * @param deSerializers - DeSerializer used in the filter
 * @returns filter functions
 */
export function filterFunctions<
  BinaryT = string,
  BooleanT = boolean,
  ByteT = number,
  DecimalT = BigNumber,
  DoubleT = number,
  FloatT = number,
  Int16T = number,
  Int32T = number,
  Int64T = BigNumber,
  GuidT = string,
  SByteT = number,
  SingleT = number,
  StringT = string,
  AnyT = any
>(
  // eslint-disable-next-line
  deSerializers: DeSerializers<
    BinaryT,
    BooleanT,
    ByteT,
    DecimalT,
    DoubleT,
    FloatT,
    Int16T,
    Int32T,
    Int64T,
    GuidT,
    SByteT,
    SingleT,
    StringT,
    AnyT
  >
): FilterFunctionsType {
  return {
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
}

/**
 * Interface containing all filter functions like `startsWith`, `toUpper` or `floor`.
 */
export interface FilterFunctionsType {
  /**
   * Build a filter function to test whether a string ends with another. Evaluates to boolean.
   */
  endsWith: typeof endsWith;
  /**
   * Build a filter function to test whether a string starts with another. Evaluates to boolean.
   */
  startsWith: typeof startsWith;
  /**
   * Build a filter function to get the length of a string. Evaluates to int.
   */
  length: typeof length;
  /**
   * Build a filter function to get the start index of a substring. Evaluates to int.
   */
  indexOf: typeof indexOf;
  /**
   * Build a filter function to get a substring starting from a designated position. Evaluates to string.
   */
  substring: typeof substring;
  /**
   * Build a filter function to transform a string to lower case. Evaluates to string.
   */
  toLower: typeof toLower;
  /**
   * Build a filter function to transform a string to upper case. Evaluates to string.
   */
  toUpper: typeof toUpper;
  /**
   * Build a filter function to trim whitespace from a string. Evaluates to string.
   */
  trim: typeof trim;
  /**
   * Build a filter function to concatenate two strings. Evaluates to string.
   */
  concat: typeof concat;
  /**
   * Build a filter function to round a number. Evaluates to double or decimal, defaults to double.
   */
  round: typeof round;
  /**
   * Build a filter function to floor a number. Evaluates to double or decimal, defaults to double.
   */
  floor: typeof floor;
  /**
   * Build a filter function to ceil a number. Evaluates to double or decimal, defaults to double.
   */
  ceiling: typeof ceiling;
  /**
   * Build a filter function to get the day of a date. Evaluates to int.
   */
  day: typeof day;
  /**
   * Build a filter function to get the hour of a date. Evaluates to int.
   */
  hour: typeof hour;
  /**
   * Build a filter function to get the minute of a date. Evaluates to int.
   */
  minute: typeof minute;
  /**
   * Build a filter function to get the month of a date. Evaluates to int.
   */
  month: typeof month;
  /**
   * Build a filter function to get the second of a date. Evaluates to int.
   */
  second: typeof second;
  /**
   * Build a filter function to get the year of a date. Evaluates to int.
   */
  year: typeof year;
  /**
   * Build a filter function to test whether a selection or a field is of a given type. Evaluates to boolean.
   */
  isOf: typeof isOf;
}

/**
 * Union type of all the possible filter functions contained in {@link FilterFunctionsType}.
 */
export type FilterFunctionTypes =
  | typeof endsWith
  | typeof startsWith
  | typeof length
  | typeof indexOf
  | typeof substring
  | typeof toLower
  | typeof toUpper
  | typeof trim
  | typeof concat
  | typeof round
  | typeof floor
  | typeof ceiling
  | typeof day
  | typeof hour
  | typeof minute
  | typeof month
  | typeof second
  | typeof year
  | typeof isOf;

/**
 * @internal
 */
export type FilterFunctionNames =
  | 'endsWith'
  | 'startsWith'
  | 'length'
  | 'indexOf'
  | 'substring'
  | 'toLower'
  | 'toUpper'
  | 'trim'
  | 'concat'
  | 'round'
  | 'floor'
  | 'ceiling'
  | 'day'
  | 'hour'
  | 'minute'
  | 'month'
  | 'second'
  | 'year'
  | 'isOf';
