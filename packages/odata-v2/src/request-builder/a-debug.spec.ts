import nock from 'nock';
import axios from 'axios';

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

    // const someEntity = testEntityApi.entityBuilder().stringProperty('').build();

    // new CreateRequestBuilder(
    //   testEntityApi,
    //   someEntity
    // ).executeRaw(defaultDestination);

    const createRequest = axios.post(
      'http://example.com/sap/opu/odata/sap/API_TEST_SRV',
      {
        stringProperty: ''
      }
    );

    await expect(createRequest).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Request failed with status code 500"'
    );
  });
});
