import { testService } from '@sap-cloud-sdk/test-services-odata-v4/test-service'

describe('OData Client Service', () =>{
  it('should contain schemas in nested apis', ()=>{
    const {
      testEntityCircularLinkSelfApi
    } = testService();
    expect(testEntityCircularLinkSelfApi.schema).toBeTruthy();
  });
});
