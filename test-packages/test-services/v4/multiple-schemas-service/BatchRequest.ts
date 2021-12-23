/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
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
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity1, TestEntity2, TestEntity3, TestEntity4 } from './index';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';

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
    variadicArgumentToArray(first, rest)
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
  return new BatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultMultipleSchemasServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
export type ReadMultipleSchemasServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<TestEntity1, DeSerializersT>
  | GetAllRequestBuilder<TestEntity2, DeSerializersT>
  | GetAllRequestBuilder<TestEntity3, DeSerializersT>
  | GetAllRequestBuilder<TestEntity4, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity1, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity2, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity3, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity4, DeSerializersT>;
export type WriteMultipleSchemasServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TestEntity1, DeSerializersT>
  | UpdateRequestBuilder<TestEntity1, DeSerializersT>
  | DeleteRequestBuilder<TestEntity1, DeSerializersT>
  | CreateRequestBuilder<TestEntity2, DeSerializersT>
  | UpdateRequestBuilder<TestEntity2, DeSerializersT>
  | DeleteRequestBuilder<TestEntity2, DeSerializersT>
  | CreateRequestBuilder<TestEntity3, DeSerializersT>
  | UpdateRequestBuilder<TestEntity3, DeSerializersT>
  | DeleteRequestBuilder<TestEntity3, DeSerializersT>
  | CreateRequestBuilder<TestEntity4, DeSerializersT>
  | UpdateRequestBuilder<TestEntity4, DeSerializersT>
  | DeleteRequestBuilder<TestEntity4, DeSerializersT>;
