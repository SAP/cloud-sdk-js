import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity1, TestEntity2, TestEntity3, TestEntity4 } from './index';
/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(
  ...requests: Array<
    | ReadMultipleSchemasServiceRequestBuilder
    | ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export declare function batch(
  requests: Array<
    | ReadMultipleSchemasServiceRequestBuilder
    | ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: Array<WriteMultipleSchemasServiceRequestBuilder>
): ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>;
export declare function changeset(
  requests: Array<WriteMultipleSchemasServiceRequestBuilder>
): ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>;
export declare const defaultMultipleSchemasServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
export declare type ReadMultipleSchemasServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity1>
  | GetAllRequestBuilder<TestEntity2>
  | GetAllRequestBuilder<TestEntity3>
  | GetAllRequestBuilder<TestEntity4>
  | GetByKeyRequestBuilder<TestEntity1>
  | GetByKeyRequestBuilder<TestEntity2>
  | GetByKeyRequestBuilder<TestEntity3>
  | GetByKeyRequestBuilder<TestEntity4>;
export declare type WriteMultipleSchemasServiceRequestBuilder =
  | CreateRequestBuilder<TestEntity1>
  | UpdateRequestBuilder<TestEntity1>
  | DeleteRequestBuilder<TestEntity1>
  | CreateRequestBuilder<TestEntity2>
  | UpdateRequestBuilder<TestEntity2>
  | DeleteRequestBuilder<TestEntity2>
  | CreateRequestBuilder<TestEntity3>
  | UpdateRequestBuilder<TestEntity3>
  | DeleteRequestBuilder<TestEntity3>
  | CreateRequestBuilder<TestEntity4>
  | UpdateRequestBuilder<TestEntity4>
  | DeleteRequestBuilder<TestEntity4>;
//# sourceMappingURL=BatchRequest.d.ts.map
