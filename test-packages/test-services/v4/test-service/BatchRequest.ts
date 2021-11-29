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
  TestEntityEndsWithSomethingElse
} from './index';
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

export const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const map = {
  A_TestEntity: TestEntity,
  A_TestEntityWithEnumKey: TestEntityWithEnumKey,
  A_TestEntityWithSharedEntityType1: TestEntityWithSharedEntityType1,
  A_TestEntityWithSharedEntityType2: TestEntityWithSharedEntityType2,
  A_TestEntityMultiLink: TestEntityMultiLink,
  A_TestEntityOtherMultiLink: TestEntityOtherMultiLink,
  A_TestEntityLvl2MultiLink: TestEntityLvl2MultiLink,
  A_TestEntityLvl3MultiLink: TestEntityLvl3MultiLink,
  A_TestEntitySingleLink: TestEntitySingleLink,
  A_TestEntityLvl2SingleLink: TestEntityLvl2SingleLink,
  A_TestEntityCircularLinkParent: TestEntityCircularLinkParent,
  A_TestEntityCircularLinkChild: TestEntityCircularLinkChild,
  A_TestEntityEndsWithCollection: TestEntityEndsWith,
  A_TestEntityEndsWithSomethingElse: TestEntityEndsWithSomethingElse
};
export type ReadTestServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity>
  | GetAllRequestBuilder<TestEntityWithEnumKey>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType1>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType2>
  | GetAllRequestBuilder<TestEntityMultiLink>
  | GetAllRequestBuilder<TestEntityOtherMultiLink>
  | GetAllRequestBuilder<TestEntityLvl2MultiLink>
  | GetAllRequestBuilder<TestEntityLvl3MultiLink>
  | GetAllRequestBuilder<TestEntitySingleLink>
  | GetAllRequestBuilder<TestEntityLvl2SingleLink>
  | GetAllRequestBuilder<TestEntityCircularLinkParent>
  | GetAllRequestBuilder<TestEntityCircularLinkChild>
  | GetAllRequestBuilder<TestEntityEndsWith>
  | GetAllRequestBuilder<TestEntityEndsWithSomethingElse>
  | GetByKeyRequestBuilder<TestEntity>
  | GetByKeyRequestBuilder<TestEntityWithEnumKey>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType1>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType2>
  | GetByKeyRequestBuilder<TestEntityMultiLink>
  | GetByKeyRequestBuilder<TestEntityOtherMultiLink>
  | GetByKeyRequestBuilder<TestEntityLvl2MultiLink>
  | GetByKeyRequestBuilder<TestEntityLvl3MultiLink>
  | GetByKeyRequestBuilder<TestEntitySingleLink>
  | GetByKeyRequestBuilder<TestEntityLvl2SingleLink>
  | GetByKeyRequestBuilder<TestEntityCircularLinkParent>
  | GetByKeyRequestBuilder<TestEntityCircularLinkChild>
  | GetByKeyRequestBuilder<TestEntityEndsWith>
  | GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse>;
export type WriteTestServiceRequestBuilder =
  | CreateRequestBuilder<TestEntity>
  | UpdateRequestBuilder<TestEntity>
  | DeleteRequestBuilder<TestEntity>
  | CreateRequestBuilder<TestEntityWithEnumKey>
  | UpdateRequestBuilder<TestEntityWithEnumKey>
  | DeleteRequestBuilder<TestEntityWithEnumKey>
  | CreateRequestBuilder<TestEntityWithSharedEntityType1>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType1>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType1>
  | CreateRequestBuilder<TestEntityWithSharedEntityType2>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType2>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType2>
  | CreateRequestBuilder<TestEntityMultiLink>
  | UpdateRequestBuilder<TestEntityMultiLink>
  | DeleteRequestBuilder<TestEntityMultiLink>
  | CreateRequestBuilder<TestEntityOtherMultiLink>
  | UpdateRequestBuilder<TestEntityOtherMultiLink>
  | DeleteRequestBuilder<TestEntityOtherMultiLink>
  | CreateRequestBuilder<TestEntityLvl2MultiLink>
  | UpdateRequestBuilder<TestEntityLvl2MultiLink>
  | DeleteRequestBuilder<TestEntityLvl2MultiLink>
  | CreateRequestBuilder<TestEntityLvl3MultiLink>
  | UpdateRequestBuilder<TestEntityLvl3MultiLink>
  | DeleteRequestBuilder<TestEntityLvl3MultiLink>
  | CreateRequestBuilder<TestEntitySingleLink>
  | UpdateRequestBuilder<TestEntitySingleLink>
  | DeleteRequestBuilder<TestEntitySingleLink>
  | CreateRequestBuilder<TestEntityLvl2SingleLink>
  | UpdateRequestBuilder<TestEntityLvl2SingleLink>
  | DeleteRequestBuilder<TestEntityLvl2SingleLink>
  | CreateRequestBuilder<TestEntityCircularLinkParent>
  | UpdateRequestBuilder<TestEntityCircularLinkParent>
  | DeleteRequestBuilder<TestEntityCircularLinkParent>
  | CreateRequestBuilder<TestEntityCircularLinkChild>
  | UpdateRequestBuilder<TestEntityCircularLinkChild>
  | DeleteRequestBuilder<TestEntityCircularLinkChild>
  | CreateRequestBuilder<TestEntityEndsWith>
  | UpdateRequestBuilder<TestEntityEndsWith>
  | DeleteRequestBuilder<TestEntityEndsWith>
  | CreateRequestBuilder<TestEntityEndsWithSomethingElse>
  | UpdateRequestBuilder<TestEntityEndsWithSomethingElse>
  | DeleteRequestBuilder<TestEntityEndsWithSomethingElse>;
