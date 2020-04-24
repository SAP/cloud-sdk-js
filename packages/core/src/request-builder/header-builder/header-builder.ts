/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Destination } from '../../scp-cf';
import { ODataRequestConfig, ODataRequest, isWithETag } from '../request';
import { buildCsrfHeaders2 } from './csrf-token-header';
import {
  filterNullishValues,
  replaceDuplicateKeys,
  getHeader
} from './headers-util';
import { buildAuthorizationHeaders } from './authorization-header';

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
      accept: 'application/json',
      'content-type': request.config.contentType,
      'if-match': getETagHeaderValue(request.config)
    }),
    request.config.customHeaders
  );

  const destinationRelatedHeaders = await buildHeadersForDestination(
    request.destination,
    request.config.customHeaders
  );

  const csrfHeaders =
    request.config.method === 'get'
      ? {}
      : await getCsrfHeaders(
          request,
          destinationRelatedHeaders,
          request.config.customHeaders
        );

  return {
    ...destinationRelatedHeaders,
    ...csrfHeaders,
    ...defaultHeaders,
    ...request.config.customHeaders
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

async function getCsrfHeaders<RequestT extends ODataRequestConfig>(
  request: ODataRequest<RequestT>,
  destinationRelatedHeaders: MapType<string>,
  customHeaders?: MapType<any>
): Promise<MapType<string>> {
  if (!request.destination) {
    throw Error('The request destination is undefined.');
  }

  const customCsrfHeaders = getHeader('x-csrf-token', customHeaders);
  return Object.keys(customCsrfHeaders).length
    ? customCsrfHeaders
    : buildCsrfHeaders2(request.destination, {
        headers: destinationRelatedHeaders,
        url: request.relativeServiceUrl()
      });
}

/**
 * Builds the authorization, proxy authorization and SAP headers for a given destination.
 *
 * @param destination - A destination.
 * @param customHeaders - Custom default headers for the resulting HTTP headers.
 * @returns HTTP headers for the given destination.
 */
export async function buildHeadersForDestination(
  destination: Destination,
  customHeaders?: MapType<any>
): Promise<MapType<string>> {
  const authHeaders = await getAuthHeaders(destination, customHeaders);

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
  if (isWithETag(config)) {
    return config.versionIdentifierIgnored ? '*' : config.eTag;
  }
}
