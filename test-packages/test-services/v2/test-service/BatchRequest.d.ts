import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntityOtherMultiLink,
  TestEntityLvl2MultiLink,
  TestEntitySingleLink,
  TestEntityLvl2SingleLink,
  TestEntityWithSharedEntityType1,
  TestEntityWithSharedEntityType2,
  TestEntityCircularLinkParent,
  TestEntityCircularLinkChild,
  TestEntityEndsWith,
  TestEntityEndsWithSomethingElse,
  CaseTest,
  Casetest_1
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
export declare function batch(
  requests: Array<
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
  ...requests: Array<WriteTestServiceRequestBuilder>
): ODataBatchChangeSet<WriteTestServiceRequestBuilder>;
export declare function changeset(
  requests: Array<WriteTestServiceRequestBuilder>
): ODataBatchChangeSet<WriteTestServiceRequestBuilder>;
export declare const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
export declare type ReadTestServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity>
  | GetAllRequestBuilder<TestEntityMultiLink>
  | GetAllRequestBuilder<TestEntityOtherMultiLink>
  | GetAllRequestBuilder<TestEntityLvl2MultiLink>
  | GetAllRequestBuilder<TestEntitySingleLink>
  | GetAllRequestBuilder<TestEntityLvl2SingleLink>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType1>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType2>
  | GetAllRequestBuilder<TestEntityCircularLinkParent>
  | GetAllRequestBuilder<TestEntityCircularLinkChild>
  | GetAllRequestBuilder<TestEntityEndsWith>
  | GetAllRequestBuilder<TestEntityEndsWithSomethingElse>
  | GetAllRequestBuilder<CaseTest>
  | GetAllRequestBuilder<Casetest_1>
  | GetByKeyRequestBuilder<TestEntity>
  | GetByKeyRequestBuilder<TestEntityMultiLink>
  | GetByKeyRequestBuilder<TestEntityOtherMultiLink>
  | GetByKeyRequestBuilder<TestEntityLvl2MultiLink>
  | GetByKeyRequestBuilder<TestEntitySingleLink>
  | GetByKeyRequestBuilder<TestEntityLvl2SingleLink>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType1>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType2>
  | GetByKeyRequestBuilder<TestEntityCircularLinkParent>
  | GetByKeyRequestBuilder<TestEntityCircularLinkChild>
  | GetByKeyRequestBuilder<TestEntityEndsWith>
  | GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse>
  | GetByKeyRequestBuilder<CaseTest>
  | GetByKeyRequestBuilder<Casetest_1>;
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
  | CreateRequestBuilder<TestEntityWithSharedEntityType1>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType1>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType1>
  | CreateRequestBuilder<TestEntityWithSharedEntityType2>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType2>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType2>
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
  | DeleteRequestBuilder<TestEntityEndsWithSomethingElse>
  | CreateRequestBuilder<CaseTest>
  | UpdateRequestBuilder<CaseTest>
  | DeleteRequestBuilder<CaseTest>
  | CreateRequestBuilder<Casetest_1>
  | UpdateRequestBuilder<Casetest_1>
  | DeleteRequestBuilder<Casetest_1>;
//# sourceMappingURL=BatchRequest.d.ts.map
