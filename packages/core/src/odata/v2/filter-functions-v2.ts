/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Field, StringFilterFunction, BooleanFilterFunction } from '../common';
import { filterFunction } from '../common/filter/filter-function';
import { filterFunctions as filterFunctionsCommon } from '../common/filter/filter-functions';
import { EntityV2 } from './entity-v2';

/* String Functions */
/**
 * Build a filter function to test whether a string is a substring of the other. Evaluates to boolean.
 * @param substr - The substring to test for. This can either be a string, a reference to a field or another filter function.
 * @param str - The string to test. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function substringOf<EntityT extends EntityV2>(
  substr: string | Field<EntityT> | StringFilterFunction<EntityT>,
  str: string | Field<EntityT> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('substringof', 'boolean', substr, str);
}

/**
 * Build a filter function to replace the occurence of a search string with another string. Evaluates to string.
 * @param str - The string to get the index from. This can either be a string, a reference to a field or another filter function.
 * @param searchStr - The substring to get the index for. This can either be a string, a reference to a field or another filter function.
 * @param replaceStr - The substring to get the index for. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function replace<EntityT extends EntityV2>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>,
  searchStr: string | Field<EntityT> | StringFilterFunction<EntityT>,
  replaceStr: string | Field<EntityT> | StringFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('replace', 'string', str, searchStr, replaceStr);
}

/**
 *  @hidden
 * Export length filter function for backwards compatibility.
 */
export const length = filterFunctionsCommon.length;

/**
 *  @hidden
 * Export substring filter function for backwards compatibility.
 */
export const substring = filterFunctionsCommon.substring;

/**
 * OData v2 specific filter functions
 */
export const filterFunctionsV2 = {
  ...filterFunctionsCommon,
  substringOf,
  replace
};

export { filterFunctionsV2 as filterFunctions };
