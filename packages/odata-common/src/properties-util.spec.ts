import { CommonEntityApi } from '../test/common-entity';
import { isNavigationProperty } from './properties-util';

describe('isNavigationProperty', () => {
  it('returns true for one to one navigation property', () => {
    expect(
      isNavigationProperty('toSingleLink', new CommonEntityApi().schema)
    ).toBe(true);
  });

  it('returns false for boolean property', () => {
    expect(
      isNavigationProperty('stringProperty', new CommonEntityApi().schema)
    ).toBe(false);
  });
});
