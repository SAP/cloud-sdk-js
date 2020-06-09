/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';
import { ODataRequest, ODataRequestConfig } from '../odata/common/request';
import { buildCsrfHeaders } from './csrf-token-header';

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
  request: ODataRequest<RequestT>,
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
