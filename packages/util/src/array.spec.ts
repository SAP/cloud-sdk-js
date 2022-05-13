import {
  flat,
  flatten,
  unique,
  last,
  first,
  splitInChunks,
  transformVariadicArgumentToArray,
  zip,
  partition,
  filterDuplicates,
  filterDuplicatesRight
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
      return transformVariadicArgumentToArray(firstOrArray, rest);
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

describe('zip', () => {
  it('zips two arrays where left is longer than right', () => {
    expect(zip([1, 2, 3, 4], [5, 6])).toEqual([1, 5, 2, 6, 3, 4]);
  });

  it('zips two arrays where right is longer than left', () => {
    expect(zip([1, 2], [3, 4, 5, 6])).toEqual([1, 3, 2, 4, 5, 6]);
  });

  it('zips two arrays when the second is empty', () => {
    expect(zip(['test', 'test'], [])).toEqual(['test', 'test']);
  });

  it('zips two arrays of the same length', () => {
    expect(zip([1, 3], [2, 4])).toEqual([1, 2, 3, 4]);
  });

  it('zips falsy values', () => {
    expect(zip([0, null, false], [undefined])).toEqual([
      0,
      undefined,
      null,
      false
    ]);
  });
});

describe('partition', () => {
  it('partitions empty array', () => {
    expect(partition([], () => false)).toStrictEqual([[], []]);
  });

  it('partitions array based on value', () => {
    expect(partition([true, false, false, true], i => i)).toStrictEqual([
      [true, true],
      [false, false]
    ]);
  });
});

describe('filterDuplicates', () => {
  it('can handle empty array', () => {
    expect(filterDuplicates([])).toEqual([]);
  });

  it('removes duplicates using the default comparator', () => {
    expect(filterDuplicates([1, 2, 1, 4])).toEqual([1, 2, 4]);
  });

  it('removes duplicates using a custom comparator', () => {
    expect(
      filterDuplicates(
        [{ a: 1, b: 1 }, { a: 2 }, { a: 1, b: 2 }, { a: 4 }],
        (left, right) => left.a === right.a
      )
    ).toEqual([{ a: 1, b: 1 }, { a: 2 }, { a: 4 }]);
  });
});

describe('filterDuplicatesRight', () => {
  it('can handle empty array', () => {
    expect(filterDuplicatesRight([])).toEqual([]);
  });

  it('removes duplicates using the default comparator', () => {
    expect(filterDuplicatesRight([1, 2, 1, 4])).toEqual([2, 1, 4]);
  });

  it('removes duplicates using a custom comparator', () => {
    expect(
      filterDuplicatesRight(
        [{ a: 1, b: 1 }, { a: 2 }, { a: 1, b: 2 }, { a: 4 }],
        (left, right) => left.a === right.a
      )
    ).toEqual([{ a: 2 }, { a: 1, b: 2 }, { a: 4 }]);
  });
});
