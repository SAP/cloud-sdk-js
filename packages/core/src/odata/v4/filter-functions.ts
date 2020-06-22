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

/* Math Functions */
/**
 * Build a filter function to round a number. Evaluates to double or decimale.
 * @param num - The number to round. This can either be a number, a reference to a field or another filter function.
 * @param returnType - The return type to use.
 * @returns The newly created filter function
 */
export function round<EntityT extends Entity>(
  num: number | Field<EntityT> | NumberFilterFunction<EntityT>,
  returnType: 'double' | 'decimal' = 'double'
): NumberFilterFunction<EntityT> {
  return filterFunction('round', returnType, num);
}

/**
 * Build a filter function to floor a number. Evaluates to double or decimale.
 * @param num - The number to floor. This can either be a number, a reference to a field or another filter function.
 * @param returnType - The return type to use.
 * @returns The newly created filter function
 */
export function floor<EntityT extends Entity>(
  num: number | Field<EntityT> | NumberFilterFunction<EntityT>,
  returnType: 'double' | 'decimal' = 'double'
): NumberFilterFunction<EntityT> {
  return filterFunction('floor', returnType, num);
}

/**
 * Build a filter function to ceil a number. Evaluates to double or decimale.
 * @param num - The number to ceil. This can either be a number, a reference to a field or another filter function.
 * @param returnType - The return type to use.
 * @returns The newly created filter function
 */
export function ceiling<EntityT extends Entity>(
  num: number | Field<EntityT> | NumberFilterFunction<EntityT>,
  returnType: 'double' | 'decimal' = 'double'
): NumberFilterFunction<EntityT> {
  return filterFunction('ceiling', returnType, num);
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
