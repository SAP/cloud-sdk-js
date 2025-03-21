import {
  testFunctionImportGet,
  testFunctionImportPost,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import nock from 'nock';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common';
import type { DefaultDeSerializers } from '../de-serializers';
const regexUuid = '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}';
const responseBoundary = 'responseBoundary';

describe('batch request', () => {
  const { batch, testEntityApi, operations } = testService();

  const getHeader = contentType => `Content-Type: ${contentType}
Content-Length: 3886
content-transfer-encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 3679
sap-metadata-last-modified: Wed, 22 Dec 2021 22:29:24 GMT
cache-control: no-store, no-cache
dataserviceversion: 2.0`;

  const getAllResponse = `--${responseBoundary}
${getHeader('application/http')}

{"d":{"results":[{"StringProperty":"4711"}]}}
--${responseBoundary}--
`;

  const functionImportResponse = `--${responseBoundary}
${getHeader('application/http')}

{"d": {"TestFunctionImportGET":"MyText"}}

--${responseBoundary}--
`;

  const postResponse = `--${responseBoundary}
${getHeader('multipart/mixed; boundary=batchId')}

--batchId
--partId
HTTP/1.1 200 OK

{"d": {"TestFunctionImportPOST":true}}
--batchId

--${responseBoundary}--
`;

  const baseUrl = 'https://some.sdk.test.url.com';

  it('batch works with function imports', async () => {
    const body = [
      `--batch_${regexUuid}`,
      'Content-Type: application/http',
      'Content-Transfer-Encoding: binary',
      '',
      'GET /sap/opu/odata/sap/API_TEST_SRV/TestFunctionImportGET HTTP/1.1',
      'Content-Type: application/json',
      'Accept: application/json',
      '',
      '',
      `--batch_${regexUuid}--`,
      ''
    ].join('\r\n');

    nock(baseUrl)
      .post('/sap/opu/odata/sap/API_TEST_SRV/$batch', new RegExp(body))
      .reply(202, functionImportResponse, {
        'content-type': `multipart/mixed; boundary=${responseBoundary}`
      });
    const response = await batch(
      operations.testFunctionImportGet({} as any)
    ).execute({ url: baseUrl });
    expect(response[0].isReadResponse()).toBeTruthy();
    if (response[0].isReadResponse()) {
      const casted = testFunctionImportGet({} as any).responseTransformer(
        response[0].body
      );
      expect(casted).toEqual('MyText');
    }
  });

  it('batch works with POST function imports', async () => {
    const body = [
      `--batch_${regexUuid}`,
      `Content-Type: multipart/mixed; boundary=changeset_${regexUuid}`,
      '',
      `--changeset_${regexUuid}`,
      'Content-Type: application/http',
      'Content-Transfer-Encoding: binary',
      `Content-Id: ${regexUuid}`,
      '',
      "POST /sap/opu/odata/sap/API_TEST_SRV/TestFunctionImportPOST\\?SimpleParam='someValue' HTTP/1.1",
      'Content-Type: application/json',
      'Accept: application/json',
      '',
      '',
      '',
      `--changeset_${regexUuid}--`,
      `--batch_${regexUuid}--`,
      ''
    ].join('\r\n');
    nock(baseUrl)
      .post('/sap/opu/odata/sap/API_TEST_SRV/$batch', new RegExp(body))
      .reply(202, postResponse, {
        'content-type': `multipart/mixed; boundary=${responseBoundary}`
      });

    const requestBuilder = testFunctionImportPost({
      simpleParam: 'someValue'
    });
    const changeSet = new BatchChangeSet<DefaultDeSerializers>([
      requestBuilder
    ]);
    const response = await batch(changeSet).execute({ url: baseUrl });
    expect(response[0].isWriteResponses()).toBeTruthy();
    if (response[0].isWriteResponses()) {
      const casted = testFunctionImportPost({} as any).responseTransformer(
        response[0].responses[0].body
      );
      expect(casted).toBe(true);
    }
  });

  it('executes a getAll request', async () => {
    nock(baseUrl)
      .post('/sap/opu/odata/sap/API_TEST_SRV/$batch')
      .reply(202, getAllResponse, {
        'content-type': `multipart/mixed; boundary=${responseBoundary}`
      });
    const response = await batch(
      testEntityApi.requestBuilder().getAll()
    ).execute({ url: baseUrl });
    expect(response[0].isReadResponse()).toBeTruthy();
    if (response[0].isReadResponse()) {
      const casted = response[0].as(testEntityApi);
      expect(casted[0].stringProperty).toEqual('4711');
    }
  });
});
