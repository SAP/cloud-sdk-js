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
import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  TestEntity1,
  TestEntity2,
  TestEntity3,
  TestEntity4,
  TestFunctionImportEntityReturnType1Parameters,
  TestFunctionImportEntityReturnType2Parameters,
  TestActionImportNoParameterComplexReturnType1Parameters,
  TestActionImportNoParameterComplexReturnType2Parameters,
  TestComplexType1,
  TestComplexType2
} from './index';

/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadMultipleSchemasServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadMultipleSchemasServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | ReadMultipleSchemasServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
    | Array<
        | ReadMultipleSchemasServiceRequestBuilder<DeSerializersT>
        | BatchChangeSet<DeSerializersT>
      >,
  ...rest: Array<
    | ReadMultipleSchemasServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT> {
  return new ODataBatchRequestBuilder(
    defaultMultipleSchemasServicePath,
    transformVariadicArgumentToArray(first, rest)
  );
}

/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<WriteMultipleSchemasServiceRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteMultipleSchemasServiceRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | WriteMultipleSchemasServiceRequestBuilder<DeSerializersT>
    | Array<WriteMultipleSchemasServiceRequestBuilder<DeSerializersT>>,
  ...rest: Array<WriteMultipleSchemasServiceRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(transformVariadicArgumentToArray(first, rest));
}

export const defaultMultipleSchemasServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
export type ReadMultipleSchemasServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<TestEntity1<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<TestEntity2<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<TestEntity3<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<TestEntity4<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity1<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity2<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity3<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity4<DeSerializersT>, DeSerializersT>
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnType1Parameters<DeSerializersT>,
      TestEntity1
    >
  | FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnType2Parameters<DeSerializersT>,
      TestEntity2
    >;
export type WriteMultipleSchemasServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TestEntity1<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity1<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity1<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<TestEntity2<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity2<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity2<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<TestEntity3<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity3<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity3<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<TestEntity4<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity4<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity4<DeSerializersT>, DeSerializersT>
  | ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportNoParameterComplexReturnType1Parameters<DeSerializersT>,
      TestComplexType1
    >
  | ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportNoParameterComplexReturnType2Parameters<DeSerializersT>,
      TestComplexType2
    >;
