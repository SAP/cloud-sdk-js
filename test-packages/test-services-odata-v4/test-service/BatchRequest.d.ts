/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
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
  TestEntityEndsWithSomethingElse,
  TestFunctionImportEdmReturnTypeParameters,
  TestFunctionImportEdmReturnTypeCollectionParameters,
  TestFunctionImportNullableTestParameters,
  TestFunctionImportEntityReturnTypeParameters,
  TestFunctionImportEntityReturnTypeCollectionParameters,
  TestFunctionImportSharedEntityReturnTypeParameters,
  TestFunctionImportSharedEntityReturnTypeCollectionParameters,
  TestFunctionImportComplexReturnTypeParameters,
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestFunctionImportMultipleParamsParameters,
  TestFunctionImportWithDifferentNameParameters,
  TestActionImportNoParameterNoReturnTypeParameters,
  TestActionImportMultipleParameterComplexReturnTypeParameters,
  TestActionImportUnsupportedEdmTypesParameters,
  TestActionImportNoParameterEntityReturnTypeParameters,
  TestActionImportSharedEntityReturnTypeParameters,
  TestActionImportSharedEntityReturnTypeCollectionParameters,
  TestActionImportNullableTestParameters,
  TestComplexType
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
export type ReadTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<TestEntityWithEnumKey<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      TestEntityWithSharedEntityType1<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      TestEntityWithSharedEntityType2<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      TestEntityOtherMultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      TestEntityLvl3MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      TestEntityLvl2SingleLink<DeSerializersT>,
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
  | GetByKeyRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      TestEntityWithEnumKey<DeSerializersT>,
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
  | GetByKeyRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      TestEntityOtherMultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      TestEntityLvl3MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      TestEntityLvl2SingleLink<DeSerializersT>,
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
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
      boolean
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
      string[]
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportNullableTestParameters<DeSerializersT>,
      string[] | null
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
      TestEntity
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
      TestEntity[]
    >
  | Omit<
      FunctionImportRequestBuilder<
        DeSerializersT,
        TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
        never
      >,
      'execute'
    >
  | Omit<
      FunctionImportRequestBuilder<
        DeSerializersT,
        TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
        never
      >,
      'execute'
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
      TestComplexType
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
      TestComplexType[]
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportMultipleParamsParameters<DeSerializersT>,
      boolean | null
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportWithDifferentNameParameters<DeSerializersT>,
      undefined
    >;
export type WriteTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<TestEntityWithEnumKey<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntityWithEnumKey<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntityWithEnumKey<DeSerializersT>, DeSerializersT>
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
  | CreateRequestBuilder<
      TestEntityLvl3MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      TestEntityLvl3MultiLink<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      TestEntityLvl3MultiLink<DeSerializersT>,
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
  | ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>,
      undefined
    >
  | ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>,
      TestComplexType
    >
  | ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>,
      any
    >
  | ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>,
      TestEntity
    >
  | Omit<
      ActionImportRequestBuilder<
        DeSerializersT,
        TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>,
        never
      >,
      'execute'
    >
  | Omit<
      ActionImportRequestBuilder<
        DeSerializersT,
        TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
        never
      >,
      'execute'
    >
  | ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportNullableTestParameters<DeSerializersT>,
      TestComplexType | null
    >;
//# sourceMappingURL=BatchRequest.d.ts.map
