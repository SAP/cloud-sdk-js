import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';

describe('OData Client Service', () => {
  it('should contain schemas in nested apis', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { testEntityApi, testEntityMultiLinkApi } = testService();
    expect(
      testEntityApi.schema?.TO_MULTI_LINK._linkedEntityApi.schema.TO_MULTI_LINK
        ._linkedEntityApi.schema.STRING_PROPERTY
    ).toBeTruthy();
  });
});
