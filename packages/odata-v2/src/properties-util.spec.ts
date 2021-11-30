import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import { isNavigationProperty } from '@sap-cloud-sdk/odata-common/dist/properties-util';

describe('properties-util', () => {
  it('returns true for one to many navigation property', () => {
    expect(isNavigationProperty('toMultiLink', TestEntity)).toBe(true);
  });
});
