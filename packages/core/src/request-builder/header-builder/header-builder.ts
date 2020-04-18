/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { assocSome, MapType, mergeSome } from '@sap-cloud-sdk/util';
import { path } from 'rambda';
import { Destination, ProxyConfiguration } from '../../scp-cf';
import { ODataDeleteRequestConfig, ODataUpdateRequestConfig } from '../request';
import { ODataRequest } from '../request/odata-request';
import { ODataRequestConfig } from '../request/odata-request-config';

import { getCsrfHeaders } from './csrf-token-header';
import { filterNullishValues, getHeaderByKeyOrExecute, replaceDuplicateKeys } from './headers-util';
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

  const defaultHeaders = replaceDuplicateKeys(
    filterNullishValues({
      'Accept': 'application/json',
      'Content-Type': request.config.contentType,
      'if-match': getETagHeaderValue(request.config)
    }),
    request.config.customHeaders
  );

  const destinationRelatedHeaders = await buildHeadersForDestination(request.destination, request.config.customHeaders);

  const csrfHeaders = request.config.method === 'get' ? {} : await getHeaderByKeyOrExecute(
    'x-csrf-token',
    request.config.customHeaders,
    () => getCsrfHeaders(request, {
      ...destinationRelatedHeaders
    })
  );

  return {
    ...destinationRelatedHeaders,
    ...csrfHeaders,
    ...defaultHeaders,
    ...request.config.customHeaders
  };
}

/**
 * Builds the authorization, proxy authorization and SAP headers for a given destination.
 *
 * @param destination - A destination.
 * @returns HTTP headers for the given destination.
 */
export async function buildHeadersForDestination(
  destination: Destination,
  customHeaders?: MapType<any>
): Promise<MapType<string>> {
  const authHeaders = await getHeaderByKeyOrExecute(
    'authorization',
    customHeaders,
    () => buildAuthorizationHeader(destination)
  );

  const sapHeaders = replaceDuplicateKeys(
    filterNullishValues({
      'sap-client': destination.sapClient,
      'SAP-Connectivity-SCC-Location_ID': destination.cloudConnectorLocationId
    }),
    customHeaders
  );

  return { ...authHeaders, ...sapHeaders };
}

function getETagHeaderValue(config: ODataRequestConfig): string | undefined {
  if (config instanceof ODataUpdateRequestConfig || config instanceof ODataDeleteRequestConfig) {
    return config.versionIdentifierIgnored ? '*' : config.eTag;
  }
}
