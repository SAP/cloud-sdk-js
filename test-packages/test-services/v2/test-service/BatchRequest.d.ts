import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder,
  BatchChangeSet
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
  | GetAllRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      TestEntityOtherMultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      TestEntityLvl2SingleLink<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      TestEntityWithSharedEntityType1<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      TestEntityWithSharedEntityType2<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      TestEntityCircularLinkChild<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<TestEntityEndsWith<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      TestEntityEndsWithSomethingElse<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<CaseTest<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<Casetest_1<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      TestEntityOtherMultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      TestEntityLvl2SingleLink<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      TestEntityWithSharedEntityType1<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      TestEntityWithSharedEntityType2<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      TestEntityCircularLinkChild<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<TestEntityEndsWith<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      TestEntityEndsWithSomethingElse<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<CaseTest<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<Casetest_1<DeSerializersT>, DeSerializersT>;
export declare type WriteTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      TestEntityOtherMultiLink<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityOtherMultiLink<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityOtherMultiLink<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      TestEntityLvl2SingleLink<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityLvl2SingleLink<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityLvl2SingleLink<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      TestEntityWithSharedEntityType1<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityWithSharedEntityType1<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityWithSharedEntityType1<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      TestEntityWithSharedEntityType2<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityWithSharedEntityType2<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityWithSharedEntityType2<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      TestEntityCircularLinkChild<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityCircularLinkChild<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityCircularLinkChild<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<TestEntityEndsWith<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntityEndsWith<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntityEndsWith<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      TestEntityEndsWithSomethingElse<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityEndsWithSomethingElse<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityEndsWithSomethingElse<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<CaseTest<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<CaseTest<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<CaseTest<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<Casetest_1<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<Casetest_1<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<Casetest_1<DeSerializersT>, DeSerializersT>;
//# sourceMappingURL=BatchRequest.d.ts.map
