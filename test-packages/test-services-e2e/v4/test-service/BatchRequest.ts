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
  BatchChangeSet
} from '@sap-cloud-sdk/odata-v4';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity, TestEntityLink } from './index';

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
    variadicArgumentToArray(first, rest)
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
  return new BatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultTestServicePath = '/odata/test-service';
export type ReadTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<TestEntity, DeSerializersT>
  | GetAllRequestBuilder<TestEntityLink, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityLink, DeSerializersT>;
export type WriteTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TestEntity, DeSerializersT>
  | UpdateRequestBuilder<TestEntity, DeSerializersT>
  | DeleteRequestBuilder<TestEntity, DeSerializersT>
  | CreateRequestBuilder<TestEntityLink, DeSerializersT>
  | UpdateRequestBuilder<TestEntityLink, DeSerializersT>
  | DeleteRequestBuilder<TestEntityLink, DeSerializersT>;
