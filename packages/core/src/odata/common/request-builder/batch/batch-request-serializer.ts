/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import voca from 'voca';
import { MethodRequestBuilderBase } from '../request-builder-base';
import { BatchChangeSet } from './batch-change-set';
import { BatchRequestBuilder } from './batch-request-builder';

/**
 * Serialize change set to string.
 * @param changeSet - Change set containing a collection of write operations.
 * @param changeSetBoundary Boundary separating parts in the serialized request.
 * @returns The serialized string representation of a change set.
 */
export function serializeChangeSet(
  changeSet: BatchChangeSet
): string | undefined {
  if (changeSet.requests.length) {
    return [
      `Content-Type: multipart/mixed; boundary=${changeSet.boundary}`,
      '',
      `--${changeSet.boundary}`,
      changeSet.requests
        .map(request => serializeRequest(request))
        .join(`\n--${changeSet.boundary}\n`),
      `--${changeSet.boundary}--`
    ].join('\n');
  }
}

/**
 * Serialize a multipart request to string.
 * @param request One of [[GetAllRequestBuilder | getAll]], [[GetByKeyRequestBuilder | getByKey]], [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] request builder.
 * @returns The serialized string representation of a multipart request, including the multipart headers.
 */
export function serializeRequest(request: MethodRequestBuilderBase) {
  const requestHeaders = Object.entries(request.basicHeaders()).map(
    ([key, value]) => `${voca.titleCase(key)}: ${value}`
  );
  return [
    'Content-Type: application/http',
    'Content-Transfer-Encoding: binary',
    '',
    `${request.requestConfig.method.toUpperCase()} /${request.relativeUrl()} HTTP/1.1`,
    ...(requestHeaders.length ? requestHeaders : ['']),
    '',
    ...getPayload(request),
    ''
  ].join('\n');
}

function getPayload(request: MethodRequestBuilderBase): string[] {
  return request.requestConfig.method !== 'get'
    ? [JSON.stringify(request.requestConfig.payload)]
    : [];
}

/**
 * Serialize a batch request to string. This is used for the batch request payload when executing the request.
 * @param request - Batch request to serialize.
 * @returns String representation of the batch request.
 */
export function serializeBatchRequest(request: BatchRequestBuilder): string {
  const serializedSubRequests = request.requests
    .map(subRequest =>
      subRequest instanceof MethodRequestBuilderBase
        ? serializeRequest(subRequest)
        : serializeChangeSet(subRequest)
    )
    .filter(validRequest => !!validRequest)
    .join(`\n--${request.requestConfig.boundary}\n`);

  return serializedSubRequests
    ? [
        `--${request.requestConfig.boundary}`,
        serializedSubRequests,
        `--${request.requestConfig.boundary}--`,
        ''
      ].join('\n')
    : serializedSubRequests;
}

/**
 * @deprecated Since v1.29.0. This function won't be replaced.
 * Serialize a request to a one line string containing the HTTP method, url and HTTP version.
 * For Example:
 * GET /sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerAddress?$format=json&$top=1 HTTP/1.1
 * @param request One of [[GetAllRequestBuilder | getAll]], [[GetByKeyRequestBuilder | getByKey]], [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] request builder.
 * @returns The seralized request as <HTTP method> <url> <HTTP version>.
 */
export function getLine(request: MethodRequestBuilderBase): string {
  return `${request.requestConfig.method.toUpperCase()} /${request.relativeUrl()} HTTP/1.1`;
}
