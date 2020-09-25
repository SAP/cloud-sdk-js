import { propertyExists, renameKeys } from '../src';

describe('propertyExists', () => {
  it('checks whether an object has a nested chain of properties', () => {
    expect(propertyExists({ a: { b: { c: 0 } } }, 'a')).toBe(true);
    expect(propertyExists({ a: { b: { c: 0 } } }, 'a', 'b')).toBe(true);
    expect(propertyExists({ a: { b: { c: 0 } } }, 'a', 'b', 'c')).toBe(true);
    expect(propertyExists({ a: { b: { c: 0 } } }, 'a', 'b', 'd')).toBe(false);
    expect(propertyExists({ a: { b: { c: 0 } } }, 'a', 'b', 'c', 'd')).toBe(
      false
    );
    expect(propertyExists({ a: { b: { c: 0 } } }, 'WRONG')).toBe(false);
  });

  it('returns true when no properties are passed', () => {
    expect(propertyExists({ a: 1 })).toBe(true);
  });
});

describe('renameKeys', () => {
  it('renames all defined keys as given in the mapping', () => {
    const input = {
      a: 1,
      b: 2
    };

    const expected = {
      A: 1,
      B: 2
    };

    expect(renameKeys({ a: 'A', b: 'B' }, input)).toEqual(expected);
  });

  it('leaves unmapped keys as-is', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3
    };

    const expected = {
      A: 1,
      B: 2,
      c: 3
    };

    expect(renameKeys({ a: 'A', b: 'B' }, input)).toEqual(expected);
  });

  it('mapped keys missing in the input are undefined in the output', () => {
    const input = {
      a: 1
    };

    const expected = {
      A: 1,
      B: undefined
    };

    expect(renameKeys({ a: 'A', b: 'B' }, input)).toEqual(expected);
  });
});
