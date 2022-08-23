import { testService } from '@sap-cloud-sdk/test-services-odata-v4/test-service';

describe('OData Client Service', () => {
  it('should contain schemas when having circular navigation properties', () => {
    const { testEntityCircularLinkParentApi } = testService();
    expect(
      testEntityCircularLinkParentApi.schema.TO_CHILDREN._linkedEntityApi.schema
        .TO_PARENT._linkedEntityApi.schema
    ).toBeTruthy();
  });
});
