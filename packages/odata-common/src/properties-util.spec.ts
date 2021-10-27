import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import { isNavigationProperty } from './properties-util';

describe('properties-util', () => {
  describe('isNavigationProperty', () => {
    it('returns true for one to one navigation property', () => {
      expect(isNavigationProperty('toSingleLink', TestEntity)).toBe(true);
    });

    it('returns true for one to many navigation property', () => {
      expect(isNavigationProperty('toMultiLink', TestEntity)).toBe(true);
    });

    it('returns false for boolean property', () => {
      expect(isNavigationProperty('booleanProperty', TestEntity)).toBe(false);
    });
  });
});
