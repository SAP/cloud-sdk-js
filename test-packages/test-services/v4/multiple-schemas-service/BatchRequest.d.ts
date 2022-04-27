import {
  CreateRequestBuilderV4,
  DeleteRequestBuilderV4,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  ODataBatchChangeSetV4,
  ODataBatchRequestBuilderV4,
  UpdateRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { TestEntity1, TestEntity2, TestEntity3, TestEntity4 } from './index';
/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(
  ...requests: Array<
    | ReadMultipleSchemasServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV4;
export declare function batch(
  requests: Array<
    | ReadMultipleSchemasServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV4;
/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: Array<WriteMultipleSchemasServiceRequestBuilder>
): ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>;
export declare function changeset(
  requests: Array<WriteMultipleSchemasServiceRequestBuilder>
): ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>;
export declare const defaultMultipleSchemasServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
export declare type ReadMultipleSchemasServiceRequestBuilder =
  | GetAllRequestBuilderV4<TestEntity1>
  | GetAllRequestBuilderV4<TestEntity2>
  | GetAllRequestBuilderV4<TestEntity3>
  | GetAllRequestBuilderV4<TestEntity4>
  | GetByKeyRequestBuilderV4<TestEntity1>
  | GetByKeyRequestBuilderV4<TestEntity2>
  | GetByKeyRequestBuilderV4<TestEntity3>
  | GetByKeyRequestBuilderV4<TestEntity4>;
export declare type WriteMultipleSchemasServiceRequestBuilder =
  | CreateRequestBuilderV4<TestEntity1>
  | UpdateRequestBuilderV4<TestEntity1>
  | DeleteRequestBuilderV4<TestEntity1>
  | CreateRequestBuilderV4<TestEntity2>
  | UpdateRequestBuilderV4<TestEntity2>
  | DeleteRequestBuilderV4<TestEntity2>
  | CreateRequestBuilderV4<TestEntity3>
  | UpdateRequestBuilderV4<TestEntity3>
  | DeleteRequestBuilderV4<TestEntity3>
  | CreateRequestBuilderV4<TestEntity4>
  | UpdateRequestBuilderV4<TestEntity4>
  | DeleteRequestBuilderV4<TestEntity4>;
//# sourceMappingURL=BatchRequest.d.ts.map
