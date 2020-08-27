/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { v4 as uuid } from 'uuid';
import {
  part_content_type_line,
  content_transfer_encoding_line
} from '../common';
import { getRequestLine } from '../common/request/odata-batch-request-util';
import { EntityV2 } from './entity';
import {
  CreateRequestBuilderV2,
  DeleteRequestBuilderV2,
  UpdateRequestBuilderV2
} from './request-builder';

const batch_content_type_prefix =
  'Content-Type: multipart/mixed; boundary=changeset_';
const change_set_start_prefix = '--changeset_';
const request_content_type_line = 'Content-Type: application/json';
const request_accept_line = 'Accept: application/json';
const request_if_match_key = 'If-Match: ';

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
  const changeSetBody = toBatchChangeSetBody(changeSet);
  if (!changeSetBody) {
    return;
  }
  return [
    `${batch_content_type_prefix}${changeSet.changeSetId}`,
    '',
    changeSetBody
  ].join('\n');
}

function toBatchChangeSetBody<
  T extends
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
>(changeSet: ODataBatchChangeSetV2<T>): string | undefined {
  if (changeSet.requests.length === 0) {
    return;
  }
  const requests = changeSet.requests.map(r =>
    toRequestPayload(r, changeSet.changeSetId)
  );
  return Array.prototype
    .concat(requests, `${change_set_start_prefix}${changeSet.changeSetId}--`)
    .join('\n');
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
function toRequestPayload(
  request:
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>,
  changeSetId: string
): string {
  if (
    request instanceof CreateRequestBuilderV2 ||
    request instanceof UpdateRequestBuilderV2
  ) {
    request.prepare();
  }

  const etagValue = toEtagHeaderValue(request) || '';
  const lines = [
    `${change_set_start_prefix}${changeSetId}`,
    part_content_type_line,
    content_transfer_encoding_line,
    '',
    getRequestLine(request),
    request_content_type_line,
    request_accept_line,
    etagValue ? `${request_if_match_key}${etagValue}` : '',
    '',
    JSON.stringify(request.requestConfig.payload),
    ''
  ];
  return lines.join('\n');
}

function toEtagHeaderValue(
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
