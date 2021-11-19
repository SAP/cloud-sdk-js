import nock = require('nock');
import {
  Constructable,
  ODataCreateRequestConfig,
  ODataDeleteRequestConfig,
  ODataGetAllRequestConfig,
  ODataRequest,
  ODataUpdateRequestConfig
} from '@sap-cloud-sdk/odata-common/internal';
import { oDataUri as oDataUriV2 } from '@sap-cloud-sdk/odata-v2/internal';
import { oDataUri as oDataUriV4 } from '@sap-cloud-sdk/odata-v4/internal';
import { TestEntity as TestEntityV2 } from '@sap-cloud-sdk/test-services/v2/test-service';
import { TestEntity as TestEntityV4 } from '@sap-cloud-sdk/test-services/v4/test-service';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';

export const defaultHost = 'http://localhost';
const defaultCsrfToken = 'mocked-x-csrf-token';

const mockedBuildHeaderResponse = {
  'x-csrf-token': defaultCsrfToken,
  'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
};

export const defaultBasicCredentials = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';

export const defaultRequestHeaders = {
  authorization: defaultBasicCredentials,
  cookie: 'mocked-cookie-0;mocked-cookie-2',
  'content-type': 'application/json',
  accept: 'application/json',
  'sap-client': '123'
};

export const defaultDestinationName = 'Testination';

export const defaultDestination: Destination = {
  name: defaultDestinationName,
  url: '/testination',
  username: 'username',
  password: 'password',
  sapClient: '123',
  authTokens: [],
  originalProperties: {}
};

export function mockDestinationsEnv(...destinations) {
  process.env.destinations = JSON.stringify([...destinations]);
}

export function unmockDestinationsEnv() {
  delete process.env.destinations;
}

interface MockRequestParams {
  host?: string;
  destination?: Destination;
  path?: string;
  statusCode?: number;
  additionalHeaders?: Record<string, any>;
  body?: Record<string, any>;
  responseBody?: Record<string, any>;
  responseHeaders?: Record<string, any>;
  query?: Record<string, any>;
  method?: string;
}

export function mockCreateRequest(
  params: MockRequestParams,
  entityConstructor = TestEntityV2
) {
  const requestConfig = new ODataCreateRequestConfig(
    entityConstructor,
    oDataUriV2
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 200,
    method: params.method || 'post',
    responseBody: { d: params.responseBody || params.body }
  });
}

export function mockCreateRequestV4(
  params: MockRequestParams,
  entityConstructor = TestEntityV4
) {
  const requestConfig = new ODataCreateRequestConfig(
    entityConstructor,
    oDataUriV4
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 200,
    method: params.method || 'post',
    responseBody: params.responseBody
  });
}

export function mockDeleteRequest(
  params: MockRequestParams,
  entityConstructor = TestEntityV2
) {
  const requestConfig = new ODataDeleteRequestConfig(
    entityConstructor,
    oDataUriV2
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 202,
    method: params.method || 'delete'
  });
}

export function mockUpdateRequest(
  params: MockRequestParams,
  entityConstructor: Constructable<any> = TestEntityV2
) {
  const requestConfig = new ODataUpdateRequestConfig(
    entityConstructor,
    oDataUriV2
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 204,
    method: params.method || 'patch'
  });
}

export function mockGetRequest(
  params: MockRequestParams,
  entityConstructor: Constructable<any> = TestEntityV2
) {
  const requestConfig = new ODataGetAllRequestConfig(
    entityConstructor,
    oDataUriV2
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 200,
    method: params.method || 'get',
    query: { $format: 'json', ...params.query }
  });
}

interface MockHeaderRequestParams {
  request;
  host?: string;
  responseHeaders?: Record<string, any>;
  path?: string;
}

export function mockHeaderRequest({
  request,
  host = defaultHost,
  responseHeaders = mockedBuildHeaderResponse,
  path
}: MockHeaderRequestParams) {
  return nock(host)
    .head(path ? `${request.serviceUrl()}/${path}` : request.serviceUrl())
    .reply(200, undefined, responseHeaders);
}

export function mockRequest(
  requestConfig,
  {
    host = defaultHost,
    destination = defaultDestination,
    path = '',
    statusCode = 200,
    additionalHeaders,
    method = 'get',
    body,
    query = {},
    responseBody,
    responseHeaders
  }: MockRequestParams
) {
  const request = new ODataRequest(requestConfig, destination);

  mockHeaderRequest({ request, path });

  return nock(host, getRequestHeaders(method, additionalHeaders))
    [method](
      path ? `${request.serviceUrl()}/${path}` : request.resourceUrl(),
      body
    )
    .query(query)
    .reply(statusCode, responseBody, responseHeaders);
}

function getRequestHeaders(
  method: string,
  additionalHeaders?: Record<string, any>
) {
  if (additionalHeaders) {
    const initialHeaders =
      method === 'get'
        ? defaultRequestHeaders
        : { ...defaultRequestHeaders, 'x-csrf-token': defaultCsrfToken };
    return { reqheaders: { ...initialHeaders, ...additionalHeaders } };
  }
}

export function mockCsrfTokenRequest(
  host: string,
  sapClient: string,
  servicePath = '/sap/opu/odata/sap/API_TEST_SRV',
  username = 'username',
  password = 'password',
  csrfToken = 'CSRFTOKEN'
) {
  nock(host, {
    reqheaders: {
      authorization: basicHeader(username, password),
      'x-csrf-token': 'Fetch',
      'sap-client': sapClient
    }
  })
    .get(servicePath)
    .reply(200, '', {
      'x-csrf-token': csrfToken,
      'Set-Cookie': ['key1=val1', 'key2=val2', 'key3=val3']
    });
}
