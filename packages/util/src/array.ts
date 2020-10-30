/**
 * Flatten a two dimensional array into a one dimensional array
 * @param arr The array to be flattened.
 * @returns A one dimensional array.
 */
export function flat<T>(arr: T[][]): T[] {
  return arr.reduce((flattened, subArr) => [...flattened, ...subArr], []);
}

/**
 * Remove all duplicates from array
 * @param arr - Array that might contain duplicates
 * @returns Array of unique items
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Get the last item from an array. Returns undefined if the array is empty.
 * @param arr - Array to get the last item of
 * @returns Last item of the array or undefined if the array was empty
 */
export function last<T>(arr: T[]): T | undefined {
  return arr.length ? arr[arr.length - 1] : undefined;
}

/**
 * Get the first item from an array. Returns undefined if the array is empty.
 * @param arr - Array to get the first item of
 * @returns Fist item of the array or undefined if the array was empty
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Split the given array in chunks
 * @param arr - Array to be splitted. The last aray could be shorter.
 * @param chunkSize - Size of the chunks
 * @returns Array with arrays of chunks size.
 */
export function splitInChunks<T>(arr: T[], chunkSize: number): T[][] {
  let result: T[][] = [];
  if (arr) {
    for (let i = 0; i < arr.length; i += chunkSize) {
      result = [...result, arr.slice(i, i + chunkSize)];
    }
  }
  return result;
}

/**
 * We want to provide methods which accept a variable single number of elements and arrays.
 * The overloaded signature to achieve this is:
 * function doSomething(array:T[])
 * function doSomething(...varArgs:T[])
 * functiondoSomething(first:undefined|T|T[],...rest:T[]){
 *   //implementation
 * }
 * This wrapper methods makes it easy build an array from the input.
 * @param firstOrArray - Either an array or the first element of the var args.
 * @param rest - Second to last element if var args were used, undefined otherwise.
 * @returns Array from the input or undefined if no var args was given.
 */
export function variableArgumentToArray<T>(
  firstOrArray: undefined | T | T[],
  rest: T[]
): T[] {
  if (typeof firstOrArray === 'undefined') {
    return [];
  }
  if (Array.isArray(firstOrArray)) {
    return firstOrArray;
  }
  return [firstOrArray, ...rest];
}
