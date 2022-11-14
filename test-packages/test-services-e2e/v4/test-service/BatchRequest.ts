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
export function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadTestServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadTestServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | ReadTestServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
    | Array<
        | ReadTestServiceRequestBuilder<DeSerializersT>
        | BatchChangeSet<DeSerializersT>
      >,
  ...rest: Array<
    | ReadTestServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT> {
  return new ODataBatchRequestBuilder(
    defaultTestServicePath,
    transformVariadicArgumentToArray(first, rest)
  );
}

/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<WriteTestServiceRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteTestServiceRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | WriteTestServiceRequestBuilder<DeSerializersT>
    | Array<WriteTestServiceRequestBuilder<DeSerializersT>>,
  ...rest: Array<WriteTestServiceRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(transformVariadicArgumentToArray(first, rest));
}

export const defaultTestServicePath = '/odata/test-service';
export type ReadTestServiceRequestBuilder<
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
export type WriteTestServiceRequestBuilder<
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
