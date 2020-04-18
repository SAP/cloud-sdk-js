/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { assocSome, asyncPipe, MapType, mergeSome } from '@sap-cloud-sdk/util';
import { assoc, ifElse, path } from 'rambda';
import { Entity } from '../../entity';
import { Destination, ProxyConfiguration } from '../../scp-cf';
import { ODataDeleteRequestConfig, ODataUpdateRequestConfig } from '../request';
import { ODataRequest } from '../request/odata-request';
import { ODataRequestConfig } from '../request/odata-request-config';
import {
  addAuthorizationHeader,
  buildAndAddAuthorizationHeader
} from './authorization-header';
import { getCsrfHeaders } from './csrf-token-header';
import { filterNullishValues, filterDuplicateKeys, getHeaderByKeyOrExecute, replaceDuplicateKeys } from './headers-util';
import { buildAuthorizationHeader } from './auth-headers';

/**
 * Create object containing all headers, including custom headers for a given  OData request configuration and destination.
 * Custom headers override duplicate headers.
 *
 * @typeparam RequestT - Type of the request the headers are built for
 * @param request - OData request configuration to create headers for
 * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
 */
export async function buildHeaders<RequestT extends ODataRequestConfig>(
  request: ODataRequest<RequestT>
): Promise<MapType<string>> {
  if (!request.destination) {
    throw Error('The request destination is undefined.');
  }
  const destination = request.destination;

  const defaultHeaders = replaceDuplicateKeys(
    filterNullishValues({
      'Accept': 'application/json',
      'Content-Type': request.config.contentType,
      'if-match': getETagHeaderValue(request.config)
    }),
    request.config.customHeaders
  );

  const sapHeaders = replaceDuplicateKeys(
    filterNullishValues({
      'sap-client': destination.sapClient,
      'SAP-Connectivity-SCC-Location_ID': request.destination.cloudConnectorLocationId
    }),
    request.config.customHeaders
  );

  const authHeaders = await getHeaderByKeyOrExecute(
    'authorization',
    request.config.customHeaders,
    () => buildAuthorizationHeader(destination)
  );

  const csrfHeaders = request.config.method === 'get' ? {} : await getHeaderByKeyOrExecute(
    'x-csrf-token',
    request.config.customHeaders,
    () => getCsrfHeaders(request, {
      ...authHeaders,
      ...sapHeaders
    })
  );

  return {
    ...authHeaders,
    ...sapHeaders,
    ...csrfHeaders,
    ...defaultHeaders,
    ...request.config.customHeaders
  };
}

/**
 * Builds the authorization, proxy authorization and SAP client headers for a given destination.
 *
 * @param destination - A destination.
 * @returns HTTP headers for the given destination.
 */
export const buildHeadersForDestination = (
  destination: Destination
): Promise<MapType<string>> =>
  asyncPipe(
    addSapClientHeader(destination.sapClient),
    // TODO the proxy header are for OnPrem auth and are now handled correctly in the authorization-header.ts and should be removed here
    // However this would be a breaking change, since we recommended to use 'NoAuthentication' to achieve principal propagation as a workaround.
    addProxyHeaders(destination.proxyConfiguration),
    addLocationIdHeader(destination.cloudConnectorLocationId),
    buildAndAddAuthorizationHeader(destination)
  )({});

export function addSapClientHeader(sapClient?: string | null) {
  return (headers: MapType<string>) =>
    assocSome('sap-client', sapClient)(headers);
}

export const addProxyHeaders = (proxyConfiguration?: ProxyConfiguration) => (
  headers: MapType<string>
) => mergeSome(headers, path(['headers'], proxyConfiguration));

export const addLocationIdHeader = (locationId?: string) => (
  headers: MapType<string>
) => assocSome('SAP-Connectivity-SCC-Location_ID', locationId)(headers);

function getETagHeaderValue(config: ODataRequestConfig): string | undefined {
  if (config instanceof ODataUpdateRequestConfig || config instanceof ODataDeleteRequestConfig) {
    return config.versionIdentifierIgnored ? '*' : config.eTag;
  }
}
