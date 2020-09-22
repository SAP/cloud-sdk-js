/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock = require('nock');
import { MapType } from '@sap-cloud-sdk/util';
import { basicHeader, Constructable, Destination, oDataUriV2 } from '../../src';
import { ODataCreateRequestConfig } from '../../src/odata/common/request/odata-create-request-config';
import { ODataDeleteRequestConfig } from '../../src/odata/common/request/odata-delete-request-config';
import { ODataGetAllRequestConfig } from '../../src/odata/common/request/odata-get-all-request-config';
import { ODataRequest } from '../../src/odata/common/request/odata-request';
import { ODataUpdateRequestConfig } from '../../src/odata/common/request/odata-update-request-config';
import { oDataUriV4 } from '../../src/odata/v4/uri-conversion/odata-uri';
import { TestEntity } from './test-services/v2/test-service/TestEntity';
import { TestEntity as TestEntityV4 } from './test-services/v4/test-service/TestEntity';

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
  additionalHeaders?: MapType<any>;
  body?: MapType<any>;
  responseBody?: MapType<any>;
  responseHeaders?: MapType<any>;
  query?: MapType<any>;
  method?: string;
}

export function mockCreateRequest(
  params: MockRequestParams,
  entityConstructor = TestEntity
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
  entityConstructor = TestEntity
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
  entityConstructor: Constructable<any> = TestEntity
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
  entityConstructor: Constructable<any> = TestEntity
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
  responseHeaders?: MapType<any>;
}

export function mockHeaderRequest({
  request,
  host = defaultHost,
  responseHeaders = mockedBuildHeaderResponse
}: MockHeaderRequestParams) {
  return nock(host)
    .get(request.serviceUrl())
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

  mockHeaderRequest({ request });

  return nock(host, getRequestHeaders(method, additionalHeaders))
    [method](
      path ? `${request.serviceUrl()}/${path}` : request.resourceUrl(),
      body
    )
    .query(query)
    .reply(statusCode, responseBody, responseHeaders);
}

function getRequestHeaders(method: string, additionalHeaders?: MapType<any>) {
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
