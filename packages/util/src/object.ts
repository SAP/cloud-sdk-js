/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { assoc, merge } from 'rambda';
import { MapType } from './types';

/**
 * Checks if a chain of properties exists on the given object.
 *
 * @param obj - The object to be checked.
 * @param properties - Chained properties.
 * @returns True if the property chain leads to a truthy value, false otherwise.
 */
export function propertyExists(obj: object, ...properties: string[]): boolean {
  if (!properties.length) {
    return true;
  }
  if (obj && obj.hasOwnProperty(properties[0])) {
    return propertyExists(obj[properties[0]], ...properties.slice(1));
  }
  return false;
}

/**
 * Calls rambda's assoc function if the provided value is neither null nor undefined.
 * Note that this is different to JS idiomatic checks for truthy/falsy values, i.e. an empty string will result in assoc being called.
 *
 * @param key - The key to associate with the given value.
 * @param value - The value to associate with the given key.
 * @param obj - The object on which to create the association.
 * @returns A copy of the input object with the new key-value pair if the value is neither null nor undefined.
 */
export const assocSome = <T>(key: string, value?: any) => (obj: T): T => {
  if (typeof value !== 'undefined' && value !== null) {
    return assoc(key, value)(obj);
  }
  return obj;
};

/**
 * Calls rambda's merge function if second object is neither null nor undefined.
 *
 * @param a - The object to merge into.
 * @param b - The object which to merge into a.
 * @returns A copy of the merge(a, b) or a if b is undefined or null.
 */
export const mergeSome = (a: MapType<any>, b?: MapType<any>) => {
  if (typeof b !== 'undefined' && b !== null) {
    return merge(a, b);
  }
  return a;
};

/**
 * Takes an object and returns a new object whose keys are renamed according to the provided key mapping.
 * Any keys in the input object not present in the key mapping will be present in the output object as-is.
 * If a key in the key mapping is not present in the input object, the output object will contain the key with value "undefined".
 *
 * @param keyMapping - An object mapping keys of the input object to keys of the output object.
 * @param obj - The input object.
 * @returns An object with renamed keys.
 */
export const renameKeys = (keyMapping: MapType<string>, obj: MapType<any>): MapType<any> => {
  const unchangedEntries = Object.keys(obj)
    .filter(k => !Object.keys(keyMapping).includes(k))
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});
  return Object.entries(keyMapping).reduce((newObj, [oldKey, newKey]) => ({ ...newObj, [newKey]: obj[oldKey] }), unchangedEntries);
};
