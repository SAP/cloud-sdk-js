import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/core';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntityOtherMultiLink,
  TestEntityLvl2MultiLink,
  TestEntitySingleLink,
  TestEntityLvl2SingleLink,
  TestEntityCircularLinkParent,
  TestEntityCircularLinkChild,
  TestEntityEndsWith,
  TestEntityEndsWithSomethingElse
} from './index';
/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(
  ...requests: Array<
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSet<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: WriteTestServiceRequestBuilder[]
): ODataBatchChangeSet<WriteTestServiceRequestBuilder>;
export declare const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
export declare type ReadTestServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity>
  | GetAllRequestBuilder<TestEntityMultiLink>
  | GetAllRequestBuilder<TestEntityOtherMultiLink>
  | GetAllRequestBuilder<TestEntityLvl2MultiLink>
  | GetAllRequestBuilder<TestEntitySingleLink>
  | GetAllRequestBuilder<TestEntityLvl2SingleLink>
  | GetAllRequestBuilder<TestEntityCircularLinkParent>
  | GetAllRequestBuilder<TestEntityCircularLinkChild>
  | GetAllRequestBuilder<TestEntityEndsWith>
  | GetAllRequestBuilder<TestEntityEndsWithSomethingElse>
  | GetByKeyRequestBuilder<TestEntity>
  | GetByKeyRequestBuilder<TestEntityMultiLink>
  | GetByKeyRequestBuilder<TestEntityOtherMultiLink>
  | GetByKeyRequestBuilder<TestEntityLvl2MultiLink>
  | GetByKeyRequestBuilder<TestEntitySingleLink>
  | GetByKeyRequestBuilder<TestEntityLvl2SingleLink>
  | GetByKeyRequestBuilder<TestEntityCircularLinkParent>
  | GetByKeyRequestBuilder<TestEntityCircularLinkChild>
  | GetByKeyRequestBuilder<TestEntityEndsWith>
  | GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse>;
export declare type WriteTestServiceRequestBuilder =
  | CreateRequestBuilder<TestEntity>
  | UpdateRequestBuilder<TestEntity>
  | DeleteRequestBuilder<TestEntity>
  | CreateRequestBuilder<TestEntityMultiLink>
  | UpdateRequestBuilder<TestEntityMultiLink>
  | DeleteRequestBuilder<TestEntityMultiLink>
  | CreateRequestBuilder<TestEntityOtherMultiLink>
  | UpdateRequestBuilder<TestEntityOtherMultiLink>
  | DeleteRequestBuilder<TestEntityOtherMultiLink>
  | CreateRequestBuilder<TestEntityLvl2MultiLink>
  | UpdateRequestBuilder<TestEntityLvl2MultiLink>
  | DeleteRequestBuilder<TestEntityLvl2MultiLink>
  | CreateRequestBuilder<TestEntitySingleLink>
  | UpdateRequestBuilder<TestEntitySingleLink>
  | DeleteRequestBuilder<TestEntitySingleLink>
  | CreateRequestBuilder<TestEntityLvl2SingleLink>
  | UpdateRequestBuilder<TestEntityLvl2SingleLink>
  | DeleteRequestBuilder<TestEntityLvl2SingleLink>
  | CreateRequestBuilder<TestEntityCircularLinkParent>
  | UpdateRequestBuilder<TestEntityCircularLinkParent>
  | DeleteRequestBuilder<TestEntityCircularLinkParent>
  | CreateRequestBuilder<TestEntityCircularLinkChild>
  | UpdateRequestBuilder<TestEntityCircularLinkChild>
  | DeleteRequestBuilder<TestEntityCircularLinkChild>
  | CreateRequestBuilder<TestEntityEndsWith>
  | UpdateRequestBuilder<TestEntityEndsWith>
  | DeleteRequestBuilder<TestEntityEndsWith>
  | CreateRequestBuilder<TestEntityEndsWithSomethingElse>
  | UpdateRequestBuilder<TestEntityEndsWithSomethingElse>
  | DeleteRequestBuilder<TestEntityEndsWithSomethingElse>;
//# sourceMappingURL=BatchRequest.d.ts.map
