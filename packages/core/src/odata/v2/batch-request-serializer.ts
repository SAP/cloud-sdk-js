/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { v4 as uuid } from 'uuid';
import { serializeRequest } from '../common/request/odata-batch-request-util';
import { EntityV2 } from './entity';
import {
  CreateRequestBuilderV2,
  DeleteRequestBuilderV2,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  UpdateRequestBuilderV2
} from './request-builder';

const headers = [
  'Content-Type: application/http',
  'Content-Transfer-Encoding: binary'
];
const http_version = 'HTTP/1.1';
const changesetIdPrefix = 'Content-Type: multipart/mixed; boundary=';
const changeSetBoundaryPrefix = 'changeset_';
const batch_content_type_prefix = `Content-Type: multipart/mixed; boundary=${changeSetBoundaryPrefix}`;
const request_content_type_line = 'Content-Type: application/json';
const request_accept_line = 'Accept: application/json';
const request_if_match_key = 'If-Match: ';
function batchContentType(boundary: string, id: string) {
  return `multipart/mixed; boundary=${boundary}_${id}`;
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
  return [...headers, '', serializeRequest(requestBuilder), '', ''].join('\n');
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
      `${batch_content_type_prefix}${changeSet.changeSetId}`,
      '',
      ...changeSet.requests.map(r =>
        toRequestPayload(r, changeSet.changeSetId)
      ),
      `--${changeSetBoundaryPrefix}${changeSet.changeSetId}--`
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
  const etagValue = toEtagHeaderValue(request);
  return [
    `--${changeSetBoundaryPrefix}${changeSetId}`,
    ...headers,
    '',
    serializeRequest(request),
    request_content_type_line,
    request_accept_line,
    etagValue ? `${request_if_match_key}${etagValue}` : '',
    '',
    JSON.stringify(request.requestConfig.payload),
    ''
  ].join('\n');
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
