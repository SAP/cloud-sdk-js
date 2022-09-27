import {
  CommonEntity,
  commonEntityApi
} from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { nonEnumerable, isNavigationProperty } from './properties-util';

describe('isNavigationProperty', () => {
  it('returns false for non-enumerable property', () => {
    nonEnumerable(CommonEntity, '_entityName');
    expect(
      Object.getOwnPropertyDescriptor(CommonEntity, '_entityName')?.enumerable
    ).toBeFalsy();
  });

  it('returns true for one to one navigation property', () => {
    expect(isNavigationProperty('toSingleLink', commonEntityApi.schema)).toBe(
      true
    );
  });

  it('returns true for one to many navigation property ', () => {
    expect(isNavigationProperty('toMultiLink', commonEntityApi.schema)).toBe(
      true
    );
  });

  it('returns false for string property', () => {
    expect(isNavigationProperty('stringProperty', commonEntityApi.schema)).toBe(
      false
    );
  });
});
