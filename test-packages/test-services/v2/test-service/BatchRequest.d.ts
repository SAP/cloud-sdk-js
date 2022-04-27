import {
  CreateRequestBuilderV2,
  DeleteRequestBuilderV2,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  ODataBatchChangeSetV2,
  ODataBatchRequestBuilderV2,
  UpdateRequestBuilderV2
} from '@sap-cloud-sdk/core';
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
    | ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV2;
export declare function batch(
  requests: Array<
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV2;
/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: Array<WriteTestServiceRequestBuilder>
): ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>;
export declare function changeset(
  requests: Array<WriteTestServiceRequestBuilder>
): ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>;
export declare const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
export declare type ReadTestServiceRequestBuilder =
  | GetAllRequestBuilderV2<TestEntity>
  | GetAllRequestBuilderV2<TestEntityMultiLink>
  | GetAllRequestBuilderV2<TestEntityOtherMultiLink>
  | GetAllRequestBuilderV2<TestEntityLvl2MultiLink>
  | GetAllRequestBuilderV2<TestEntitySingleLink>
  | GetAllRequestBuilderV2<TestEntityLvl2SingleLink>
  | GetAllRequestBuilderV2<TestEntityWithSharedEntityType1>
  | GetAllRequestBuilderV2<TestEntityWithSharedEntityType2>
  | GetAllRequestBuilderV2<TestEntityCircularLinkParent>
  | GetAllRequestBuilderV2<TestEntityCircularLinkChild>
  | GetAllRequestBuilderV2<TestEntityEndsWith>
  | GetAllRequestBuilderV2<TestEntityEndsWithSomethingElse>
  | GetAllRequestBuilderV2<CaseTest>
  | GetAllRequestBuilderV2<Casetest_1>
  | GetByKeyRequestBuilderV2<TestEntity>
  | GetByKeyRequestBuilderV2<TestEntityMultiLink>
  | GetByKeyRequestBuilderV2<TestEntityOtherMultiLink>
  | GetByKeyRequestBuilderV2<TestEntityLvl2MultiLink>
  | GetByKeyRequestBuilderV2<TestEntitySingleLink>
  | GetByKeyRequestBuilderV2<TestEntityLvl2SingleLink>
  | GetByKeyRequestBuilderV2<TestEntityWithSharedEntityType1>
  | GetByKeyRequestBuilderV2<TestEntityWithSharedEntityType2>
  | GetByKeyRequestBuilderV2<TestEntityCircularLinkParent>
  | GetByKeyRequestBuilderV2<TestEntityCircularLinkChild>
  | GetByKeyRequestBuilderV2<TestEntityEndsWith>
  | GetByKeyRequestBuilderV2<TestEntityEndsWithSomethingElse>
  | GetByKeyRequestBuilderV2<CaseTest>
  | GetByKeyRequestBuilderV2<Casetest_1>;
export declare type WriteTestServiceRequestBuilder =
  | CreateRequestBuilderV2<TestEntity>
  | UpdateRequestBuilderV2<TestEntity>
  | DeleteRequestBuilderV2<TestEntity>
  | CreateRequestBuilderV2<TestEntityMultiLink>
  | UpdateRequestBuilderV2<TestEntityMultiLink>
  | DeleteRequestBuilderV2<TestEntityMultiLink>
  | CreateRequestBuilderV2<TestEntityOtherMultiLink>
  | UpdateRequestBuilderV2<TestEntityOtherMultiLink>
  | DeleteRequestBuilderV2<TestEntityOtherMultiLink>
  | CreateRequestBuilderV2<TestEntityLvl2MultiLink>
  | UpdateRequestBuilderV2<TestEntityLvl2MultiLink>
  | DeleteRequestBuilderV2<TestEntityLvl2MultiLink>
  | CreateRequestBuilderV2<TestEntitySingleLink>
  | UpdateRequestBuilderV2<TestEntitySingleLink>
  | DeleteRequestBuilderV2<TestEntitySingleLink>
  | CreateRequestBuilderV2<TestEntityLvl2SingleLink>
  | UpdateRequestBuilderV2<TestEntityLvl2SingleLink>
  | DeleteRequestBuilderV2<TestEntityLvl2SingleLink>
  | CreateRequestBuilderV2<TestEntityWithSharedEntityType1>
  | UpdateRequestBuilderV2<TestEntityWithSharedEntityType1>
  | DeleteRequestBuilderV2<TestEntityWithSharedEntityType1>
  | CreateRequestBuilderV2<TestEntityWithSharedEntityType2>
  | UpdateRequestBuilderV2<TestEntityWithSharedEntityType2>
  | DeleteRequestBuilderV2<TestEntityWithSharedEntityType2>
  | CreateRequestBuilderV2<TestEntityCircularLinkParent>
  | UpdateRequestBuilderV2<TestEntityCircularLinkParent>
  | DeleteRequestBuilderV2<TestEntityCircularLinkParent>
  | CreateRequestBuilderV2<TestEntityCircularLinkChild>
  | UpdateRequestBuilderV2<TestEntityCircularLinkChild>
  | DeleteRequestBuilderV2<TestEntityCircularLinkChild>
  | CreateRequestBuilderV2<TestEntityEndsWith>
  | UpdateRequestBuilderV2<TestEntityEndsWith>
  | DeleteRequestBuilderV2<TestEntityEndsWith>
  | CreateRequestBuilderV2<TestEntityEndsWithSomethingElse>
  | UpdateRequestBuilderV2<TestEntityEndsWithSomethingElse>
  | DeleteRequestBuilderV2<TestEntityEndsWithSomethingElse>
  | CreateRequestBuilderV2<CaseTest>
  | UpdateRequestBuilderV2<CaseTest>
  | DeleteRequestBuilderV2<CaseTest>
  | CreateRequestBuilderV2<Casetest_1>
  | UpdateRequestBuilderV2<Casetest_1>
  | DeleteRequestBuilderV2<Casetest_1>;
//# sourceMappingURL=BatchRequest.d.ts.map
