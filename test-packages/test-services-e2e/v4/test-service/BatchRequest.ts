/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity, TestEntityLink } from './index';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(
  ...requests: Array<
    | ReadTestServiceRequestBuilder
    | BatchChangeSet<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  requests: Array<
    | ReadTestServiceRequestBuilder
    | BatchChangeSet<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  first:
    | undefined
    | ReadTestServiceRequestBuilder
    | BatchChangeSet<WriteTestServiceRequestBuilder>
    | Array<
        | ReadTestServiceRequestBuilder
        | BatchChangeSet<WriteTestServiceRequestBuilder>
      >,
  ...rest: Array<
    | ReadTestServiceRequestBuilder
    | BatchChangeSet<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(
    defaultTestServicePath,
    variadicArgumentToArray(first, rest),
    map
  );
}

/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(
  ...requests: Array<WriteTestServiceRequestBuilder>
): BatchChangeSet<WriteTestServiceRequestBuilder>;
export function changeset(
  requests: Array<WriteTestServiceRequestBuilder>
): BatchChangeSet<WriteTestServiceRequestBuilder>;
export function changeset(
  first:
    | undefined
    | WriteTestServiceRequestBuilder
    | Array<WriteTestServiceRequestBuilder>,
  ...rest: Array<WriteTestServiceRequestBuilder>
): BatchChangeSet<WriteTestServiceRequestBuilder> {
  return new BatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultTestServicePath = '/odata/test-service';
const map = { TestEntity: TestEntity, TestEntityLink: TestEntityLink };
export type ReadTestServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity>
  | GetAllRequestBuilder<TestEntityLink>
  | GetByKeyRequestBuilder<TestEntity>
  | GetByKeyRequestBuilder<TestEntityLink>;
export type WriteTestServiceRequestBuilder =
  | CreateRequestBuilder<TestEntity>
  | UpdateRequestBuilder<TestEntity>
  | DeleteRequestBuilder<TestEntity>
  | CreateRequestBuilder<TestEntityLink>
  | UpdateRequestBuilder<TestEntityLink>
  | DeleteRequestBuilder<TestEntityLink>;
