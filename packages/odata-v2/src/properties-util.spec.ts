import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';
import { isNavigationProperty } from '@sap-cloud-sdk/odata-common/dist/properties-util';

describe('properties-util', () => {
  it('returns true for one to many navigation property', () => {
    const { testEntityApi } = testService();
    expect(isNavigationProperty('toMultiLink', testEntityApi.schema)).toBe(
      true
    );
  });
});
