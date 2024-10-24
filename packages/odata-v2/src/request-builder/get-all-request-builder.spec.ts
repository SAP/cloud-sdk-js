import { ODataRequest } from '@sap-cloud-sdk/odata-common';
import nock from 'nock';
import {
  defaultDestination,
  unmockDestinationsEnv,
  createOriginalTestEntityData1,
  createOriginalTestEntityData2,
  defaultHost,
  defaultRequestHeaders
} from '../../../../test-resources/test/test-util';
import { testEntityApi } from '../../test/test-util';
import { GetAllRequestBuilder } from './get-all-request-builder';
import type { DefaultDeSerializers } from '../de-serializers';
import type { TestEntity } from '@sap-cloud-sdk/test-services-odata-v2/test-service';

describe('GetAllRequestBuilder', () => {
  let requestBuilder: GetAllRequestBuilder<TestEntity, DefaultDeSerializers>;

  afterEach(() => {
    unmockDestinationsEnv();
  });

  beforeEach(() => {
    requestBuilder = new GetAllRequestBuilder(testEntityApi);
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () => {
      const entityData1 = createOriginalTestEntityData1();
      const entityData2 = createOriginalTestEntityData2();
      const rawResponse = { d: { results: [entityData1, entityData2] } };
      // ///

      // const requestConfig = new ODataGetAllRequestConfig(
      //   testEntityApi,
      //   createODataUri(testEntityApi.deSerializers)
      // );
      // mockRequest(requestConfig, {
      //   responseBody: rawResponse,
      //   path: 'A_TestEntity',
      //   statusCode: 200,
      //   method: 'get',
      //   query: undefined
      // });

      // const request = new ODataRequest(requestConfig, defaultDestination);

      // mockHeaderRequest({ request, path: 'A_TestEntity' });

      nock('http://example.com')
        .head('/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity/')
        .reply(200, undefined, mockedBuildHeaderResponse);

      // console.log(
      //   'buildNockUrl(request.relativeServiceUrl()/A_TestEntity, false)',
      //   buildNockUrl(`${request.relativeServiceUrl()}/A_TestEntity`, false)
      // );

      nock('http://example.com', getRequestHeaders('get', undefined, undefined))
        .get('/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity', undefined)
        .query({})
        .delay(0)
        .reply(200, rawResponse, undefined);

      // ///

      const actual = await requestBuilder.executeRaw(defaultDestination);
      expect(actual.data).toEqual(rawResponse);
      expect(actual.request.method).toBe('GET');
    });
  });
});

export function buildNockUrl(
  relativeServiceUrl: string,
  endWithSlash = true
): string {
  if (relativeServiceUrl.startsWith('/')) {
    return `${relativeServiceUrl}${
      !relativeServiceUrl.endsWith('/') && endWithSlash ? '/' : ''
    }`;
  }

  return `/${relativeServiceUrl}${
    !relativeServiceUrl.endsWith('/') && endWithSlash ? '/' : ''
  }`;
}

const defaultCsrfToken = 'mocked-x-csrf-token';

const mockedBuildHeaderResponse = {
  'x-csrf-token': defaultCsrfToken,
  'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
};

export function mockHeaderRequest({
  request,
  host = defaultHost,
  responseHeaders = mockedBuildHeaderResponse,
  path
}: any) {
  return nock(host)
    .head(
      path
        ? buildNockUrl(`${request.relativeServiceUrl()}/${path}`)
        : buildNockUrl(request.relativeServiceUrl())
    )
    .reply(200, undefined, responseHeaders);
}

export function mockRequest(
  requestConfig,
  {
    host = defaultHost,
    destination = defaultDestination,
    path = '',
    statusCode = 200,
    delay = 0,
    additionalHeaders,
    method = 'get',
    body,
    query = {},
    responseBody,
    responseHeaders,
    headers
  }: any
) {
  const request = new ODataRequest(requestConfig, destination);

  mockHeaderRequest({ request, path });

  return nock(host, getRequestHeaders(method, additionalHeaders, headers))
    [method](
      path
        ? buildNockUrl(`${request.relativeServiceUrl()}/${path}`, false)
        : buildNockUrl(request.relativeServiceUrl()),
      body
    )
    .query(query)
    .delay(delay)
    .reply(statusCode, responseBody, responseHeaders);
}

function getRequestHeaders(
  method: string,
  additionalHeaders?: Record<string, any>,
  headers?: Record<string, any>
) {
  if (headers) {
    return { reqheaders: headers };
  }

  if (additionalHeaders) {
    const initialHeaders =
      method === 'get'
        ? defaultRequestHeaders
        : { ...defaultRequestHeaders, 'x-csrf-token': defaultCsrfToken };
    return { reqheaders: { ...initialHeaders, ...additionalHeaders } };
  }
}
