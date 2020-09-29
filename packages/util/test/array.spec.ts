/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { flat, unique, last, first, splitInChunks } from '../src';

/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
describe('array', () => {
  describe('flat', () => {
    it('flattens a nested array of numbers', () => {
      expect(flat([[1], [2], [3]])).toStrictEqual([1, 2, 3]);
    });

    it('flattens a nested array of strings', () => {
      expect(flat([['1'], ['2'], ['3']])).toStrictEqual(['1', '2', '3']);
    });

    it('returns an empty array for empty arrays', () => {
      expect(flat([])).toStrictEqual([]);
    });
  });

  describe('unique', () => {
    it('returns unique items', () => {
      const uniqueItems = [0, false, '', undefined, null, 1, 'test'];
      expect(unique([...uniqueItems, ...uniqueItems])).toStrictEqual(
        uniqueItems
      );
    });

    it('returns an empty array for empty arrays', () => {
      expect(unique([])).toStrictEqual([]);
    });
  });

  describe('last', () => {
    it('returns the last item', () => {
      expect(last([true, false])).toStrictEqual(false);
    });

    it('returns the last item when there is only one element', () => {
      expect(last([false])).toStrictEqual(false);
    });

    it('returns undefined for empty arrays', () => {
      expect(last([])).toBeUndefined();
    });
  });

  describe('first', () => {
    it('returns the first item', () => {
      expect(first([false, true])).toStrictEqual(false);
    });

    it('returns the first item when there is only one element', () => {
      expect(first([false])).toStrictEqual(false);
    });

    it('returns undefined for empty arrays', () => {
      expect(first([])).toBeUndefined();
    });
  });

  describe('splitInChunks', () => {
    it('returns empty if undefined or empty', () => {
      expect(splitInChunks(undefined!, 1)).toEqual([]);
      expect(splitInChunks([], 1)).toEqual([]);
    });

    it('should split if chunk size is greater than the array', () => {
      expect(splitInChunks([1, 2, 3], 4)).toEqual([[1, 2, 3]]);
    });

    it('should split the array in chunks', () => {
      expect(splitInChunks([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7]
      ]);
    });
  });
});
