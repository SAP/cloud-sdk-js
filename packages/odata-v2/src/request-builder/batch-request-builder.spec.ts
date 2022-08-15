import {
  testFunctionImportGet,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import nock from 'nock';
const boundary = 'test-boundary';
jest.mock('uuid', () => ({
  v4: jest.fn(() => boundary)
}));

describe('batch request', () => {
  const { batch, testEntityApi, functionImports } = testService();

  const header = `Content-Type: application/http
Content-Length: 3886
content-transfer-encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 3679
sap-metadata-last-modified: Wed, 22 Dec 2021 22:29:24 GMT
cache-control: no-store, no-cache
dataserviceversion: 2.0`;

  const getAllResponse = `--${boundary}
${header}

{"d":{"results":[{"StringProperty":"4711"}]}}
--${boundary}--
`;

  const functionImportResponse = `--${boundary}
${header}

{"d": {"TestFunctionImportGET":"MyText"}}
--${boundary}--
`;

  const baseUrl = 'https://some.sdk.test.url.com';

  it('batch works with funciton imports', async () => {
    const body = [
      `--batch_${boundary}`,
      'Content-Type: application/http',
      'Content-Transfer-Encoding: binary',
      '',
      'GET /sap/opu/odata/sap/API_TEST_SRV/TestFunctionImportGET HTTP/1.1',
      'Content-Type: application/json',
      'Accept: application/json',
      '',
      '',
      `--batch_${boundary}--`,
      ''
    ].join('\r\n');

    const bodl =
      '--batch_test-boundary\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nGET /sap/opu/odata/sap/API_TEST_SRV/TestFunctionImportGET HTTP/1.1\r\nContent-Type: application/json\r\nAccept: application/json\r\n\r\n\r\n--batch_test-boundary--\r\n';
    nock(baseUrl)
      .post('/sap/opu/odata/sap/API_TEST_SRV/$batch', body)
      .reply(202, functionImportResponse, {
        'content-type': `multipart/mixed; boundary=${boundary}`
      });
    const response = await batch(
      functionImports.testFunctionImportGet({} as any)
    ).execute({ url: baseUrl });
    if (response[0].isReadResponse()) {
      const casted = testFunctionImportGet({} as any).responseTransformer(
        response[0].body
      );
      expect(casted).toEqual('MyText');
    }
    jest.restoreAllMocks();
  });

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
