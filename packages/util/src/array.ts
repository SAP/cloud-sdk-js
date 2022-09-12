/**
 * Flatten a two dimensional array into a one dimensional array.
 * @param arr - The array to be flattened.
 * @returns A one dimensional array.
 */
export function flat<T>(arr: T[][]): T[] {
  return arr.reduce((flattened, subArr) => [...flattened, ...subArr], []);
}

/**
 * Remove all duplicates from an array.
 * @param arr - Array that might contain duplicates.
 * @returns Array of unique items.
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Get the last item from an array. Returns `undefined`, if the array is empty.
 * @param arr - Array to get the last item of.
 * @returns Last item of the array or `undefined`, if the array was empty.
 */
export function last<T>(arr: T[]): T | undefined {
  return arr.length ? arr[arr.length - 1] : undefined;
}

/**
 * Get the first item from an array. Returns `undefined`, if the array is empty.
 * @param arr - Array to get the first item of.
 * @returns Fist item of the array or `undefined`, if the array was empty.
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Split the given array in chunks.
 * @param arr - Array to be split into chunks.
 * @param chunkSize - Size of the chunks.
 * @returns Two dimensional array with arrays of length chunkSize. The last subarray could be shorter.
 */
export function splitInChunks<T>(arr: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  if (arr) {
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
  }
  return chunks;
}

/**
 * We want to provide methods which accept a variable single number of elements and arrays.
 * The overloaded signature to achieve this is:
 * ```
 * function doSomething(array: T[])
 * function doSomething(...varArgs: T[])
 * function doSomething(first: undefined | T | T[], ...rest: T[]) {
 *   //implementation
 * }
 * ```
 * This wrapper methods makes it easy build an array from the input.
 * @param firstOrArray - Either an array, the first element of the var args or `undefined`, if no argument was given.
 * @param rest - Second to last element, if var args were used, empty array, if the first argument is an array.
 * @returns Array from the input or empty array if no input was given.
 * @deprecated This method should be replaced by `transformVariadicArgumentToArray`.
 */
export function variadicArgumentToArray<T>(
  firstOrArray: undefined | T | T[],
  rest: T[]
): T[] {
  return transformVariadicArgumentToArray(firstOrArray, rest);
}

/**
 * We want to provide methods which accept a variable single number of elements and arrays.
 * The overloaded signature to achieve this is:
 * ```
 * function doSomething(array: T[])
 * function doSomething(...varArgs: T[])
 * function doSomething(first: undefined | T | T[], ...rest: T[]) {
 *   //implementation
 * }
 * ```
 * This wrapper methods makes it easy build an array from the input.
 * @param firstOrArray - Either an array, the first element of the var args or `undefined`, if no argument was given.
 * @param rest - Second to last element, if var args were used, empty array, if the first argument is an array.
 * @returns Array from the input or empty array if no input was given.
 */
export function transformVariadicArgumentToArray<T>(
  firstOrArray: undefined | T | T[],
  rest: T[]
): T[] {
  if (Array.isArray(firstOrArray)) {
    return [...firstOrArray, ...rest];
  }
  return firstOrArray ? [firstOrArray, ...rest] : [...rest];
}

/**
 * Flattens a array: [1,[2,[3,4]],5] will become [1,2,3,4,5].
 * Non primitive values are copied by reference.
 * @param input - Array to be flattened.
 * @returns The flattened array.
 */
export const flatten = (input: any[]): any[] => {
  const flatResult: any[] = [];
  const stack: any[] = [...input];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!Array.isArray(current)) {
      flatResult.push(current);
    } else {
      stack.push(...current);
    }
  }

  return flatResult.reverse();
};

/**
 * Merge two arrays by alternately adding inserting values from both arrays, starting from the left.
 * @example `zip([1, 2], [3, 4, 5, 6])` results in `[1, 3, 2, 4, 5, 6]`.
 * @param left - Array to start alternately merging from.
 * @param right - Second array to merge.
 * @returns Zipped array.
 */
export function zip<T>(left: T[], right: T[]): T[] {
  const longerArr = left.length > right.length ? left : right;
  return longerArr.reduce((zipped, _, i) => {
    const currentZipped: T[] = [];
    if (left.length > i) {
      currentZipped.push(left[i]);
    }
    if (right.length > i) {
      currentZipped.push(right[i]);
    }
    return [...zipped, ...currentZipped];
  }, []);
}

/**
 * Split an array into two based on a condition.
 * @param arr - Array to partition.
 * @param condition - Function to determine to where to put each item.
 * @returns A two dimensional array containing two arrays, where the first one includes all items where the given condition was met and the second one includes all items where it was not met.
 */
export function partition<T>(
  arr: T[],
  condition: (item: T) => boolean
): [T[], T[]] {
  return arr.reduce(
    ([conditionTrue, conditionFalse]: [T[], T[]], item) =>
      condition(item)
        ? [[...conditionTrue, item], conditionFalse]
        : [conditionTrue, [...conditionFalse, item]],
    [[], []]
  );
}

/**
 * Filter an array by removing duplicates and keeping the left most occurrence. By default this compares by identity.
 * @param arr - Array to remove duplicates from.
 * @param comparator - Optional comparator function, indicating whether two items are equal and therefore handled as duplicates. Defaults to identity.
 * @returns A filtered array containing no duplicates.
 */
export function filterDuplicates<T>(
  arr: T[],
  comparator: (left: T, right: T) => boolean = (left, right) => left === right
): T[] {
  return arr.filter(
    (item, index) =>
      !arr.slice(0, index).find(filteredItem => comparator(item, filteredItem))
  );
}

/**
 * Filter an array by removing duplicates and keeping the right most occurrence. By default this compares by identity.
 * @param arr - Array to remove duplicates from.
 * @param comparator - Optional comparator function, indicating whether two items are equal and therefore handled as duplicates. Defaults to identity.
 * @returns A filtered array containing no duplicates.
 */
export function filterDuplicatesRight<T>(
  arr: T[],
  comparator: (left: T, right: T) => boolean = (left, right) => left === right
): T[] {
  return filterDuplicates(arr.reverse(), comparator).reverse();
}
