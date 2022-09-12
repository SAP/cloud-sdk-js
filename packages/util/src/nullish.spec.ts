import { isNullish } from './nullish';

describe('nullish', () => {
  it('returns true for undefined', () => {
    expect(isNullish(undefined)).toBe(true);
  });

  it('returns true for null', () => {
    expect(isNullish(null)).toBe(true);
  });

  it('returns false for false', () => {
    expect(isNullish(false)).toBe(false);
  });

  it('returns false for 0', () => {
    expect(isNullish(0)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isNullish('')).toBe(false);
  });
});
