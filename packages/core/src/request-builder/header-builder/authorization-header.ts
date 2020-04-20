/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/**
 * @deprecated Since v1.20.0, refer to 'auth-headers' instead.
 * @packageDocumentation
 */
import { MapType } from '@sap-cloud-sdk/util';
import { Destination } from '../../scp-cf';
import { ODataRequest, ODataRequestConfig } from '../request';
import { buildAuthorizationHeaders } from './auth-headers';
import { getHeader } from './headers-util';

/**
 * @deprecated Since v1.20.0. Use [[buildAuthorizationHeader]] instead.
 * Adds authorization headers for a given ODataRequest to existing headers.
 *
 * @param request - an ODataRequest.
 * @param headers - The headers that should be added to.
 * @returns The provided headers with the new authorization headers.
 */
export async function addAuthorizationHeader<
  RequestT extends ODataRequestConfig
>(
  request: ODataRequest<RequestT>,
  headers: MapType<string>
): Promise<MapType<string>> {
  const destination = request.destination;
  if (!destination) {
    return headers;
  }
  const authHeaders = await getAuthHeaders(
    destination,
    request.config.customHeaders
  );
  return {
    ...headers,
    ...authHeaders
  };
}

async function getAuthHeaders(
  destination: Destination,
  customHeaders?: MapType<any>
): Promise<MapType<string>> {
  const customAuthHeaders = getHeader('authorization', customHeaders);
  return Object.keys(customAuthHeaders).length
    ? customAuthHeaders
    : buildAuthorizationHeaders(destination);
}

/**
 * @deprecated Since v1.20.0. Use [[buildAuthorizationHeader]] instead.
 * Adds authorization headers for a given destination to existing headers.
 *
 * @param destination - A destination.
 * @param headers - The headers that should be added to.
 * @returns The provided headers with the new authorization headers.
 */
export function buildAndAddAuthorizationHeader(destination: Destination) {
  return async function (headers: MapType<any>): Promise<MapType<string>> {
    return {
      ...headers,
      ...(await buildAuthorizationHeaders(destination))
    };
  };
}
