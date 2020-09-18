/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { v4 as uuid } from 'uuid';
import voca from 'voca';
import { MethodRequestBuilderBase } from '../common';
import { serializeRequestBody } from '../common/request/odata-batch-request-util';
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

const headers = [
  'Content-Type: application/http',
  'Content-Transfer-Encoding: binary'
];
const changeSetBoundaryPrefix = 'changeset';
function batchContentType(prefix: string, id: string) {
  return `multipart/mixed; boundary=${prefix}_${id}`;
}

/**
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
 * @param requestBuilder - The request builder of the retrieve request.
 * @returns The request body.
 */
export function toBatchRetrieveBodyV2(
  requestBuilder:
    | GetAllRequestBuilderV2<EntityV2>
    | GetByKeyRequestBuilderV2<EntityV2>
): string {
  const requestHeaders = Object.entries(requestBuilder.basicHeaders()).map(
    ([key, value]) => `${voca.titleCase(key)}: ${value}`
  );
  const a = [
    ...headers,
    '',
    serializeRequestBody(requestBuilder),
    ...(requestHeaders.length ? requestHeaders : ['']),
    ''
  ].join('\n');
  return a;
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
 * Build the change set payload as the partial payload of the batch request.
 * @param changeSet - Change set holds a collection of write operations.
 * @returns The generated payload from the given change set.
 */
export function toBatchChangeSetV2<
  T extends
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
>(changeSet: ODataBatchChangeSetV2<T>): string | undefined {
  if (changeSet.requests.length) {
    return [
      `Content-Type: ${batchContentType(
        changeSetBoundaryPrefix,
        changeSet.changeSetId
      )}`,
      '',
      ...changeSet.requests.map(r =>
        toRequestPayload(r, changeSet.changeSetId)
      ),
      `--${changeSetBoundaryPrefix}_${changeSet.changeSetId}--`
    ].join('\n');
  }
}

/**
 * Build the request payload of a write operation.
 * Below is an generated example, where the empty line after "Accept: application/json" is mandatory.
 * *** example starts ***
 * --changeset_1234
 * Content-Type: application/http
 * Content-Transfer-Encoding: binary
 *
 * PATCH /someUrl/API_BUSINESS_PARTNER/A_BusinessPartnerAddress(BusinessPartner='123',AddressID='321') HTTP/1.1
 * Content-Type: application/json
 * Accept: application/json
 *
 * {
 * "HouseNumber": "99"
 * }
 *
 * *** example ends ***
 * @param request - A request build of a write operation.
 * @param changeSetId - The change set identifier
 * @returns The generated request payload
 */
export function toRequestPayload(
  request:
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>,
  changeSetId: string
): string {
  return [
    `--${changeSetBoundaryPrefix}_${changeSetId}`,
    serializeRequest(request)
  ].join('\n');
}

export function serializeRequest(request: MethodRequestBuilderBase) {
  const requestHeaders = Object.entries(request.basicHeaders()).map(
    ([key, value]) => `${voca.titleCase(key)}: ${value}`
  );
  return [
    ...headers,
    '',
    serializeRequestBody(request),
    ...(requestHeaders.length ? requestHeaders : ['']),
    '',
    ...getPayload(request)
  ].join('\n');
}

function getPayload(request: MethodRequestBuilderBase) {
  if (
    request instanceof GetAllRequestBuilder ||
    request instanceof GetByKeyRequestBuilder
  ) {
    return [];
  }
  return [JSON.stringify(request.requestConfig.payload), ''];
}

export function toEtagHeaderValue(
  request:
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
): string | undefined {
  if (
    request instanceof UpdateRequestBuilderV2 ||
    request instanceof DeleteRequestBuilderV2
  ) {
    if (request.requestConfig.versionIdentifierIgnored) {
      return '*';
    }
    return request.requestConfig.eTag ? request.requestConfig.eTag : undefined;
  }
  return;
}

export { ODataBatchChangeSetV2 as ODataBatchChangeSet };
export { toBatchChangeSetV2 as toBatchChangeSet };
export { toBatchRetrieveBodyV2 as toBatchRetrieveBody };
