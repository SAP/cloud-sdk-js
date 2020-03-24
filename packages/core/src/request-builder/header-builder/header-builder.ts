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
import { addCsrfTokenAndCookies } from './csrf-token-header';

/**
 * Create object containing all headers, including custom headers for a given  OData request configuration and destination.
 * Custom headers override duplicate headers.
 *
 * @typeparam RequestT - Type of the request the headers are built for
 * @param request - OData request configuration to create headers for
 * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
 */
export function buildHeaders<RequestT extends ODataRequestConfig>(
  request: ODataRequest<RequestT>
): Promise<MapType<string>> {
  if (!request.destination) {
    throw Error('The request destination is undefined.');
  }
  return buildHeadersAuthFirstCustomLast(request)(
    addEtagHeader(request.config),
    headers => addCsrfTokenAndCookies(request, headers),
    addAcceptHeader,
    headers => addContentTypeHeader(request.config.contentType, headers),
    addSapClientHeader(request.destination.sapClient || undefined),
    addProxyHeaders(request.destination.proxyConfiguration),
    addLocationIdHeader(request.destination.cloudConnectorLocationId)
  );
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
    addSapClientHeader(destination.sapClient || undefined),
    // TODO the proxy header are for OnPrem auth and are now handled correctly in the authorization-header.ts and should be removed here
    // However this would be a breaking change, since we recommended to use 'NoAuthentication' to achieve principal propagation as a workaround.
    addProxyHeaders(destination.proxyConfiguration),
    addLocationIdHeader(destination.cloudConnectorLocationId),
    buildAndAddAuthorizationHeader(destination)
  )({});

export function addSapClientHeader(sapClient?: string) {
  return (headers: MapType<string>) =>
    assocSome('sap-client', sapClient)(headers);
}

export const addProxyHeaders = (proxyConfiguration?: ProxyConfiguration) => (
  headers: MapType<string>
) => mergeSome(headers, path(['headers'], proxyConfiguration));

export const addLocationIdHeader = (locationId?: string) => (
  headers: MapType<string>
) => assocSome('SAP-Connectivity-SCC-Location_ID', locationId)(headers);

const buildHeadersAuthFirstCustomLast = <RequestT extends ODataRequestConfig>(
  request: ODataRequest<RequestT>
) => (...fns): Promise<MapType<string>> =>
  asyncPipe(
    headers => addAuthorizationHeader(request, headers),
    ...fns,
    addCustomHeaders(request.config.customHeaders)
  )({});

const addEtagHeader = (requestConfig: ODataRequestConfig) => (
  headers: MapType<string>
) => assocSome('if-match', getETagHeader(requestConfig))(headers);

const addCustomHeaders = (customHeaders: MapType<string>) => (
  headers: MapType<string>
) => ({
  ...headers,
  ...customHeaders
});

const addContentTypeHeader = (contentType: string, headers: MapType<string>) =>
  assoc('Content-Type', contentType)(headers);

const addAcceptHeader = (headers: MapType<string>) =>
  assoc('Accept', 'application/json')(headers);

const eTagFromConfig = <T extends Entity>(
  config: ODataUpdateRequestConfig<T> | ODataDeleteRequestConfig<T>
) => (config.versionIdentifierIgnored ? '*' : config.eTag);

const getETagHeader = (config: ODataRequestConfig): string | undefined =>
  ifElse(
    c =>
      c instanceof ODataUpdateRequestConfig ||
      c instanceof ODataDeleteRequestConfig,
    eTagFromConfig,
    () => undefined
  )(config);
