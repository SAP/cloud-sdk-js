/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { assocSome, asyncPipe, createLogger, MapType } from '@sap-cloud-sdk/util';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { assoc, head, pipe } from 'rambda';
import { getAxiosConfigWithDefaults } from '../../http-client';
import { getAgentConfig } from '../http-agent';
import { ODataRequest, ODataRequestConfig } from '../request';
import { addLocationIdHeader, addProxyHeaders, addSapClientHeader } from './header-builder';

const logger = createLogger({
  package: 'core',
  messageContext: 'csrf-token-header'
});

export function addCsrfTokenAndCookies<RequestT extends ODataRequestConfig>(
  request: ODataRequest<RequestT>,
  headers: MapType<string>
): Promise<MapType<string>> {
  if (request.config.method === 'get' || Object.keys(headers).includes('x-csrf-token')) {
    return Promise.resolve(headers);
  }
  return csrfTokenAndCookies(request)(headers);
}

const csrfTokenAndCookies = <RequestT extends ODataRequestConfig>(request: ODataRequest<RequestT>) => (headers: MapType<string>) =>
  asyncPipe(getCsrfTokenResponseHeaders(request), validateCsrfTokenResponse, mergeTokenAndCookies(headers))(headers);

const getCsrfTokenResponseHeaders = <RequestT extends ODataRequestConfig>(request: ODataRequest<RequestT>) => (
  authHeader: MapType<string>
): Promise<MapType<any>> => {
  // ignore possibly defined if-match header.
  const { ['if-match']: _, ...csrfRequestHeaders } = authHeader;
  if (!request.destination) {
    throw Error('The request destination is undefined.');
  }

  const requestDataWithAxiosKeys = {
    url: request.serviceUrl(),
    ...getAgentConfig(request.destination)
  };

  return asyncPipe(
    addSapClientHeader(request.destination.sapClient || undefined),
    addCsrfFetchHeader,
    addProxyHeaders(request.destination.proxyConfiguration),
    addLocationIdHeader(request.destination.cloudConnectorLocationId),
    (headers): AxiosRequestConfig => ({ headers, ...getAxiosConfigWithDefaults(), ...requestDataWithAxiosKeys }),
    axiosConfig => retrieveCsrfTokenHeaders(axiosConfig)
  )(csrfRequestHeaders);
};

const addCsrfFetchHeader = (headers: MapType<string>) => assoc('x-csrf-token', 'Fetch')(headers);

const retrieveCsrfTokenHeaders = (axiosConfig: AxiosRequestConfig): Promise<MapType<string>> =>
  axios
    .request(axiosConfig)
    .then(response => response.headers)
    .catch((error: AxiosError) => {
      if (!error.response) {
        throw new Error('The error response is undefined.');
      }
      return error.response.headers;
    });

const validateCsrfTokenResponse = (responseHeaders: MapType<any>) => {
  if (!responseHeaders['x-csrf-token']) {
    logger.warn('Destination did not return a CSRF token. This may cause a failure when sending the OData request.');
  }

  if (!responseHeaders['set-cookie']) {
    logger.warn('CSRF header response does not include cookies.');
  }

  return responseHeaders;
};

const mergeTokenAndCookies = (headers: MapType<string>) => (csrfResponseHeaders: MapType<any>) =>
  pipe(addCsrfTokenHeader(csrfResponseHeaders['x-csrf-token']), addCookieHeader(csrfResponseHeaders['set-cookie']))(headers);

const addCsrfTokenHeader = (csrfToken?: string) => (headers: MapType<string>) => assocSome('x-csrf-token', csrfToken)(headers);
const addCookieHeader = (cookies?: string[]) => (headers: MapType<string>) => assocSome('cookie', buildCookieHeaderValue(cookies))(headers);

const buildCookieHeaderValue = (cookies?: string[]): string | undefined =>
  cookies && cookies.length ? cookies.map((cookie: string) => head(cookie.split(';'))).join(';') : undefined;
