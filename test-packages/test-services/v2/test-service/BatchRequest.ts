/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity, TestEntityMultiLink, TestEntityOtherMultiLink, TestEntityLvl2MultiLink, TestEntitySingleLink, TestEntityLvl2SingleLink, TestEntityWithSharedEntityType1, TestEntityWithSharedEntityType2, TestEntityCircularLinkParent, TestEntityCircularLinkChild, TestEntityEndsWith, TestEntityEndsWithSomethingElse, CaseTest, Casetest_1 } from './index';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch<DeSerializersT extends DeSerializers>(...requests: Array<ReadTestServiceRequestBuilder<DeSerializersT> | BatchChangeSet<DeSerializersT>>): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(requests: Array<ReadTestServiceRequestBuilder<DeSerializersT> | BatchChangeSet<DeSerializersT>>): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(first: undefined | ReadTestServiceRequestBuilder<DeSerializersT> | BatchChangeSet<DeSerializersT> | Array<ReadTestServiceRequestBuilder<DeSerializersT> | BatchChangeSet<DeSerializersT>>, ...rest: Array<ReadTestServiceRequestBuilder<DeSerializersT> | BatchChangeSet<DeSerializersT>>): ODataBatchRequestBuilder<DeSerializersT> {
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
export function changeset<DeSerializersT extends DeSerializers>(...requests: Array<WriteTestServiceRequestBuilder<DeSerializersT>>): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(requests: Array<WriteTestServiceRequestBuilder<DeSerializersT>>): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(first: undefined | WriteTestServiceRequestBuilder<DeSerializersT> | Array<WriteTestServiceRequestBuilder<DeSerializersT>>, ...rest: Array<WriteTestServiceRequestBuilder<DeSerializersT>>): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
export type ReadTestServiceRequestBuilder<DeSerializersT extends DeSerializers> = GetAllRequestBuilder<TestEntity, DeSerializersT> | GetAllRequestBuilder<TestEntityMultiLink, DeSerializersT> | GetAllRequestBuilder<TestEntityOtherMultiLink, DeSerializersT> | GetAllRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT> | GetAllRequestBuilder<TestEntitySingleLink, DeSerializersT> | GetAllRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT> | GetAllRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT> | GetAllRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT> | GetAllRequestBuilder<TestEntityCircularLinkParent, DeSerializersT> | GetAllRequestBuilder<TestEntityCircularLinkChild, DeSerializersT> | GetAllRequestBuilder<TestEntityEndsWith, DeSerializersT> | GetAllRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT> | GetAllRequestBuilder<CaseTest, DeSerializersT> | GetAllRequestBuilder<Casetest_1, DeSerializersT> | GetByKeyRequestBuilder<TestEntity, DeSerializersT> | GetByKeyRequestBuilder<TestEntityMultiLink, DeSerializersT> | GetByKeyRequestBuilder<TestEntityOtherMultiLink, DeSerializersT> | GetByKeyRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT> | GetByKeyRequestBuilder<TestEntitySingleLink, DeSerializersT> | GetByKeyRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT> | GetByKeyRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT> | GetByKeyRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT> | GetByKeyRequestBuilder<TestEntityCircularLinkParent, DeSerializersT> | GetByKeyRequestBuilder<TestEntityCircularLinkChild, DeSerializersT> | GetByKeyRequestBuilder<TestEntityEndsWith, DeSerializersT> | GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT> | GetByKeyRequestBuilder<CaseTest, DeSerializersT> | GetByKeyRequestBuilder<Casetest_1, DeSerializersT>;
export type WriteTestServiceRequestBuilder<DeSerializersT extends DeSerializers> = CreateRequestBuilder<TestEntity, DeSerializersT> | UpdateRequestBuilder<TestEntity, DeSerializersT> | DeleteRequestBuilder<TestEntity, DeSerializersT> | CreateRequestBuilder<TestEntityMultiLink, DeSerializersT> | UpdateRequestBuilder<TestEntityMultiLink, DeSerializersT> | DeleteRequestBuilder<TestEntityMultiLink, DeSerializersT> | CreateRequestBuilder<TestEntityOtherMultiLink, DeSerializersT> | UpdateRequestBuilder<TestEntityOtherMultiLink, DeSerializersT> | DeleteRequestBuilder<TestEntityOtherMultiLink, DeSerializersT> | CreateRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT> | UpdateRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT> | DeleteRequestBuilder<TestEntityLvl2MultiLink, DeSerializersT> | CreateRequestBuilder<TestEntitySingleLink, DeSerializersT> | UpdateRequestBuilder<TestEntitySingleLink, DeSerializersT> | DeleteRequestBuilder<TestEntitySingleLink, DeSerializersT> | CreateRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT> | UpdateRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT> | DeleteRequestBuilder<TestEntityLvl2SingleLink, DeSerializersT> | CreateRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT> | UpdateRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT> | DeleteRequestBuilder<TestEntityWithSharedEntityType1, DeSerializersT> | CreateRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT> | UpdateRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT> | DeleteRequestBuilder<TestEntityWithSharedEntityType2, DeSerializersT> | CreateRequestBuilder<TestEntityCircularLinkParent, DeSerializersT> | UpdateRequestBuilder<TestEntityCircularLinkParent, DeSerializersT> | DeleteRequestBuilder<TestEntityCircularLinkParent, DeSerializersT> | CreateRequestBuilder<TestEntityCircularLinkChild, DeSerializersT> | UpdateRequestBuilder<TestEntityCircularLinkChild, DeSerializersT> | DeleteRequestBuilder<TestEntityCircularLinkChild, DeSerializersT> | CreateRequestBuilder<TestEntityEndsWith, DeSerializersT> | UpdateRequestBuilder<TestEntityEndsWith, DeSerializersT> | DeleteRequestBuilder<TestEntityEndsWith, DeSerializersT> | CreateRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT> | UpdateRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT> | DeleteRequestBuilder<TestEntityEndsWithSomethingElse, DeSerializersT> | CreateRequestBuilder<CaseTest, DeSerializersT> | UpdateRequestBuilder<CaseTest, DeSerializersT> | DeleteRequestBuilder<CaseTest, DeSerializersT> | CreateRequestBuilder<Casetest_1, DeSerializersT> | UpdateRequestBuilder<Casetest_1, DeSerializersT> | DeleteRequestBuilder<Casetest_1, DeSerializersT>;
