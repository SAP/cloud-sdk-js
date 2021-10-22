import {
  BatchChangeSet,
  serializeChangeSet,
  serializeRequest
} from '@sap-cloud-sdk/odata-common';
import { Entity } from './entity';
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  UpdateRequestBuilder
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
export function toBatchRetrieveBody(
  request: GetAllRequestBuilder<Entity> | GetByKeyRequestBuilder<Entity>
): string {
  return serializeRequest(request);
}

/**
 * @deprecated Since v1.30.0. Use [[serializeChangeSet]] instead.
 * Serialize change set to string.
 * @param changeSet - Change set containing a collection of write operations.
 * @returns The serialized string representation of a change set.
 */
export function toBatchChangeSet<
  T extends
    | CreateRequestBuilder<Entity>
    | UpdateRequestBuilder<Entity>
    | DeleteRequestBuilder<Entity>
>(changeSet: BatchChangeSet<T>): string | undefined {
  return serializeChangeSet(changeSet);
}

export {
  toBatchRetrieveBody as toBatchRetrieveBodyV4,
  toBatchChangeSet as toBatchChangeSetV4
};
