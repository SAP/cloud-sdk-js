/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
export function flat<T>(arr: T[][]): T[] {
  return arr.reduce((flattened, subArr) => {
    flattened = [...flattened, ...subArr];
    return flattened;
  }, []);
}

/**
 * Remove all duplicates from array
 * @param words - Array of strings that might contain duplicates
 *
 * @returns Array of unique strings
 */
export function unique<T>(words: T[]): T[] {
  return Array.from(new Set(words));
}
