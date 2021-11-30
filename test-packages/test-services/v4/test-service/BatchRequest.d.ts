import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import {
  TestEntity,
  TestEntityWithEnumKey,
  TestEntityWithSharedEntityType1,
  TestEntityWithSharedEntityType2,
  TestEntityMultiLink,
  TestEntityOtherMultiLink,
  TestEntityLvl2MultiLink,
  TestEntityLvl3MultiLink,
  TestEntitySingleLink,
  TestEntityLvl2SingleLink,
  TestEntityCircularLinkParent,
  TestEntityCircularLinkChild,
  TestEntityEndsWith,
  TestEntityEndsWithSomethingElse
} from './index';
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
export declare const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
export declare type ReadTestServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity>
  | GetAllRequestBuilder<TestEntityWithEnumKey>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType1>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType2>
  | GetAllRequestBuilder<TestEntityMultiLink>
  | GetAllRequestBuilder<TestEntityOtherMultiLink>
  | GetAllRequestBuilder<TestEntityLvl2MultiLink>
  | GetAllRequestBuilder<TestEntityLvl3MultiLink>
  | GetAllRequestBuilder<TestEntitySingleLink>
  | GetAllRequestBuilder<TestEntityLvl2SingleLink>
  | GetAllRequestBuilder<TestEntityCircularLinkParent>
  | GetAllRequestBuilder<TestEntityCircularLinkChild>
  | GetAllRequestBuilder<TestEntityEndsWith>
  | GetAllRequestBuilder<TestEntityEndsWithSomethingElse>
  | GetByKeyRequestBuilder<TestEntity>
  | GetByKeyRequestBuilder<TestEntityWithEnumKey>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType1>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType2>
  | GetByKeyRequestBuilder<TestEntityMultiLink>
  | GetByKeyRequestBuilder<TestEntityOtherMultiLink>
  | GetByKeyRequestBuilder<TestEntityLvl2MultiLink>
  | GetByKeyRequestBuilder<TestEntityLvl3MultiLink>
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
  | CreateRequestBuilder<TestEntityWithEnumKey>
  | UpdateRequestBuilder<TestEntityWithEnumKey>
  | DeleteRequestBuilder<TestEntityWithEnumKey>
  | CreateRequestBuilder<TestEntityWithSharedEntityType1>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType1>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType1>
  | CreateRequestBuilder<TestEntityWithSharedEntityType2>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType2>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType2>
  | CreateRequestBuilder<TestEntityMultiLink>
  | UpdateRequestBuilder<TestEntityMultiLink>
  | DeleteRequestBuilder<TestEntityMultiLink>
  | CreateRequestBuilder<TestEntityOtherMultiLink>
  | UpdateRequestBuilder<TestEntityOtherMultiLink>
  | DeleteRequestBuilder<TestEntityOtherMultiLink>
  | CreateRequestBuilder<TestEntityLvl2MultiLink>
  | UpdateRequestBuilder<TestEntityLvl2MultiLink>
  | DeleteRequestBuilder<TestEntityLvl2MultiLink>
  | CreateRequestBuilder<TestEntityLvl3MultiLink>
  | UpdateRequestBuilder<TestEntityLvl3MultiLink>
  | DeleteRequestBuilder<TestEntityLvl3MultiLink>
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
