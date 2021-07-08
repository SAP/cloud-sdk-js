import moment from 'moment';
import {
  Field,
  StringFilterFunction,
  BooleanFilterFunction,
  NumberFilterFunction,
  FilterFunctionPrimitiveParameterType,
  FieldType,
  CollectionField
} from '../odata-common';
import { CollectionFilterFunction } from '../odata-common/filter/collection-filter-function';
import { filterFunctions as filterFunctionsCommon } from '../odata-common/filter/filter-functions';
import { Entity } from './entity';
import { filterFunction } from './filter-function';

/* String Functions */
/**
 * Build a filter function to test whether a string is a substring of the other. Evaluates to boolean.
 * @param substr - The substring to test for. This can either be a string, a reference to a field or another filter function.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function contains<EntityT extends Entity>(
  substr:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('contains', 'boolean', substr, str);
}

/**
 * Build a filter function to test whether a string matches a pattern. Evaluates to boolean.
 * @param str - The string to get the index from. This can either be a string, a reference to a field or another filter function.
 * @param regex - The pattern to test against. This should be a regular expression as a string.
 * @returns The newly created filter function
 */
export function matchesPattern<EntityT extends Entity>(
  str:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  regex: string
): BooleanFilterFunction<EntityT> {
  return filterFunction('matchesPattern', 'boolean', str, regex);
}

/* Date Functions */
/**
 * Build a filter function to get the fractional seconds of a date. Evaluates to decimal.
 * @param date - The date to get the fractional seconds for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function fractionalSeconds<EntityT extends Entity>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('fractionalseconds', 'decimal', date);
}

/**
 * Build a filter function to get the signed number of minutes in the time zone offset. Evaluates to int.
 * @param date - The date to get the offset minutes for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function totalOffsetMinutes<EntityT extends Entity>(
  date: moment.Moment | Field<EntityT, boolean, boolean>
): NumberFilterFunction<EntityT> {
  return filterFunction('totaloffsetminutes', 'decimal', date);
}

/**
 * Build a filter function to get the latest possible point in time. Evaluates to DateTimeOffset.
 * @returns The newly created filter function
 */
export function maxDateTime<
  EntityT extends Entity
>(): NumberFilterFunction<EntityT> {
  return filterFunction('maxdatetime', 'decimal');
}

/**
 * Build a filter function to get the earliest possible point in time. Evaluates to DateTimeOffset.
 * @returns The newly created filter function
 */
export function minDateTime<
  EntityT extends Entity
>(): NumberFilterFunction<EntityT> {
  return filterFunction('mindatetime', 'decimal');
}

/**
 * Build a filter function to get the current point in time. Evaluates to DateTimeOffset.
 * @returns The newly created filter function
 */
export function now<EntityT extends Entity>(): NumberFilterFunction<EntityT> {
  return filterFunction('now', 'decimal');
}

/* Collection functions */
/**
 * Build a filter function to test whether a set is a subset of the other, i. e. whether the second parameter can be transformed into the first by reordering and / or removing items. Evaluates to boolean.
 * @param subset - The subset to test for. This can either be an array, a reference to a field or another filter function.
 * @param set - The set to test. This can either be an array, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function hasSubset<
  EntityT extends Entity,
  ParamT extends FilterFunctionPrimitiveParameterType,
  ReturnT extends FieldType
>(
  subset:
    | ParamT[]
    | CollectionField<EntityT, any, boolean, boolean>
    | CollectionFilterFunction<EntityT, ReturnT>,
  set:
    | ParamT[]
    | CollectionField<EntityT, any, boolean, boolean>
    | CollectionFilterFunction<EntityT, ReturnT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('hassubset', 'boolean', subset, set);
}

/**
 * Build a filter function to test whether a set is a subsequence of the other, i. e. whether the second parameter can be transformed into the first by removing items. Evaluates to boolean.
 * @param subsequence - The subsequence to test for. This can either be an array, a reference to a field or another filter function.
 * @param sequence - The sequence to test. This can either be an array, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function hasSubsequence<
  EntityT extends Entity,
  ParamT extends FilterFunctionPrimitiveParameterType,
  ReturnT extends FieldType
>(
  subsequence:
    | ParamT[]
    | Field<EntityT, boolean, boolean>
    | CollectionFilterFunction<EntityT, ReturnT>,
  sequence:
    | ParamT[]
    | Field<EntityT, boolean, boolean>
    | CollectionFilterFunction<EntityT, ReturnT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('hassubsequence', 'boolean', subsequence, sequence);
}
/**
 * TODO: totalseconds, time
 */

/**
 * OData v4 specific filter functions
 */
export const filterFunctions = {
  ...filterFunctionsCommon,
  contains,
  matchesPattern,
  fractionalSeconds,
  totalOffsetMinutes,
  maxDateTime,
  minDateTime,
  now,
  hasSubset,
  hasSubsequence
};

export { filterFunctions as filterFunctionsV4 };
