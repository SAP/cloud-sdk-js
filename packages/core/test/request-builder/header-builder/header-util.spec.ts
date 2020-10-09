import {
  toSanitizedHeaderObject,
  getHeader,
  getHeaderValue,
  filterNullishValues,
  replaceDuplicateKeys,
  mergeHeaders,
  getHeaders
} from '../../../src';

describe('Header-builder:', () => {
  describe('toSanitizedHeaderObject', () => {
    it('creates simple header object', () => {
      expect(toSanitizedHeaderObject('key', 'value')).toEqual({ key: 'value' });
    });

    it('creates empty header object for nullish value', () => {
      expect(toSanitizedHeaderObject('key', null)).toEqual({});
    });

    it('creates empty header object for nullish key', () => {
      expect(toSanitizedHeaderObject(null as any, 'value')).toEqual({});
    });
  });

  describe('getHeader', () => {
    const header = { key: 'value' };
    const customHeaders = { ...header, differentKey: 'differentValue' };
    it('finds a header for an equal key', () => {
      expect(getHeader('key', customHeaders)).toEqual(header);
    });

    it('finds a header for an equal key in a different case', () => {
      expect(getHeader('KEY', customHeaders)).toEqual(header);
    });

    it('returns an empty object for no equal keys', () => {
      expect(getHeader('nonExistentKey', customHeaders)).toEqual({});
    });
  });

  it('getHeaders picks the given keys', () => {
    expect(
      getHeaders(['a', 'B', 'c', 'd'], { A: 'a', b: 'b', c: 'c', e: 'e' })
    ).toEqual({ A: 'a', b: 'b', c: 'c' });
  });

  describe('getHeaderValue', () => {
    const value = 'value';
    const customHeaders = { key: value };
    it('finds a value for an equal key', () => {
      expect(getHeaderValue('key', customHeaders)).toEqual(value);
    });

    it('finds a value for an equal key in a different case', () => {
      expect(getHeaderValue('KEY', customHeaders)).toEqual(value);
    });

    it('returns undefined for different equal keys', () => {
      expect(getHeaderValue('differentKey', customHeaders)).toBeUndefined();
    });
  });

  it('filterNullishValues removes null and undefined values from object', () => {
    const notNullish = {
      false: false,
      emptyString: '',
      zero: 0
    };

    const nullish = {
      null: null,
      undefined
    };
    expect(filterNullishValues({ ...notNullish, ...nullish })).toEqual(
      notNullish
    );
  });

  it('replaceDuplicateKeys returns an object with replaced duplicate keys', () => {
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

    expect(replaceDuplicateKeys(headers, customHeaders)).toEqual({
      equalDuplicateKey: customValue,
      DifferentCaseDuplicateKey: customValue,
      nonDuplicateKey: value
    });
  });

  it('mergeHeaders merges headers with custom headers', () => {
    expect(
      mergeHeaders(
        {
          a: 'a',
          B: 'B'
        },
        { b: 'b', c: 'c' }
      )
    ).toEqual({ a: 'a', b: 'b', c: 'c' });
  });
});
