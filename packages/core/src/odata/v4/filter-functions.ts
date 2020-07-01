/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Moment } from 'moment';
import {
  Field,
  StringFilterFunction,
  BooleanFilterFunction,
  NumberFilterFunction
} from '../common';
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
  substr: string | Field<EntityT> | StringFilterFunction<EntityT>,
  str: string | Field<EntityT> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('contains', 'bool', substr, str);
}

/**
 * Build a filter function to test whether a string matches a pattern. Evaluates to boolean.
 * @param str - The string to get the index from. This can either be a string, a reference to a field or another filter function.
 * @param regex - The pattern to test against. This should be a regular expression as a string.
 * @returns The newly created filter function
 */
export function matchesPattern<EntityT extends Entity>(
  str: string | Field<EntityT> | StringFilterFunction<EntityT>,
  regex: string
): BooleanFilterFunction<EntityT> {
  return filterFunction('matchesPattern', 'bool', str, regex);
}

/* Date Functions */
/**
 * Build a filter function to get the fractional seconds of a date. Evaluates to decimal.
 * @param date - The date to get the fractional seconds for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function fractionalSeconds<EntityT extends Entity>(
  date: Moment | Field<EntityT>
): NumberFilterFunction<EntityT> {
  return filterFunction('fractionalseconds', 'decimal', date);
}

/**
 * Build a filter function to get the signed number of minutes in the time zone offset. Evaluates to int.
 * @param date - The date to get the offset minutes for. This can either be a date (Moment) or a reference to a field.
 * @returns The newly created filter function
 */
export function totalOffsetMinutes<EntityT extends Entity>(
  date: Moment | Field<EntityT>
): NumberFilterFunction<EntityT> {
  return filterFunction('totaloffsetminutes', 'decimal', date);
}

/**
 * Build a filter function to get the latest possible point in time. Evaluates to DateTimeOffset.
 * @returns The newly created filter function
 */
export function maxDateTime<EntityT extends Entity>(): NumberFilterFunction<
  EntityT
> {
  return filterFunction('maxdatetime', 'decimal');
}

/**
 * Build a filter function to get the earliest possible point in time. Evaluates to DateTimeOffset.
 * @returns The newly created filter function
 */
export function minDateTime<EntityT extends Entity>(): NumberFilterFunction<
  EntityT
> {
  return filterFunction('mindatetime', 'decimal');
}

/**
 * Build a filter function to get the current point in time. Evaluates to DateTimeOffset.
 * @returns The newly created filter function
 */
export function now<EntityT extends Entity>(): NumberFilterFunction<EntityT> {
  return filterFunction('now', 'decimal');
}

/**
 * TODO: totalseconds, time
 */

export * from '../common/filter/filter-functions';
