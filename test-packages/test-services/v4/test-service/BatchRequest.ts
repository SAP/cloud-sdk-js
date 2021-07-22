/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilderV4,
  DeleteRequestBuilderV4,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  ODataBatchChangeSetV4,
  ODataBatchRequestBuilderV4,
  UpdateRequestBuilderV4
} from '@sap-cloud-sdk/core';
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

/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(
  ...requests: Array<
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV4;
export function batch(
  requests: Array<
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV4;
export function batch(
  first:
    | undefined
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>
    | Array<
        | ReadTestServiceRequestBuilder
        | ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>
      >,
  ...rest: Array<
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV4 {
  return new ODataBatchRequestBuilderV4(
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
): ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>;
export function changeset(
  requests: Array<WriteTestServiceRequestBuilder>
): ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>;
export function changeset(
  first:
    | undefined
    | WriteTestServiceRequestBuilder
    | Array<WriteTestServiceRequestBuilder>,
  ...rest: Array<WriteTestServiceRequestBuilder>
): ODataBatchChangeSetV4<WriteTestServiceRequestBuilder> {
  return new ODataBatchChangeSetV4(variadicArgumentToArray(first, rest));
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
  | GetAllRequestBuilderV4<TestEntity>
  | GetAllRequestBuilderV4<TestEntityWithEnumKey>
  | GetAllRequestBuilderV4<TestEntityWithSharedEntityType1>
  | GetAllRequestBuilderV4<TestEntityWithSharedEntityType2>
  | GetAllRequestBuilderV4<TestEntityMultiLink>
  | GetAllRequestBuilderV4<TestEntityOtherMultiLink>
  | GetAllRequestBuilderV4<TestEntityLvl2MultiLink>
  | GetAllRequestBuilderV4<TestEntityLvl3MultiLink>
  | GetAllRequestBuilderV4<TestEntitySingleLink>
  | GetAllRequestBuilderV4<TestEntityLvl2SingleLink>
  | GetAllRequestBuilderV4<TestEntityCircularLinkParent>
  | GetAllRequestBuilderV4<TestEntityCircularLinkChild>
  | GetAllRequestBuilderV4<TestEntityEndsWith>
  | GetAllRequestBuilderV4<TestEntityEndsWithSomethingElse>
  | GetByKeyRequestBuilderV4<TestEntity>
  | GetByKeyRequestBuilderV4<TestEntityWithEnumKey>
  | GetByKeyRequestBuilderV4<TestEntityWithSharedEntityType1>
  | GetByKeyRequestBuilderV4<TestEntityWithSharedEntityType2>
  | GetByKeyRequestBuilderV4<TestEntityMultiLink>
  | GetByKeyRequestBuilderV4<TestEntityOtherMultiLink>
  | GetByKeyRequestBuilderV4<TestEntityLvl2MultiLink>
  | GetByKeyRequestBuilderV4<TestEntityLvl3MultiLink>
  | GetByKeyRequestBuilderV4<TestEntitySingleLink>
  | GetByKeyRequestBuilderV4<TestEntityLvl2SingleLink>
  | GetByKeyRequestBuilderV4<TestEntityCircularLinkParent>
  | GetByKeyRequestBuilderV4<TestEntityCircularLinkChild>
  | GetByKeyRequestBuilderV4<TestEntityEndsWith>
  | GetByKeyRequestBuilderV4<TestEntityEndsWithSomethingElse>;
export type WriteTestServiceRequestBuilder =
  | CreateRequestBuilderV4<TestEntity>
  | UpdateRequestBuilderV4<TestEntity>
  | DeleteRequestBuilderV4<TestEntity>
  | CreateRequestBuilderV4<TestEntityWithEnumKey>
  | UpdateRequestBuilderV4<TestEntityWithEnumKey>
  | DeleteRequestBuilderV4<TestEntityWithEnumKey>
  | CreateRequestBuilderV4<TestEntityWithSharedEntityType1>
  | UpdateRequestBuilderV4<TestEntityWithSharedEntityType1>
  | DeleteRequestBuilderV4<TestEntityWithSharedEntityType1>
  | CreateRequestBuilderV4<TestEntityWithSharedEntityType2>
  | UpdateRequestBuilderV4<TestEntityWithSharedEntityType2>
  | DeleteRequestBuilderV4<TestEntityWithSharedEntityType2>
  | CreateRequestBuilderV4<TestEntityMultiLink>
  | UpdateRequestBuilderV4<TestEntityMultiLink>
  | DeleteRequestBuilderV4<TestEntityMultiLink>
  | CreateRequestBuilderV4<TestEntityOtherMultiLink>
  | UpdateRequestBuilderV4<TestEntityOtherMultiLink>
  | DeleteRequestBuilderV4<TestEntityOtherMultiLink>
  | CreateRequestBuilderV4<TestEntityLvl2MultiLink>
  | UpdateRequestBuilderV4<TestEntityLvl2MultiLink>
  | DeleteRequestBuilderV4<TestEntityLvl2MultiLink>
  | CreateRequestBuilderV4<TestEntityLvl3MultiLink>
  | UpdateRequestBuilderV4<TestEntityLvl3MultiLink>
  | DeleteRequestBuilderV4<TestEntityLvl3MultiLink>
  | CreateRequestBuilderV4<TestEntitySingleLink>
  | UpdateRequestBuilderV4<TestEntitySingleLink>
  | DeleteRequestBuilderV4<TestEntitySingleLink>
  | CreateRequestBuilderV4<TestEntityLvl2SingleLink>
  | UpdateRequestBuilderV4<TestEntityLvl2SingleLink>
  | DeleteRequestBuilderV4<TestEntityLvl2SingleLink>
  | CreateRequestBuilderV4<TestEntityCircularLinkParent>
  | UpdateRequestBuilderV4<TestEntityCircularLinkParent>
  | DeleteRequestBuilderV4<TestEntityCircularLinkParent>
  | CreateRequestBuilderV4<TestEntityCircularLinkChild>
  | UpdateRequestBuilderV4<TestEntityCircularLinkChild>
  | DeleteRequestBuilderV4<TestEntityCircularLinkChild>
  | CreateRequestBuilderV4<TestEntityEndsWith>
  | UpdateRequestBuilderV4<TestEntityEndsWith>
  | DeleteRequestBuilderV4<TestEntityEndsWith>
  | CreateRequestBuilderV4<TestEntityEndsWithSomethingElse>
  | UpdateRequestBuilderV4<TestEntityEndsWithSomethingElse>
  | DeleteRequestBuilderV4<TestEntityEndsWithSomethingElse>;
