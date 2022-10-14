import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder,
  FunctionImportRequestBuilder,
  ActionImportRequestBuilder,
  BatchChangeSet
} from '@sap-cloud-sdk/odata-v4';
import {
  TestEntity,
  TestEntityWithMultipleKeys,
  TestEntityLink,
  TestEntity50Prop,
  ConcatStringsParameters,
  GetAllParameters,
  GetByKeyParameters,
  GetByKeyWithMultipleKeysParameters,
  ReturnCollectionParameters,
  ReturnIntParameters,
  ReturnSapCloudSdkParameters,
  CreateTestEntityByIdParameters,
  CreateTestEntityByIdReturnIdParameters
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
export declare const defaultTestServicePath = '/odata/test-service';
export declare type ReadTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      TestEntityWithMultipleKeys<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<TestEntity50Prop<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      TestEntityWithMultipleKeys<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity50Prop<DeSerializersT>, DeSerializersT>
  | FunctionImportRequestBuilder<
      DeSerializersT,
      ConcatStringsParameters<DeSerializersT>,
      string
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      GetAllParameters<DeSerializersT>,
      TestEntity[]
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      GetByKeyParameters<DeSerializersT>,
      TestEntity
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      GetByKeyWithMultipleKeysParameters<DeSerializersT>,
      TestEntityWithMultipleKeys
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      ReturnCollectionParameters<DeSerializersT>,
      number[]
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      ReturnIntParameters<DeSerializersT>,
      number
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      ReturnSapCloudSdkParameters<DeSerializersT>,
      string
    >;
export declare type WriteTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      TestEntityWithMultipleKeys<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityWithMultipleKeys<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityWithMultipleKeys<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<TestEntity50Prop<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity50Prop<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity50Prop<DeSerializersT>, DeSerializersT>
  | ActionImportRequestBuilder<
      DeSerializersT,
      CreateTestEntityByIdParameters<DeSerializersT>,
      TestEntity
    >
  | ActionImportRequestBuilder<
      DeSerializersT,
      CreateTestEntityByIdReturnIdParameters<DeSerializersT>,
      number
    >;
//# sourceMappingURL=BatchRequest.d.ts.map
