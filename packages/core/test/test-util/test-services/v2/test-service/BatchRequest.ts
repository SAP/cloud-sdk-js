/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSetV2, ODataBatchRequestBuilder, UpdateRequestBuilder } from '../../../../../src';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity, TestEntityMultiLink, TestEntityOtherMultiLink, TestEntityLvl2MultiLink, TestEntitySingleLink, TestEntityLvl2SingleLink, TestEntityCircularLinkParent, TestEntityCircularLinkChild, TestEntityEndsWith, TestEntityEndsWithSomethingElse, Testentity_1 } from './index';

/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadTestServiceRequestBuilder | ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>>): ODataBatchRequestBuilder;
export function batch(requests: Array<ReadTestServiceRequestBuilder | ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>>): ODataBatchRequestBuilder;
export function batch(first: undefined | ReadTestServiceRequestBuilder | ODataBatchChangeSetV2<WriteTestServiceRequestBuilder> | Array<ReadTestServiceRequestBuilder | ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>>, ...rest: Array<ReadTestServiceRequestBuilder | ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>>): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(defaultTestServicePath, variadicArgumentToArray(first, rest), map);
}

/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: Array<WriteTestServiceRequestBuilder>): ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>;
export function changeset(requests: Array<WriteTestServiceRequestBuilder>): ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>;
export function changeset(first: undefined | WriteTestServiceRequestBuilder | Array<WriteTestServiceRequestBuilder>, ...rest: Array<WriteTestServiceRequestBuilder>): ODataBatchChangeSetV2<WriteTestServiceRequestBuilder> {
  return new ODataBatchChangeSetV2(variadicArgumentToArray(first, rest));
}

export const defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const map = { 'A_TestEntity': TestEntity, 'A_TestEntityMultiLink': TestEntityMultiLink, 'A_TestEntityOtherMultiLink': TestEntityOtherMultiLink, 'A_TestEntityLvl2MultiLink': TestEntityLvl2MultiLink, 'A_TestEntitySingleLink': TestEntitySingleLink, 'A_TestEntityLvl2SingleLink': TestEntityLvl2SingleLink, 'A_TestEntityCircularLinkParent': TestEntityCircularLinkParent, 'A_TestEntityCircularLinkChild': TestEntityCircularLinkChild, 'A_TestEntityEndsWithCollection': TestEntityEndsWith, 'A_TestEntityEndsWithSomethingElse': TestEntityEndsWithSomethingElse, 'A_Testentity': Testentity_1 };
export type ReadTestServiceRequestBuilder = GetAllRequestBuilder<TestEntity> | GetAllRequestBuilder<TestEntityMultiLink> | GetAllRequestBuilder<TestEntityOtherMultiLink> | GetAllRequestBuilder<TestEntityLvl2MultiLink> | GetAllRequestBuilder<TestEntitySingleLink> | GetAllRequestBuilder<TestEntityLvl2SingleLink> | GetAllRequestBuilder<TestEntityCircularLinkParent> | GetAllRequestBuilder<TestEntityCircularLinkChild> | GetAllRequestBuilder<TestEntityEndsWith> | GetAllRequestBuilder<TestEntityEndsWithSomethingElse> | GetAllRequestBuilder<Testentity_1> | GetByKeyRequestBuilder<TestEntity> | GetByKeyRequestBuilder<TestEntityMultiLink> | GetByKeyRequestBuilder<TestEntityOtherMultiLink> | GetByKeyRequestBuilder<TestEntityLvl2MultiLink> | GetByKeyRequestBuilder<TestEntitySingleLink> | GetByKeyRequestBuilder<TestEntityLvl2SingleLink> | GetByKeyRequestBuilder<TestEntityCircularLinkParent> | GetByKeyRequestBuilder<TestEntityCircularLinkChild> | GetByKeyRequestBuilder<TestEntityEndsWith> | GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse> | GetByKeyRequestBuilder<Testentity_1>;
export type WriteTestServiceRequestBuilder = CreateRequestBuilder<TestEntity> | UpdateRequestBuilder<TestEntity> | DeleteRequestBuilder<TestEntity> | CreateRequestBuilder<TestEntityMultiLink> | UpdateRequestBuilder<TestEntityMultiLink> | DeleteRequestBuilder<TestEntityMultiLink> | CreateRequestBuilder<TestEntityOtherMultiLink> | UpdateRequestBuilder<TestEntityOtherMultiLink> | DeleteRequestBuilder<TestEntityOtherMultiLink> | CreateRequestBuilder<TestEntityLvl2MultiLink> | UpdateRequestBuilder<TestEntityLvl2MultiLink> | DeleteRequestBuilder<TestEntityLvl2MultiLink> | CreateRequestBuilder<TestEntitySingleLink> | UpdateRequestBuilder<TestEntitySingleLink> | DeleteRequestBuilder<TestEntitySingleLink> | CreateRequestBuilder<TestEntityLvl2SingleLink> | UpdateRequestBuilder<TestEntityLvl2SingleLink> | DeleteRequestBuilder<TestEntityLvl2SingleLink> | CreateRequestBuilder<TestEntityCircularLinkParent> | UpdateRequestBuilder<TestEntityCircularLinkParent> | DeleteRequestBuilder<TestEntityCircularLinkParent> | CreateRequestBuilder<TestEntityCircularLinkChild> | UpdateRequestBuilder<TestEntityCircularLinkChild> | DeleteRequestBuilder<TestEntityCircularLinkChild> | CreateRequestBuilder<TestEntityEndsWith> | UpdateRequestBuilder<TestEntityEndsWith> | DeleteRequestBuilder<TestEntityEndsWith> | CreateRequestBuilder<TestEntityEndsWithSomethingElse> | UpdateRequestBuilder<TestEntityEndsWithSomethingElse> | DeleteRequestBuilder<TestEntityEndsWithSomethingElse> | CreateRequestBuilder<Testentity_1> | UpdateRequestBuilder<Testentity_1> | DeleteRequestBuilder<Testentity_1>;
