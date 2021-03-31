/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import voca from 'voca';
import { ODataRequest } from '../../request/odata-request';
import { ODataRequestConfig } from '../../request/odata-request-config';
import { MethodRequestBuilder } from '../request-builder-base';
import { BatchChangeSet } from './batch-change-set';
import type { BatchRequestBuilder } from './batch-request-builder';
import {
  BatchRequestSerializationOptions,
  BatchSubRequestPathType
} from './batch-request-options';
/**
 * Serialize change set to string.
 * @param changeSet - Change set containing a collection of write operations.
 * @param options Request serialization options.
 * @returns The serialized string representation of a change set.
 */
export function serializeChangeSet(
  changeSet: BatchChangeSet,
  options: BatchRequestSerializationOptions = {}
): string | undefined {
  if (changeSet.requests.length) {
    return [
      `Content-Type: multipart/mixed; boundary=${changeSet.boundary}`,
      '',
      `--${changeSet.boundary}`,
      changeSet.requests
        .map(request => serializeRequest(request, options))
        .join(`\n--${changeSet.boundary}\n`),
      `--${changeSet.boundary}--`
    ].join('\n');
  }
}

/**
 * Serialize a multipart request to string.
 * @param request One of [[GetAllRequestBuilder | getAll]], [[GetByKeyRequestBuilder | getByKey]], [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] request builder.
 * @param options Request serialization options.
 * @returns The serialized string representation of a multipart request, including the multipart headers.
 */
export function serializeRequest(
  request: MethodRequestBuilder,
  options: BatchRequestSerializationOptions = {}
): string {
  const odataRequest = new ODataRequest(
    request.requestConfig,
    options.destination
  );
  const headers = {
    ...odataRequest.defaultHeaders(),
    ...odataRequest.eTagHeaders(),
    ...odataRequest.customHeaders()
  };
  const requestHeaders = Object.entries(headers).map(
    ([key, value]) => `${voca.titleCase(key)}: ${value}`
  );

  return [
    'Content-Type: application/http',
    'Content-Transfer-Encoding: binary',
    '',
    `${request.requestConfig.method.toUpperCase()} ${
      getUrl(odataRequest, options.subRequestPathType)
    } HTTP/1.1`,
    ...(requestHeaders.length ? requestHeaders : ['']),
    '',
    ...getPayload(request),
    ''
  ].join('\n');
}

function getUrl<ConfigT extends ODataRequestConfig>(
  request: ODataRequest<ConfigT>,
  subRequestPathType?: BatchSubRequestPathType
): string {
  switch (subRequestPathType) {
    case 'absolute':
      return request.url();
    case 'relativeToEntity':
      return `/${request.relativeUrl(false)}`;
    default:
      return `/${request.relativeUrl()}`;
  }
}

function getPayload(request: MethodRequestBuilder): string[] {
  return request.requestConfig.method !== 'get'
    ? [JSON.stringify(request.requestConfig.payload)]
    : [];
}

function validateOptions(options: BatchRequestSerializationOptions): void {
  // This should never happen. Can only occur if requestbuilder.build() was called which will be removed.
  if (options.subRequestPathType === 'absolute' && !options.destination?.url) {
    throw new Error(
      "Cannot serialize batch request. Invalid destination provided for sub request path type 'absolute'"
    );
  }
}

/**
 * Serialize a batch request to string. This is used for the batch request payload when executing the request.
 * @param request - Batch request to serialize.
 * @param options Request serialization options.
 * @returns String representation of the batch request.
 */
export function serializeBatchRequest(
  request: BatchRequestBuilder,
  options: BatchRequestSerializationOptions = {}
): string {
  validateOptions(options);
  const serializedSubRequests = request.requests
    .map(subRequest =>
      subRequest instanceof MethodRequestBuilder
        ? serializeRequest(subRequest, options)
        : serializeChangeSet(subRequest, options)
    )
    .filter(validRequest => !!validRequest)
    .join(`\n--${request.requestConfig.boundary}\n`);

  const serializedBatchRequest = serializedSubRequests
    ? [
        `--${request.requestConfig.boundary}`,
        serializedSubRequests,
        `--${request.requestConfig.boundary}--`,
        ''
      ].join('\n')
    : serializedSubRequests;

  // The batch standard expects CRLF line endings for batch requests
  return serializedBatchRequest.replace(/\n/g, '\r\n');
}

/**
 * @deprecated Since v1.30.0. This function won't be replaced.
 * Serialize a request to a one line string containing the HTTP method, url and HTTP version.
 * For Example:
 * GET /sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerAddress?$format=json&$top=1 HTTP/1.1
 * @param request One of [[GetAllRequestBuilder | getAll]], [[GetByKeyRequestBuilder | getByKey]], [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] request builder.
 * @returns The seralized request as <HTTP method> <url> <HTTP version>.
 */
export function getLine(request: MethodRequestBuilder): string {
  return `${request.requestConfig.method.toUpperCase()} /${request.relativeUrl()} HTTP/1.1`;
}
