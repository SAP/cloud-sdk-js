import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';
import nock from 'nock';

describe('batch request', () => {
  const { batch, testEntityApi } = testService();
  const boundary = 'test-boundary';
  const getAllResponse = `--${boundary}
Content-Type: application/http
Content-Length: 3886
content-transfer-encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 3679
sap-metadata-last-modified: Wed, 22 Dec 2021 22:29:24 GMT
cache-control: no-store, no-cache
dataserviceversion: 2.0
    
{"d":{"results":[{"StringProperty":"4711"}]}}    
--${boundary}--
`;
  const baseUrl = 'https://some.sdk.test.url.com';

  it('executes a getAll request', async () => {
    nock(baseUrl)
      .post('/sap/opu/odata/sap/API_TEST_SRV/$batch')
      .reply(202, getAllResponse, {
        'content-type': `multipart/mixed; boundary=${boundary}`
      });
    const response = await batch(
      testEntityApi.requestBuilder().getAll()
    ).execute({ url: baseUrl });
    if (response[0].isReadResponse()) {
      const casted = response[0].as(testEntityApi);
      expect(casted[0].stringProperty).toEqual('4711');
    }
  }, 60000);
});
