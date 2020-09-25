import { flat, unique, last, first } from '../src';
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
});
