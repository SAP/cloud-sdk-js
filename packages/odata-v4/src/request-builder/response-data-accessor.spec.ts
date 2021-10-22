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
      const value = [1, 2];
      expect(getCollectionResult({ value })).toEqual(value);
    });

    it('gets empty array for non-collection', () => {
      expect(getCollectionResult({ value: 1 })).toEqual([]);
    });

    it('gets empty array for wrong format', () => {
      expect(getCollectionResult({ d: [1, 2] })).toEqual([]);
    });

    it('logs warning for wrong format', () => {
      getCollectionResult({ d: { results: 1 } });
      expect(warnSpy).toHaveBeenCalledWith(
        'The given response data does not have the standard OData v4 format for collections.'
      );
    });
  });

  describe('isCollectionResult', () => {
    it('returns true for results array', () => {
      expect(isCollectionResult({ value: [] })).toBe(true);
    });

    it('returns false for result single value', () => {
      expect(isCollectionResult({ value: 'test' })).toBe(false);
    });

    it('returns false for wrong format', () => {
      expect(isCollectionResult({ d: { test: 'test' } })).toBe(false);
    });
  });

  describe('getSingleResult', () => {
    it('returns single result for correct format', () => {
      const result = { a: 'b' };
      expect(getSingleResult(result)).toEqual(result);
    });

    it('returns empty object for wrong format', () => {
      expect(getSingleResult('test')).toEqual({});
    });

    it('logs warning for wrong format', () => {
      getSingleResult(false);
      expect(warnSpy).toHaveBeenCalledWith(
        'The given response data does not have the standard OData v4 format for single results.'
      );
    });
  });

  describe('getLinkedCollectionResult', () => {
    it('returns data', () => {
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
