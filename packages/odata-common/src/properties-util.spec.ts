import { CommonEntity } from '../test/common-entity';
import { isNavigationProperty } from './properties-util';

describe('properties-util', () => {
  describe('isNavigationProperty', () => {
    it('returns true for one to one navigation property', () => {
      expect(isNavigationProperty('toSingleLink', CommonEntity)).toBe(true);
    });

    it('returns false for boolean property', () => {
      expect(isNavigationProperty('stringProperty', CommonEntity)).toBe(false);
    });
  });
});
