import { createLogger } from '@sap-cloud-sdk/util';
import {
  getCollectionResult,
  getLinkedCollectionResult,
  getSingleResult,
  isCollectionResult
} from './response-data-accessor';

describe('response data accessor', () => {
  const logger = createLogger('response-data-accessor');
  const warnSpy = jest.spyOn(logger, 'warn');

  afterEach(() => {
    warnSpy.mockClear();
  });

  describe('getCollectionResult', () => {
    it('gets data for collection', () => {
      const results = [1, 2];
      expect(getCollectionResult({ d: { results } })).toEqual(results);
    });

    it('gets empty array for non-collection', () => {
      expect(getCollectionResult({ d: { results: 1 } })).toEqual([]);
    });

    it('gets empty array for wrong format', () => {
      expect(getCollectionResult({ d: [1, 2] })).toEqual([]);
    });

    it('logs warning for wrong format', () => {
      getCollectionResult({ d: { results: 1 } });
      expect(warnSpy).toHaveBeenCalledWith(
        'The given response data does not have the standard OData v2 format for collections.'
      );
    });
  });

  describe('isCollectionResult', () => {
    it('returns true for results array', () => {
      expect(isCollectionResult({ d: { results: [] } })).toBe(true);
    });

    it('returns false for result single value', () => {
      expect(isCollectionResult({ d: { results: 'test' } })).toBe(false);
    });

    it('returns false for wrong format', () => {
      expect(isCollectionResult({ d: { test: 'test' } })).toBe(false);
    });
  });

  describe('getSingleResult', () => {
    it('returns single result for correct format', () => {
      const d = { a: 'b' };
      expect(getSingleResult({ d })).toEqual(d);
    });

    it('returns empty object for wrong format', () => {
      expect(getSingleResult({ c: 'test' })).toEqual({});
    });

    it('logs warning for wrong format', () => {
      getSingleResult({ c: 'test' });
      expect(warnSpy).toHaveBeenCalledWith(
        'The given response data does not have the standard OData v2 format for single results.'
      );
    });

    it('returns single result for collection result format', () => {
      const d = { a: 'b' };
      expect(getSingleResult({ d: { results: d } })).toEqual(d);
    });

    it('logs warning for collection result format', () => {
      getSingleResult({ d: { results: { a: 'b' } } });
      expect(warnSpy).toHaveBeenCalledWith(
        'The given response data has the format for collections instead of the standard OData v2 format for single results.'
      );
    });
  });

  describe('getLinkedCollectionResult', () => {
    it('returns data for wrapped data (OData v2 spec)', () => {
      expect(getLinkedCollectionResult({ results: ['a', 'b', 'c'] })).toEqual([
        'a',
        'b',
        'c'
      ]);
    });

    it('returns data for non wrapped data (OData v2 C4C)', () => {
      expect(getLinkedCollectionResult(['a', 'b', 'c'])).toEqual([
        'a',
        'b',
        'c'
      ]);
    });

    it('returns empty array as fallback', () => {
      expect(getLinkedCollectionResult({ a: 'b' })).toEqual([]);
    });
  });
});
