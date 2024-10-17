import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import nock from 'nock';
import {
  ODataCreateRequestConfig,
  ODataRequest
} from '@sap-cloud-sdk/odata-common';
import { createODataUri as createODataUriV2 } from '@sap-cloud-sdk/odata-v2/internal';
import {
  defaultDestination,
  defaultHost
} from '../../../../test-resources/test/test-util';
import { CreateRequestBuilder } from './create-request-builder';
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
