import { equal, equalArrays, equalObjects } from './equal';
describe('equal', () => {
  describe('equal', () => {
    it('returns true for same values', () => {
      expect(equal(1, 1)).toBe(true);
      expect(equal(undefined, undefined)).toBe(true);
      expect(equal(null, null)).toBe(true);
      expect(equal('', '')).toBe(true);
    });

    it('returns false for different values', () => {
      expect(equal(1, 2)).toBe(false);
      expect(equal(undefined, null)).toBe(false);
      expect(equal(null, '')).toBe(false);
      expect(equal(null, { a: 'a', b: 'b' })).toBe(false);
      expect(equal('1', 1 as any)).toBe(false);
    });

    it('returns true for equal nested arrays', () => {
      expect(equal([[1, 2]], [[1, 2]])).toBe(true);
    });
    it('returns true for equal nested objects', () => {
      expect(equal([[1, { a: 'a' }]], [[1, { a: 'a' }]])).toBe(true);
    });

    it('returns false for differing nested array and object', () => {
      expect(equal([[1, 2]], [{ 1: 1, 2: 2 }])).toBe(false);
    });
  });

  describe('equalArrays', () => {
    it('returns true for empty arrays', () => {
      expect(equalArrays([], [])).toBe(true);
    });

    it('returns true for equal arrays', () => {
      expect(equalArrays([1, 2], [1, 2])).toBe(true);
    });

    it('returns false for different arrays', () => {
      expect(equalArrays([1], [2])).toBe(false);
    });
  });

  describe('equalObjects', () => {
    it('returns true for empty objects', () => {
      expect(equalObjects({}, {})).toBe(true);
    });

    it('returns true for equal objects', () => {
      expect(equalObjects({ a: 'a', b: 'b' }, { a: 'a', b: 'b' })).toBe(true);
    });

    it('returns false for different objects', () => {
      expect(equalObjects({ a: 'a', b: 'b' }, { a: 'a', b: 'c' })).toBe(false);
      expect(equalObjects({ a: 'a', b: 'b' }, { a: 'a', c: 'b' })).toBe(false);
    });
  });
});
