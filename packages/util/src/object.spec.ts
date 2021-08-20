import {
  assoc,
  pick,
  propertyExists,
  renameKeys,
  toSanitizedObject,
  pickIgnoreCase,
  pickValueIgnoreCase,
  pickNonNullish,
  mergeLeftIgnoreCase,
  mergeIgnoreCase,
  exclude
} from './object';

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

  it('picks elements from an object', () => {
    const input = { a: 1, b: 2, c: 3, d: 4 };
    expect(pick(['a', 'd'], input)).toEqual({ a: 1, d: 4 });
  });

  it('picks elements ignoring non existing keys', () => {
    const input = { a: 1, b: 2, c: 3, d: 4 };
    expect(pick(['a', 'f'], input)).toEqual({ a: 1 });
  });

  it('picks elements also with falsy values', () => {
    const input = { a: 1, b: 2, c: undefined, d: 0 };
    expect(pick(['a', 'c', 'd'], input)).toEqual({ a: 1, c: undefined, d: 0 });
  });

  it('assoc elements to an object', () => {
    const input = { a: 1, b: 2 };
    const expected = { a: 1, b: 2, c: 3 };
    expect(assoc('c', 3, input)).toEqual(expected);
  });
});

describe('toSanitizedObject', () => {
  it('creates simple header object', () => {
    expect(toSanitizedObject('key', 'value')).toEqual({ key: 'value' });
  });

  it('creates empty header object for nullish value', () => {
    expect(toSanitizedObject('key', null)).toEqual({});
  });

  it('creates empty header object for nullish key', () => {
    expect(toSanitizedObject(null as any, 'value')).toEqual({});
  });
});

describe('pickIgnoreCase', () => {
  const header = { key: 'value' };
  const customHeaders = { ...header, differentKey: 'differentValue' };
  it('finds a header for an equal key', () => {
    expect(pickIgnoreCase(customHeaders, 'key')).toEqual(header);
  });

  it('finds a header for an equal key in a different case', () => {
    expect(pickIgnoreCase(customHeaders, 'KEY')).toEqual(header);
  });

  it('returns an empty object for no equal keys', () => {
    expect(pickIgnoreCase(customHeaders, 'nonExistentKey')).toEqual({});
  });

  it('picks the given keys', () => {
    expect(
      pickIgnoreCase({ A: 'a', b: 'b', c: 'c', e: 'e' }, 'a', 'B', 'c', 'd')
    ).toEqual({ A: 'a', b: 'b', c: 'c' });
  });
});

describe('pickValueIgnoreCase', () => {
  const value = 'value';
  const customHeaders = { key: value };
  it('finds a value for an equal key', () => {
    expect(pickValueIgnoreCase(customHeaders, 'key')).toEqual(value);
  });

  it('finds a value for an equal key in a different case', () => {
    expect(pickValueIgnoreCase(customHeaders, 'KEY')).toEqual(value);
  });

  it('returns undefined for different equal keys', () => {
    expect(pickValueIgnoreCase(customHeaders, 'differentKey')).toBeUndefined();
  });
});

describe('exclude', () => {
  it('picks elements from an object without keys', () => {
    const input = { a: 1, b: 2, c: 3, d: 4 };
    expect(exclude(['b', 'c'], input)).toEqual({ a: 1, d: 4 });
  });

  it('picks elements ignoring non existing keys', () => {
    const input = { a: 1, b: 2, c: 3, d: 4 };
    expect(exclude(['b', 'd', 'f'], input)).toEqual({ a: 1, c: 3 });
  });

  it('picks elements also with falsy values', () => {
    const input = { a: 1, b: 2, c: undefined, d: 0 };
    expect(exclude(['b'], input)).toEqual({ a: 1, c: undefined, d: 0 });
  });
});

it('pickNonNullish removes null and undefined values from object', () => {
  const notNullish = {
    false: false,
    emptyString: '',
    zero: 0
  };

  const nullish = {
    null: null,
    undefined
  };
  expect(pickNonNullish({ ...notNullish, ...nullish })).toEqual(notNullish);
});

it('mergeLeftIgnoreCase returns an object with replaced duplicate keys', () => {
  const value = 'value';
  const customValue = 'customValue';
  const headers = {
    equalDuplicateKey: value,
    differentCaseDuplicateKey: value,
    nonDuplicateKey: value
  };

  const customHeaders = {
    equalDuplicateKey: customValue,
    DifferentCaseDuplicateKey: customValue,
    additionalCustomKey: customValue
  };

  expect(mergeLeftIgnoreCase(headers, customHeaders)).toEqual({
    equalDuplicateKey: customValue,
    DifferentCaseDuplicateKey: customValue,
    nonDuplicateKey: value
  });
});

it('mergeIgnoreCase merges headers with custom headers', () => {
  expect(
    mergeIgnoreCase(
      {
        a: 'a',
        B: 'B'
      },
      { b: 'b', c: 'c' }
    )
  ).toEqual({ a: 'a', b: 'b', c: 'c' });
});
