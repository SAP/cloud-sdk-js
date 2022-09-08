import { isNullish } from './nullish';

/**
 * Checks whether the keys and values of two objects are equal.
 * @param obj1 - The first object.
 * @param obj2 - The second object.
 * @returns A boolean, indicating whether the two objects are equal to each other.
 */
export function equalObjects(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  const keys1 = Object.keys(obj1);
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    keys1.every(key => equal(obj1[key], obj2[key]))
  );
}

/**
 * Checks whether the two items contain the same content.
 * When both of them are arrays, the elements and the order are checked, see {@link equalArrays}.
 * When both of them are objects, the key/value pairs are checked, see {@link equalObjects}.
 * In other cases, triple equals is used.
 * @param item1 - The first item.
 * @param item2 - The second item.
 * @returns A boolean, indicating all the items equal to each other.
 */
export function equal<T>(item1: T, item2: T): boolean {
  if (Array.isArray(item1) && Array.isArray(item2)) {
    return equalArrays(item1 as any[], item2 as any[]);
  }
  if (
    typeof item1 === 'object' &&
    typeof item2 === 'object' &&
    !isNullish(item1) &&
    !isNullish(item2)
  ) {
    return equalObjects(item1, item2);
  }
  return item1 === item2;
}

/**
 * Checks whether the elements of two arrays are the same with the same order.
 * @param arr1 - The first array.
 * @param arr2 - The second array.
 * @returns A boolean, indicating both arrays have the same contents.
 */
export function equalArrays<T>(arr1: T[], arr2: T[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((item1, i) => equal(item1, arr2[i]))
  );
}
