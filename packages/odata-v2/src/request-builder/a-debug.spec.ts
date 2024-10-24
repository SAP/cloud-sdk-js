import nock from 'nock';
import { defaultDestination } from '../../../../test-resources/test/test-util';
import { testEntityApi } from '../../test/test-util';
import { CreateRequestBuilder } from './create-request-builder';

describe('debug', () => {
  it('create', async () => {
    nock('http://example.com')
      .head('/sap/opu/odata/sap/API_TEST_SRV')
      .reply(200);

    nock('http://example.com')
      .post('/sap/opu/odata/sap/API_TEST_SRV')
      .query({})
      .delay(0)
      .reply(500, { d: undefined });

    const someEntity = testEntityApi.entityBuilder().stringProperty('').build();

    const createRequest = new CreateRequestBuilder(testEntityApi, someEntity)
      // .skipCsrfTokenFetching()
      .executeRaw(defaultDestination);

    // axios.post(
    //   'http://example.com/sap/opu/odata/sap/API_TEST_SRV',
    //   {
    //     stringProperty: ''
    //   },
    //   {
    //     headers: {
    //       'content-type': 'application/json',
    //       accept: 'application/json',
    //       authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
    //       'sap-client': '123'
    //     }
    //   }
    // );

    await expect(createRequest).rejects.toThrowErrorMatchingInlineSnapshot(
      '"post request to http://example.com/sap/opu/odata/sap/API_TEST_SRV failed! "'
    );
  });
});
