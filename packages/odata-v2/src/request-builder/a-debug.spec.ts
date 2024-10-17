import {
  testFunctionImportGet,
  testFunctionImportPost,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import nock from 'nock';
import {
  BatchChangeSet,
  ODataCreateRequestConfig,
  ODataRequest
} from '@sap-cloud-sdk/odata-common';
import { createODataUri as createODataUriV2 } from '@sap-cloud-sdk/odata-v2/internal';
import {
  defaultDestination,
  defaultHost
} from '../../../../test-resources/test/test-util';
import { CreateRequestBuilder } from './create-request-builder';
import type { DefaultDeSerializers } from '../de-serializers';
const regexUuid = '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}';
const responseBoundary = 'responseBoundary';

describe('debug', () => {
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

  it('create', async () => {
    const requestConfig = new ODataCreateRequestConfig(
      testEntityApi,
      createODataUriV2(testEntityApi.deSerializers)
    );

    const request = new ODataRequest(requestConfig, defaultDestination);

    nock(defaultHost).head(`/${request.relativeServiceUrl()}`).reply(200);

    nock(defaultHost)
      .post(`/${request.relativeServiceUrl()}`)
      // .query({})
      // .delay(0)
      .reply(500, { d: undefined });

    const someEntity = testEntityApi.entityBuilder().stringProperty('').build();

    const createRequest = new CreateRequestBuilder(
      testEntityApi,
      someEntity
    ).execute(defaultDestination);

    await expect(createRequest).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Create request failed!"'
    );
  });
});
