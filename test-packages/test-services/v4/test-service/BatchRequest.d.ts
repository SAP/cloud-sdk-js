import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  DeSerializers,
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
export declare function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadTestServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadTestServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<WriteTestServiceRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteTestServiceRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
export declare type ReadTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<TestEntity, DeSerializersT>
  | GetAllRequestBuilder<TestEntityWithEnumKey, DeSerializersT>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT>
  | GetAllRequestBuilder<TestEntityMultiLink, DeSerializersT>
  | GetAllRequestBuilder<TestEntityOtherMultiLink, DeSerializersT>
  | GetAllRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT>
  | GetAllRequestBuilder<TestEntityLvl3MultiLink, DeSerializersT>
  | GetAllRequestBuilder<TestEntitySingleLink, DeSerializersT>
  | GetAllRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT>
  | GetAllRequestBuilder<TestEntityCircularLinkParent, DeSerializersT>
  | GetAllRequestBuilder<TestEntityCircularLinkChild, DeSerializersT>
  | GetAllRequestBuilder<TestEntityEndsWith, DeSerializersT>
  | GetAllRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityWithEnumKey, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityMultiLink, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityOtherMultiLink, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityLvl3MultiLink, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntitySingleLink, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityCircularLinkParent, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityCircularLinkChild, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityEndsWith, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT>;
export declare type WriteTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TestEntity, DeSerializersT>
  | UpdateRequestBuilder<TestEntity, DeSerializersT>
  | DeleteRequestBuilder<TestEntity, DeSerializersT>
  | CreateRequestBuilder<TestEntityWithEnumKey, DeSerializersT>
  | UpdateRequestBuilder<TestEntityWithEnumKey, DeSerializersT>
  | DeleteRequestBuilder<TestEntityWithEnumKey, DeSerializersT>
  | CreateRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT>
  | CreateRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT>
  | CreateRequestBuilder<TestEntityMultiLink, DeSerializersT>
  | UpdateRequestBuilder<TestEntityMultiLink, DeSerializersT>
  | DeleteRequestBuilder<TestEntityMultiLink, DeSerializersT>
  | CreateRequestBuilder<TestEntityOtherMultiLink, DeSerializersT>
  | UpdateRequestBuilder<TestEntityOtherMultiLink, DeSerializersT>
  | DeleteRequestBuilder<TestEntityOtherMultiLink, DeSerializersT>
  | CreateRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT>
  | UpdateRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT>
  | DeleteRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT>
  | CreateRequestBuilder<TestEntityLvl3MultiLink, DeSerializersT>
  | UpdateRequestBuilder<TestEntityLvl3MultiLink, DeSerializersT>
  | DeleteRequestBuilder<TestEntityLvl3MultiLink, DeSerializersT>
  | CreateRequestBuilder<TestEntitySingleLink, DeSerializersT>
  | UpdateRequestBuilder<TestEntitySingleLink, DeSerializersT>
  | DeleteRequestBuilder<TestEntitySingleLink, DeSerializersT>
  | CreateRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT>
  | UpdateRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT>
  | DeleteRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT>
  | CreateRequestBuilder<TestEntityCircularLinkParent, DeSerializersT>
  | UpdateRequestBuilder<TestEntityCircularLinkParent, DeSerializersT>
  | DeleteRequestBuilder<TestEntityCircularLinkParent, DeSerializersT>
  | CreateRequestBuilder<TestEntityCircularLinkChild, DeSerializersT>
  | UpdateRequestBuilder<TestEntityCircularLinkChild, DeSerializersT>
  | DeleteRequestBuilder<TestEntityCircularLinkChild, DeSerializersT>
  | CreateRequestBuilder<TestEntityEndsWith, DeSerializersT>
  | UpdateRequestBuilder<TestEntityEndsWith, DeSerializersT>
  | DeleteRequestBuilder<TestEntityEndsWith, DeSerializersT>
  | CreateRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT>
  | UpdateRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT>
  | DeleteRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT>;
//# sourceMappingURL=BatchRequest.d.ts.map
