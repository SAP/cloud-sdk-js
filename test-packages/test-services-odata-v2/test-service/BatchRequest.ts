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
} from '@sap-cloud-sdk/odata-v2';
import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity, TestEntityMultiLink, TestEntitySingleLink } from './index';

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

export const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
export type ReadTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      TestEntitySingleLink<DeSerializersT>,
      DeSerializersT
    >;
export type WriteTestServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TestEntitySingleLink<DeSerializersT>, DeSerializersT>;
