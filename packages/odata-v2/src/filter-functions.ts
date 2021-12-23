import {
  Field,
  StringFilterFunction,
  BooleanFilterFunction,
  filterFunction,
  filterFunctions as filterFunctionsCommon,
  FilterFunctionsType as FilterFunctionsCommonType,
  Time,
  FilterFunctionNames as FilterFunctionNamesCommon
} from '@sap-cloud-sdk/odata-common/internal';
import BigNumber from 'bignumber.js';
import { DeSerializers } from './de-serializers/de-serializers';
import { defaultDeSerializers } from './de-serializers/default-de-serializers';
import { mergeDefaultDeSerializersWith } from './de-serializers/custom-de-serializers';
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
  substr:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  str: string | Field<EntityT, boolean, boolean> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('substringof', 'boolean', substr, str);
}

/**
 * Build a filter function to replace the occurrence of a search string with another string. Evaluates to string.
 * @param str - The string to get the index from. This can either be a string, a reference to a field or another filter function.
 * @param searchStr - The substring to get the index for. This can either be a string, a reference to a field or another filter function.
 * @param replaceStr - The substring to get the index for. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function replace<EntityT extends Entity>(
  str:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  searchStr:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>,
  replaceStr:
    | string
    | Field<EntityT, boolean, boolean>
    | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('replace', 'string', str, searchStr, replaceStr);
}

/**
 * Export length filter function for backwards compatibility.
 */
export const length = filterFunctionsCommon(defaultDeSerializers).length;

/**
 * Export substring filter function for backwards compatibility.
 */
export const substring = filterFunctionsCommon(defaultDeSerializers).substring;

/**
 * OData v2 specific filter functions
 * @param deSerializers - DeSerializer used in the filter
 * @returns Filter functions object
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
  AnyT = any,
  DateTimeT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  TimeT = Time
>(
  deSerializers: Partial<
    DeSerializers<
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
      AnyT,
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  > = defaultDeSerializers as any
): FilterFunctionsType {
  return {
    ...filterFunctionsCommon(mergeDefaultDeSerializersWith(deSerializers)),
    substringOf,
    replace
  };
}

/**
 * @internal
 */
export type FilterFunctionsType = FilterFunctionsCommonType & {
  substringOf: typeof substringOf;
  replace: typeof replace;
};

/**
 * @internal
 */
export type FilterFunctionNames =
  | FilterFunctionNamesCommon
  | 'substringOf'
  | 'replace';
