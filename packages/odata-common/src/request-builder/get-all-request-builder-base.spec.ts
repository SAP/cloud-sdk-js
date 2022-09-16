import { testService as testServiceV2 } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { testService as testServiceV4 } from "@sap-cloud-sdk/test-services-odata-v4/test-service";
import { asc, desc } from '@sap-cloud-sdk/odata-common';
import { defaultDestination } from '../../../../test-resources/test/test-util/request-mocker';
const { testEntityApi: testEntityApiV2 } = testServiceV2();
const { testEntityApi: testEntityApiV4 } = testServiceV4();

const testEntitySchema = testEntityApiV2.schema;

describe('mock getAllRequestBuilders', () => {
  it('should set ascending order', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$orderby=ComplexTypeProperty/StringProperty%20asc';
    const request = await testEntityApiV2
      .requestBuilder()
      .getAll()
      .orderBy(asc(testEntityApiV2.schema.COMPLEX_TYPE_PROPERTY.stringProperty))
      .url(defaultDestination);
    expect(request).toBe(expected);
  });
  it('should set descending order', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$orderby=ComplexTypeProperty/StringProperty%20desc';
    const request = await testEntityApiV2
      .requestBuilder()
      .getAll()
      .orderBy(desc(testEntityApiV2.schema.COMPLEX_TYPE_PROPERTY.stringProperty))
      .url(defaultDestination);
    expect(request).toBe(expected);
  });
  it('should set ascending order when any order not specified', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$orderby=ComplexTypeProperty/StringProperty%20asc';
    const request = await testEntityApiV2
      .requestBuilder()
      .getAll()
      .orderBy(testEntityApiV2.schema.COMPLEX_TYPE_PROPERTY.stringProperty)
      .url(defaultDestination);
    expect(request).toBe(expected);
  });
  it('v4', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$orderby=ComplexTypeProperty/StringProperty%20asc';
    const request = await testEntityApiV4
      .requestBuilder()
      .getAll()
      .orderBy(testEntityApiV4.schema.COMPLEX_TYPE_PROPERTY.stringProperty)
      .url(defaultDestination)
    expect(request).toBe(expected);
  });
});
