/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  Field,
  StringFilterFunction,
  BooleanFilterFunction,
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
export function contains<EntityT extends Entity>(
  substr: string | Field<EntityT> | StringFilterFunction<EntityT>,
  str: string | Field<EntityT> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('contains', 'bool', substr, str);
}

/**
 * Build a filter function to test whether a string matches a pattern. Evaluates to string.
 * @param str - The string to get the index from. This can either be a string, a reference to a field or another filter function.
 * @param regex - The pattern to test against. This shoult be a regular expression as a string.
 * @returns The newly created filter function
 */
export function matchesPattern<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>,
  regex: string
): BooleanFilterFunction<EntityT> {
  return filterFunction('matchesPattern', 'bool', str, regex);
}

export * from '../common/filter/filter-functions';
