import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity, TestEntityLink } from './index';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';
/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(
  ...requests: Array<
    | ReadTestServiceRequestBuilder
    | BatchChangeSet<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export declare function batch(
  requests: Array<
    | ReadTestServiceRequestBuilder
    | BatchChangeSet<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: Array<WriteTestServiceRequestBuilder>
): BatchChangeSet<WriteTestServiceRequestBuilder>;
export declare function changeset(
  requests: Array<WriteTestServiceRequestBuilder>
): BatchChangeSet<WriteTestServiceRequestBuilder>;
export declare const defaultTestServicePath = '/odata/test-service';
export declare type ReadTestServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity>
  | GetAllRequestBuilder<TestEntityLink>
  | GetByKeyRequestBuilder<TestEntity>
  | GetByKeyRequestBuilder<TestEntityLink>;
export declare type WriteTestServiceRequestBuilder =
  | CreateRequestBuilder<TestEntity>
  | UpdateRequestBuilder<TestEntity>
  | DeleteRequestBuilder<TestEntity>
  | CreateRequestBuilder<TestEntityLink>
  | UpdateRequestBuilder<TestEntityLink>
  | DeleteRequestBuilder<TestEntityLink>;
//# sourceMappingURL=BatchRequest.d.ts.map
