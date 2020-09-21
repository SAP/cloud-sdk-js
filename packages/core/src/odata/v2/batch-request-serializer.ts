/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { v4 as uuid } from 'uuid';
import voca from 'voca';
import { MethodRequestBuilderBase } from '../common';
import { ODataBatchRequestBuilderV2 } from './batch-request-builder';
import { EntityV2 } from './entity';
import {
  CreateRequestBuilderV2,
  DeleteRequestBuilderV2,
  GetAllRequestBuilder,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilder,
  GetByKeyRequestBuilderV2,
  UpdateRequestBuilderV2
} from './request-builder';

/**
 * @deprecated Since v1.29.0. Use [[serializeRequest]] instead.
 * Build a string as the request body of the retrieve request.
 * Below is an example of the generated body, where the two empty line are mandatory to make the request valid.
 * *** example starts ***
 * Content-Type: application/http
 * Content-Transfer-Encoding: binary
 *
 * GET /SomeUrl/API_BUSINESS_PARTNER/A_BusinessPartnerBank?$format=json&$top=1 HTTP/1.1
 *
 *
 * *** example ends ***
 * @param request - The request builder of the retrieve request.
 * @returns The request body.
 */
export function toBatchRetrieveBodyV2(
  request: GetAllRequestBuilderV2<EntityV2> | GetByKeyRequestBuilderV2<EntityV2>
): string {
  return serializeRequest(request);
}

/**
 * OData batch change set, which holds a collection of write operations.
 */
export class ODataBatchChangeSetV2<
  T extends
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
> {
  constructor(readonly requests: T[], readonly changeSetId: string = uuid()) {}
}

/**
 * Serialize change set to string.
 * @param changeSet - Change set containing a collection of write operations.
 * @returns The serialized string representation of a change set.
 */
export function serializeChangeSet<
  T extends
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
>(changeSet: ODataBatchChangeSetV2<T>): string | undefined {
  if (changeSet.requests.length) {
    const changeSetBoundary = `changeset_${changeSet.changeSetId}`;

    return [
      `Content-Type: multipart/mixed; boundary=${changeSetBoundary}`,
      '',
      `--${changeSetBoundary}`,
      changeSet.requests
        .map(request => serializeRequest(request))
        .join(`\n--${changeSetBoundary}\n`),
      `--${changeSetBoundary}--`
    ].join('\n');
  }
}

/**
 * @deprecated Since v1.29.0. Use [[serializeChangeSet]] instead.
 * Serialize change set to string.
 * @param changeSet - Change set containing a collection of write operations.
 * @returns The serialized string representation of a change set.
 */
export function toBatchChangeSetV2<
  T extends
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
>(changeSet: ODataBatchChangeSetV2<T>): string | undefined {
  return serializeChangeSet(changeSet);
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
    ...getPayload(request)
  ].join('\n');
}

function getPayload(request: MethodRequestBuilderBase): string[] {
  if (
    request instanceof GetAllRequestBuilder ||
    request instanceof GetByKeyRequestBuilder
  ) {
    return [];
  }
  return [JSON.stringify(request.requestConfig.payload), ''];
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

/**
 * Serialize a batch request to string. This is used for the batch request payload when executing the request.
 * @param request - Batch request to serialize.
 * @returns String representation of the batch request.
 */
export function serializeBatchRequest(
  request: ODataBatchRequestBuilderV2
): string {
  const serializedSubRequests = request.requests
    .map(subRequest => serializeBatchSubRequest(subRequest))
    .filter(validRequest => !!validRequest);

  if (serializedSubRequests.length) {
    const batchBoundary = `batch_${request.requestConfig.batchId}`;
    return [
      `--${batchBoundary}`,
      serializedSubRequests.join(`\n--${batchBoundary}\n`),
      `--${batchBoundary}--`,
      ''
    ].join('\n');
  }
  return '';
}

function serializeBatchSubRequest<
  T extends
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
>(
  request:
    | ODataBatchChangeSetV2<T>
    | GetAllRequestBuilderV2<EntityV2>
    | GetByKeyRequestBuilderV2<EntityV2>
): string | undefined {
  if (
    request instanceof GetAllRequestBuilderV2 ||
    request instanceof GetByKeyRequestBuilderV2
  ) {
    return serializeRequest(request);
  }
  if (request instanceof ODataBatchChangeSetV2) {
    return serializeChangeSet(request);
  }
  throw Error(
    'Could not serialize batch request. The given sub request is not a valid retrieve request or change set.'
  );
}

export { ODataBatchChangeSetV2 as ODataBatchChangeSet };
export { toBatchChangeSetV2 as toBatchChangeSet };
export { toBatchRetrieveBodyV2 as toBatchRetrieveBody };
