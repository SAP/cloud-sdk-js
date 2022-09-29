import {
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import {
  nonEnumerable,
  isNavigationProperty
} from '@sap-cloud-sdk/odata-common/internal';
const { testEntityApi } = testService();

describe('properties-util', () => {
  it('returns false for non-enumerable property', () => {
    nonEnumerable(TestEntity, '_entityName');
    expect(
      Object.getOwnPropertyDescriptor(TestEntity, '_entityName')?.enumerable
    ).toBeFalsy();
  });

  it('returns true for one to many navigation property ', () => {
    expect(isNavigationProperty('toMultiLink', testEntityApi.schema)).toBe(
      true
    );
  });
});
