import nock from 'nock';
import {
  ODataCreateRequestConfig,
  ODataDeleteRequestConfig,
  ODataGetAllRequestConfig,
  ODataRequest,
  ODataUpdateRequestConfig
} from '@sap-cloud-sdk/odata-common/internal';
import { createODataUri as createODataUriV2 } from '@sap-cloud-sdk/odata-v2/internal';
import { createODataUri as createODataUriV4 } from '@sap-cloud-sdk/odata-v4/internal';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import type {
  HttpDestination,
  Destination
} from '@sap-cloud-sdk/connectivity/internal';
import type {
  EntityApi,
  EntityBase,
  GetAllRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';

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

export const defaultDestination: HttpDestination = {
  name: defaultDestinationName,
  url: 'http://example.com',
  username: 'username',
  password: 'password',
  sapClient: '123',
  authTokens: [],
  originalProperties: {}
};

export const defaultHost = defaultDestination.url;

export function mockDestinationsEnv(...destinations) {
  process.env.destinations = JSON.stringify([...destinations]);
}

export function unmockDestinationsEnv() {
  delete process.env.destinations;
}

interface MockRequestParams {
  host?: string;
  destination?: HttpDestination;
  path?: string;
  statusCode?: number;
  additionalHeaders?: Record<string, any>;
  body?: Record<string, any>;
  responseBody?: Record<string, any>;
  responseHeaders?: Record<string, any>;
  query?: Record<string, any>;
  method?:
    | 'get'
    | 'post'
    | 'put'
    | 'head'
    | 'patch'
    | 'merge'
    | 'delete'
    | 'options';

  headers?: Record<string, any>;
  delay?: number;
}

export function mockCreateRequest<T extends EntityApi<EntityBase, any>>(
  params: MockRequestParams,
  entityApi: T
) {
  const requestConfig = new ODataCreateRequestConfig(
    entityApi,
    createODataUriV2(entityApi.deSerializers)
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 200,
    method: params.method || ('post' as const),
    responseBody: { d: params.responseBody || params.body }
  });
}

export function mockCreateRequestV4<T extends EntityApi<EntityBase, any>>(
  params: MockRequestParams,
  entityApi: T
) {
  const requestConfig = new ODataCreateRequestConfig(
    entityApi,
    createODataUriV4(entityApi.deSerializers)
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 200,
    method: params.method || 'post',
    responseBody: params.responseBody
  });
}

export function mockDeleteRequest<T extends EntityApi<EntityBase, any>>(
  params: MockRequestParams,
  entityApi: T
) {
  const requestConfig = new ODataDeleteRequestConfig(
    entityApi,
    createODataUriV2(entityApi.deSerializers)
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 202,
    method: params.method || 'delete'
  });
}

export function mockUpdateRequest<T extends EntityApi<EntityBase, any>>(
  params: MockRequestParams,
  entityApi: T
) {
  const requestConfig = new ODataUpdateRequestConfig(
    entityApi,
    createODataUriV2(entityApi.deSerializers)
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 204,
    method: params.method || 'patch'
  });
}

export function mockCountRequest(
  destination: Destination,
  count: number,
  getAllRequest: GetAllRequestBuilderBase<EntityBase, any>
) {
  const basePath = getAllRequest._entityApi.entityConstructor._defaultBasePath;
  const entityName = getAllRequest._entityApi.entityConstructor._entityName;
  return nock(defaultHost)
    .get(`${basePath}/${entityName}/$count`)
    .reply(200, count.toString());
}

export function mockGetRequest<T extends EntityApi<EntityBase, any>>(
  params: MockRequestParams,
  entityApi: T
) {
  const requestConfig = new ODataGetAllRequestConfig(
    entityApi,
    createODataUriV2(entityApi.deSerializers)
  );
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 200,
    method: params.method || 'get',
    query: params.query
  });
}

interface MockHeaderRequestParams {
  request;
  host?: string;
  responseHeaders?: Record<string, any>;
  path?: string;
}

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

export function mockHeaderRequest({
  request,
  host = defaultHost,
  responseHeaders = mockedBuildHeaderResponse,
  path
}: MockHeaderRequestParams) {
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
  }: MockRequestParams
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

export function mockCsrfTokenRequest(
  host: string,
  sapClient: string,
  basePath = '/sap/opu/odata/sap/API_TEST_SRV',
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
    .get(basePath)
    .reply(200, '', {
      'x-csrf-token': csrfToken,
      'Set-Cookie': ['key1=val1', 'key2=val2', 'key3=val3']
    });
}
