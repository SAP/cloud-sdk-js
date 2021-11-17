import {
  Field,
  StringFilterFunction,
  BooleanFilterFunction,
  filterFunction,
  filterFunctions as filterFunctionsCommon
  // eslint-disable-next-line import/no-internal-modules
} from '@sap-cloud-sdk/odata-common/internal';
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
export const length = filterFunctionsCommon.length;

/**
 * Export substring filter function for backwards compatibility.
 */
export const substring = filterFunctionsCommon.substring;

/**
 * OData v2 specific filter functions
 */
export const filterFunctions = {
  ...filterFunctionsCommon,
  substringOf,
  replace
};
