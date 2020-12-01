import {
  flat,
  flatten,
  unique,
  last,
  first,
  splitInChunks,
  variadicArgumentToArray
} from './array';

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

  it('flattens a object', () => {
    const input = [1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    expect(flatten(input)).toEqual(expected);
  });

  it('can flatten empty or simple objects', () => {
    expect(flatten([])).toEqual([]);
    expect(flatten([1])).toEqual([1]);
  });

  describe('variadic arguments', () => {
    function functionVariadicArguments(...varargs: string[]);
    function functionVariadicArguments(array: string[]);
    function functionVariadicArguments(
      firstOrArray: undefined | string | string[],
      ...rest: string[]
    ): string[] {
      return variadicArgumentToArray(firstOrArray, rest);
    }

    it('returns empty array if nothing is given', () => {
      expect(functionVariadicArguments()).toEqual([]);
      expect(functionVariadicArguments([])).toEqual([]);
    });

    it('wraps variadic arguments', () => {
      expect(functionVariadicArguments('a')).toEqual(['a']);
      expect(functionVariadicArguments('a', 'b')).toEqual(['a', 'b']);
    });

    it('wraps array arguments', () => {
      expect(functionVariadicArguments(['a'])).toEqual(['a']);
      expect(functionVariadicArguments(['a', 'b'])).toEqual(['a', 'b']);
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
