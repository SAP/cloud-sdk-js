/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock = require('nock');
import { MapType } from '@sap-cloud-sdk/util';
import { Destination } from '../../src';
import { ODataCreateRequestConfig } from '../../src/request-builder/request/odata-create-request-config';
import { ODataDeleteRequestConfig } from '../../src/request-builder/request/odata-delete-request-config';
import { ODataGetAllRequestConfig } from '../../src/request-builder/request/odata-get-all-request-config';
import { ODataRequest } from '../../src/request-builder/request/odata-request';
import { ODataUpdateRequestConfig } from '../../src/request-builder/request/odata-update-request-config';
import { TestEntity } from './test-services/test-service';

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

export function mockCreateRequest(params: MockRequestParams, entityConstructor = TestEntity) {
  const requestConfig = new ODataCreateRequestConfig(entityConstructor);
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 200,
    method: params.method || 'post',
    responseBody: { d: params.responseBody || params.body }
  });
}

export function mockDeleteRequest(params: MockRequestParams, entityConstructor = TestEntity) {
  const requestConfig = new ODataDeleteRequestConfig(entityConstructor);
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 202,
    method: params.method || 'delete'
  });
}

export function mockUpdateRequest(params: MockRequestParams, entityConstructor = TestEntity) {
  const requestConfig = new ODataUpdateRequestConfig(entityConstructor);
  return mockRequest(requestConfig, {
    ...params,
    statusCode: params.statusCode || 204,
    method: params.method || 'patch'
  });
}

export function mockGetRequest(params: MockRequestParams, entityConstructor = TestEntity) {
  const requestConfig = new ODataGetAllRequestConfig(entityConstructor);
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

export function mockHeaderRequest({ request, host = defaultHost, responseHeaders = mockedBuildHeaderResponse }: MockHeaderRequestParams) {
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
    [method](path ? `${request.serviceUrl()}/${path}` : request.resourceUrl(), body)
    .query(query)
    .reply(statusCode, responseBody, responseHeaders);
}

function getRequestHeaders(method: string, additionalHeaders?: MapType<any>) {
  if (additionalHeaders) {
    const initialHeaders = method === 'get' ? defaultRequestHeaders : { ...defaultRequestHeaders, 'x-csrf-token': defaultCsrfToken };
    return { reqheaders: { ...initialHeaders, ...additionalHeaders } };
  }
}
