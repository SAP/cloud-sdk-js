/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger, MapType } from '@sap-cloud-sdk/util';
import { HttpRequestConfig, executeHttpRequest } from '../../http-client';
import { ODataRequestConfig } from '../request';
import { Destination, DestinationNameAndJwt } from '../../../scp-cf';
import { ODataRequestBase } from '../request/odata-request';
import { filterNullishValues, getHeader, getHeaderValue } from './headers-util';

const logger = createLogger({
  package: 'core',
  messageContext: 'csrf-token-header'
});

/**
 * Get CSRF token and cookies for a destination and request configuration. The CSRF token and cookies will be retrieved based on the url of the destination and the custom configuration given by the `requestConfig`.
 * If there is a relative url in the `requestConfig` it will be appended to the destination's url, an absolute url overwrites the destination related url.
 * @param destination The destination to get the headers from
 * @param requestConfig An http request configuration containing additional information about the request, like url or headers
 * @returns A promise to an object containing the CSRF related headers
 */
export async function buildCsrfHeaders<T extends HttpRequestConfig>(
  destination: Destination | DestinationNameAndJwt,
  requestConfig: Partial<T>
): Promise<MapType<string>> {
  const csrfHeaders = await makeCsrfRequest(destination, requestConfig);
  validateCsrfTokenResponse(csrfHeaders);
  return filterNullishValues({
    ...getHeader('x-csrf-token', csrfHeaders),
    cookie: buildCookieHeaderValue(getHeaderValue('set-cookie', csrfHeaders))
  });
}

function makeCsrfRequest<T extends HttpRequestConfig>(
  destination: Destination | DestinationNameAndJwt,
  requestConfig: Partial<T>
): Promise<MapType<any>> {
  const fetchHeader = !getHeaderValue(
    'x-csrf-token',
    requestConfig.headers
  ) && { 'x-csrf-token': 'Fetch' };
  const axiosConfig: HttpRequestConfig = {
    method: 'get',
    ...requestConfig,
    headers: {
      ...fetchHeader,
      ...requestConfig.headers
    },
    url: requestConfig.url
  };

  return executeHttpRequest(destination, axiosConfig)
    .then(response => response.headers)
    .catch(error => {
      if (!error.response) {
        throw new Error('The error response is undefined.');
      }
      return error.response.headers;
    });
}

function validateCsrfTokenResponse(responseHeaders: MapType<any>) {
  if (!responseHeaders['x-csrf-token']) {
    logger.warn(
      'Destination did not return a CSRF token. This may cause a failure when sending the OData request.'
    );
  }

  if (!responseHeaders['set-cookie']) {
    logger.warn('CSRF header response does not include cookies.');
  }

  return responseHeaders;
}

function buildCookieHeaderValue(cookies?: string[]): string | undefined {
  if (cookies && cookies.length) {
    return cookies.map((cookie: string) => cookie.split(';')[0]).join(';');
  }
}

/**
 * @deprecated Since v1.20.0, use [[buildCsrfHeaders]] instead.
 *
 * Add CSRF token and cookies for a request to destination related headers.
 * @param request The request to get CSRF headers for.
 * @param headers Destination related headers to include in the request.
 * @returns A promise to an object containing the CSRF related headers
 */
export async function addCsrfTokenAndCookies<
  RequestT extends ODataRequestConfig
>(
  request: ODataRequestBase<RequestT>,
  headers: MapType<string>
): Promise<MapType<string>> {
  if (!request.destination) {
    throw Error('The request destination is undefined.');
  }
  if (
    request.config.method === 'get' ||
    Object.keys(headers).includes('x-csrf-token')
  ) {
    return headers;
  }
  return {
    ...(await buildCsrfHeaders(request.destination, {
      headers,
      url: request.relativeServiceUrl()
    })),
    ...headers
  };
}
