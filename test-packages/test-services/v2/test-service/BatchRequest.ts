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
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntityOtherMultiLink,
  TestEntityLvl2MultiLink,
  TestEntitySingleLink,
  TestEntityLvl2SingleLink,
  TestEntityWithSharedEntityType1,
  TestEntityWithSharedEntityType2,
  TestEntityCircularLinkParent,
  TestEntityCircularLinkChild,
  TestEntityEndsWith,
  TestEntityEndsWithSomethingElse,
  CaseTest,
  Casetest_1
} from './index';

/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(
  ...requests: Array<
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSet<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  requests: Array<
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSet<WriteTestServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  first:
    | undefined
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSet<WriteTestServiceRequestBuilder>
    | Array<
        | ReadTestServiceRequestBuilder
        | ODataBatchChangeSet<WriteTestServiceRequestBuilder>
      >,
  ...rest: Array<
    | ReadTestServiceRequestBuilder
    | ODataBatchChangeSet<WriteTestServiceRequestBuilder>
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
): ODataBatchChangeSet<WriteTestServiceRequestBuilder>;
export function changeset(
  requests: Array<WriteTestServiceRequestBuilder>
): ODataBatchChangeSet<WriteTestServiceRequestBuilder>;
export function changeset(
  first:
    | undefined
    | WriteTestServiceRequestBuilder
    | Array<WriteTestServiceRequestBuilder>,
  ...rest: Array<WriteTestServiceRequestBuilder>
): ODataBatchChangeSet<WriteTestServiceRequestBuilder> {
  return new ODataBatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const map = {
  A_TestEntity: TestEntity,
  A_TestEntityMultiLink: TestEntityMultiLink,
  A_TestEntityOtherMultiLink: TestEntityOtherMultiLink,
  A_TestEntityLvl2MultiLink: TestEntityLvl2MultiLink,
  A_TestEntitySingleLink: TestEntitySingleLink,
  A_TestEntityLvl2SingleLink: TestEntityLvl2SingleLink,
  A_TestEntityWithSharedEntityType1: TestEntityWithSharedEntityType1,
  A_TestEntityWithSharedEntityType2: TestEntityWithSharedEntityType2,
  A_TestEntityCircularLinkParent: TestEntityCircularLinkParent,
  A_TestEntityCircularLinkChild: TestEntityCircularLinkChild,
  A_TestEntityEndsWithCollection: TestEntityEndsWith,
  A_TestEntityEndsWithSomethingElse: TestEntityEndsWithSomethingElse,
  A_CaseTest: CaseTest,
  A_CASETEST: Casetest_1
};
export type ReadTestServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity>
  | GetAllRequestBuilder<TestEntityMultiLink>
  | GetAllRequestBuilder<TestEntityOtherMultiLink>
  | GetAllRequestBuilder<TestEntityLvl2MultiLink>
  | GetAllRequestBuilder<TestEntitySingleLink>
  | GetAllRequestBuilder<TestEntityLvl2SingleLink>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType1>
  | GetAllRequestBuilder<TestEntityWithSharedEntityType2>
  | GetAllRequestBuilder<TestEntityCircularLinkParent>
  | GetAllRequestBuilder<TestEntityCircularLinkChild>
  | GetAllRequestBuilder<TestEntityEndsWith>
  | GetAllRequestBuilder<TestEntityEndsWithSomethingElse>
  | GetAllRequestBuilder<CaseTest>
  | GetAllRequestBuilder<Casetest_1>
  | GetByKeyRequestBuilder<TestEntity>
  | GetByKeyRequestBuilder<TestEntityMultiLink>
  | GetByKeyRequestBuilder<TestEntityOtherMultiLink>
  | GetByKeyRequestBuilder<TestEntityLvl2MultiLink>
  | GetByKeyRequestBuilder<TestEntitySingleLink>
  | GetByKeyRequestBuilder<TestEntityLvl2SingleLink>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType1>
  | GetByKeyRequestBuilder<TestEntityWithSharedEntityType2>
  | GetByKeyRequestBuilder<TestEntityCircularLinkParent>
  | GetByKeyRequestBuilder<TestEntityCircularLinkChild>
  | GetByKeyRequestBuilder<TestEntityEndsWith>
  | GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse>
  | GetByKeyRequestBuilder<CaseTest>
  | GetByKeyRequestBuilder<Casetest_1>;
export type WriteTestServiceRequestBuilder =
  | CreateRequestBuilder<TestEntity>
  | UpdateRequestBuilder<TestEntity>
  | DeleteRequestBuilder<TestEntity>
  | CreateRequestBuilder<TestEntityMultiLink>
  | UpdateRequestBuilder<TestEntityMultiLink>
  | DeleteRequestBuilder<TestEntityMultiLink>
  | CreateRequestBuilder<TestEntityOtherMultiLink>
  | UpdateRequestBuilder<TestEntityOtherMultiLink>
  | DeleteRequestBuilder<TestEntityOtherMultiLink>
  | CreateRequestBuilder<TestEntityLvl2MultiLink>
  | UpdateRequestBuilder<TestEntityLvl2MultiLink>
  | DeleteRequestBuilder<TestEntityLvl2MultiLink>
  | CreateRequestBuilder<TestEntitySingleLink>
  | UpdateRequestBuilder<TestEntitySingleLink>
  | DeleteRequestBuilder<TestEntitySingleLink>
  | CreateRequestBuilder<TestEntityLvl2SingleLink>
  | UpdateRequestBuilder<TestEntityLvl2SingleLink>
  | DeleteRequestBuilder<TestEntityLvl2SingleLink>
  | CreateRequestBuilder<TestEntityWithSharedEntityType1>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType1>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType1>
  | CreateRequestBuilder<TestEntityWithSharedEntityType2>
  | UpdateRequestBuilder<TestEntityWithSharedEntityType2>
  | DeleteRequestBuilder<TestEntityWithSharedEntityType2>
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
  | DeleteRequestBuilder<TestEntityEndsWithSomethingElse>
  | CreateRequestBuilder<CaseTest>
  | UpdateRequestBuilder<CaseTest>
  | DeleteRequestBuilder<CaseTest>
  | CreateRequestBuilder<Casetest_1>
  | UpdateRequestBuilder<Casetest_1>
  | DeleteRequestBuilder<Casetest_1>;
