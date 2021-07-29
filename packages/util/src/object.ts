import { isNullish } from './nullish';

/**
 * Checks if a chain of properties exists on the given object.
 *
 * @param obj - The object to be checked.
 * @param properties - Chained properties.
 * @returns True if the property chain leads to a truthy value, false otherwise.
 */
export function propertyExists(
  obj: Record<string, any>,
  ...properties: string[]
): boolean {
  if (!properties.length) {
    return true;
  }
  if (obj && obj.hasOwnProperty(properties[0])) {
    return propertyExists(obj[properties[0]], ...properties.slice(1));
  }
  return false;
}

/**
 * Adds the value to the object if it is neither null nor undefined.
 * Note that this is different to JS idiomatic checks for truthy/falsy values, i.e. an empty string will result in key/value pairs beeing added.
 *
 * @deprecated This will be removed in version 2.0 of the SDK.
 *
 * @param key - The key to associate with the given value.
 * @param value - The value to associate with the given key.
 * @param obj - The object on which to create the association.
 * @returns A copy of the input object with the new key-value pair if the value is neither null nor undefined.
 */
export const assocSome =
  <T>(key: string, value?: any) =>
  (obj: T): T => {
    if (typeof value !== 'undefined' && value !== null) {
      return assoc(key, value, obj);
    }
    return { ...obj };
  };

/**
 * Merges the two objects, if second object is neither null nor undefined.
 * If a key exists on a and b the value from b is taken
 *
 * @deprecated This will be removed in version 2.0 of the SDK.
 *
 * @param a - The object to merge into.
 * @param b - The object which to merge into a.
 * @returns A copy of the merge(a, b) or a if b is undefined or null.
 */
export const mergeSome = (
  a: Record<string, any>,
  b?: Record<string, any>
): Record<string, any> => {
  if (typeof b !== 'undefined' && b !== null) {
    return { ...a, ...b };
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
export const renameKeys = (
  keyMapping: Record<string, string>,
  obj: Record<string, any>
): Record<string, any> => {
  const unchangedEntries = Object.keys(obj)
    .filter(k => !Object.keys(keyMapping).includes(k))
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});
  return Object.entries(keyMapping).reduce(
    (newObj, [oldKey, newKey]) => ({ ...newObj, [newKey]: obj[oldKey] }),
    unchangedEntries
  );
};
/**
 * Create a shallow copy of the given object, that contains the given keys.
 * Non existing keys in the source object are ignored.
 *
 * @param keys - properties to be selected
 * @param obj - object from which the values are taken
 * @returns an object with the selected keys and corresponding values.
 */
export const pick = <T>(keys: string[], obj: T): Partial<T> => {
  const result = {};
  keys.forEach(key => {
    const value = obj[key];
    if (Object.keys(obj).includes(key)) {
      result[key] = value;
    }
  });
  return result;
};

/**
 * Create a shallow copy of the given object, that does not contain the given keys.
 * Non existing keys in the source object are ignored.
 *
 * @param keys - properties to be selected
 * @param obj - object from which the values are taken
 * @returns an object with the selected keys and corresponding values.
 */
export const exclude = <T>(keys: string[], obj: T): Partial<T> => {
  const result = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (!keys.includes(key)) {
      result[key] = value;
    }
  });
  return result;
};

/**
 * Adds a key value pair to the given objects and returns a shallow copy.
 * If the key is already present it will be overwritten.
 *
 * @param key - key to be added
 * @param value - value to be added
 * @param obj - object the key value pair is added to.
 * @returns the object with the key value pair added
 */
export const assoc = <T>(
  key: string,
  value: any,
  obj: T
): T & { [key: string]: any } => ({
  ...obj,
  [key]: value
});

/**
 * Create an object based on the given key and value if neither key nor value are nullish.
 *
 * @param key - Name of the header.
 * @param value - Value of the header.
 * @returns - An object containing the given key and value of an empty object.
 */
export function toSanitizedObject(
  key: string,
  value: any
): Record<string, any> {
  return isNullish(key) || isNullish(value) ? {} : { [key]: value };
}

/**
 * Create a shallow copy of the given object, that contains the given keys, independent of casing.
 * Non existing keys in the source object are ignored.
 *
 * @param obj - Object to pick the given key from.
 * @param keys - Keys of the pair to be picked.
 * @returns - An object containing the given key-value pairs in its original case or an empty object if none of them are found.
 */
export function pickIgnoreCase<T extends Record<string, any>>(
  obj: T = {} as T,
  ...keys: string[]
): Partial<Pick<T, typeof keys[number]>> {
  return keys.reduce((filteredHeaders, providedKey) => {
    const originalKey = Object.keys(obj).find(
      objKey => objKey.toLowerCase() === providedKey.toLowerCase()
    );

    return {
      ...filteredHeaders,
      ...(originalKey && { [originalKey]: obj[originalKey] })
    };
  }, {});
}

/**
 * Returns the value of an object based on the given key, independent of casing.
 *
 * @param obj - Object to be searched for the given key.
 * @param key - Key of the value to pick.
 * @returns The value of for the given key or undefined if not available.
 */
export function pickValueIgnoreCase<T extends Record<string, any>>(
  obj: T = {} as T,
  key: string
): any | undefined {
  return Object.values(pickIgnoreCase(obj, key))[0];
}

/**
 * Create a shallow copy of the given object, that contains all entries with non-nullish values.
 *
 * @param obj - An object to pick from.
 * @returns - A filtered object containing only keys with non-nullish values.
 */
export function pickNonNullish<T extends Record<string, any>>(
  obj: T = {} as T
): Partial<T> {
  return Object.entries(obj)
    .filter(([key, value]) => !isNullish(key) && !isNullish(value))
    .reduce((filtered, [key, value]) => ({ ...filtered, [key]: value }), {});
}

/**
 * Create an object by merging the `right` object into a shallow copy of the `left` object ignoring casing, but keeping the `right` casing. Only keys present in the `left` object will be present in the merged object.
 *
 * @param left - Object to merge into. They keys of this object will be present in the returned object.
 * @param right - Object to merge. Only keys in `left` will be considered for merging.
 * @returns - An object containing all keys from the `left` object, where entries present in the `right` object are replaced. Note that the casing used by `right` will be used.
 */
export function mergeLeftIgnoreCase<
  LeftT extends Record<string, any>,
  RightT extends Record<string, any>
>(
  left: LeftT = {} as LeftT,
  right: RightT = {} as RightT
): Record<string, any> {
  return Object.entries(left)
    .map(([key, value]) =>
      pickValueIgnoreCase(right, key)
        ? pickIgnoreCase(right, key)
        : { [key]: value }
    )
    .reduce((replaced, obj) => ({ ...replaced, ...obj }), {});
}

/**
 * Create an object by merging the `right` object into a shallow copy of the `left` object ignoring casing, but keeping the right casing. Keys present both objects will be present in the merged object.
 * @param left - Object to merge.
 * @param right - Object to merge. The casing of the keys of this object takes precedence.
 * @returns - An object containing all keys from both objects, where entries present in the `right` object are replaced. Note that the casing used by `right` will be used.
 */
export function mergeIgnoreCase<
  LeftT extends Record<string, any>,
  RightT extends Record<string, any>
>(
  left: LeftT = {} as LeftT,
  right: RightT = {} as RightT
): Record<string, any> {
  return {
    ...mergeLeftIgnoreCase(left, right),
    ...right
  };
}
