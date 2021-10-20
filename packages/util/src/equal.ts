import { isNullish } from './nullish';
// eslint-disable-next-line valid-jsdoc
/**
 * hidden
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

// eslint-disable-next-line valid-jsdoc
/**
 * hidden
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

// eslint-disable-next-line valid-jsdoc
/**
 * hidden
 */
export function equalArrays<T>(arr1: T[], arr2: T[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((item1, i) => equal(item1, arr2[i]))
  );
}
