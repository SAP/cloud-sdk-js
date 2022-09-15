import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { asc, desc } from '@sap-cloud-sdk/odata-common';
import { defaultDestination } from '../../../../test-resources/test/test-util/request-mocker';
const { testEntityApi } = testService();

describe('mock getAllRequestBuilders', () => {
  it('should set ascending order', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$orderby=ComplexTypeProperty/StringProperty%20asc';
    const request = await testEntityApi
      .requestBuilder()
      .getAll()
      .orderBy(asc(testEntityApi.schema.COMPLEX_TYPE_PROPERTY.stringProperty))
      .url(defaultDestination);
    expect(request).toBe(expected);
  });
  it('should set descending order', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$orderby=ComplexTypeProperty/StringProperty%20desc';
    const request = await testEntityApi
      .requestBuilder()
      .getAll()
      .orderBy(desc(testEntityApi.schema.COMPLEX_TYPE_PROPERTY.stringProperty))
      .url(defaultDestination);
    expect(request).toBe(expected);
  });
  it('should set ascending order when any order not specified', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$orderby=ComplexTypeProperty/StringProperty%20asc';
    const request = await testEntityApi
      .requestBuilder()
      .getAll()
      .orderBy(testEntityApi.schema.COMPLEX_TYPE_PROPERTY.stringProperty)
      .url(defaultDestination);
    expect(request).toBe(expected);
  });
});
