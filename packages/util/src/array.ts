/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
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
