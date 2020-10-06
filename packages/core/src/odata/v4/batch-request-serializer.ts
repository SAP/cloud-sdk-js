/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  serializeChangeSet,
  serializeRequest
} from '../common/request-builder/batch/batch-request-serializer';
import { BatchChangeSet } from '../common/request-builder/batch/batch-change-set';
import { EntityV4 } from './entity';
import {
  CreateRequestBuilderV4,
  DeleteRequestBuilderV4,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  UpdateRequestBuilderV4
} from './request-builder';

/**
 * @deprecated Since v1.30.0. Use [[serializeRequest]] instead.
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
export function toBatchRetrieveBodyV4(
  request: GetAllRequestBuilderV4<EntityV4> | GetByKeyRequestBuilderV4<EntityV4>
): string {
  return serializeRequest(request);
}

/**
 * @deprecated Since v1.30.0. Use [[serializeChangeSet]] instead.
 * Serialize change set to string.
 * @param changeSet - Change set containing a collection of write operations.
 * @returns The serialized string representation of a change set.
 */
export function toBatchChangeSetV4<
  T extends
    | CreateRequestBuilderV4<EntityV4>
    | UpdateRequestBuilderV4<EntityV4>
    | DeleteRequestBuilderV4<EntityV4>
>(changeSet: BatchChangeSet<T>): string | undefined {
  return serializeChangeSet(changeSet);
}
