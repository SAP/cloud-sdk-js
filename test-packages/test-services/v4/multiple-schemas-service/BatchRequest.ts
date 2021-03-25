/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilderV4, DeleteRequestBuilderV4, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, ODataBatchChangeSetV4, ODataBatchRequestBuilderV4, UpdateRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity1, TestEntity2, TestEntity3, TestEntity4 } from './index';

/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
export function batch(requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
export function batch(first: undefined | ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder> | Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>>, ...rest: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilderV4 {
  return new ODataBatchRequestBuilderV4(defaultMultipleSchemasServicePath, variadicArgumentToArray(first, rest), map);
}

/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>;
export function changeset(requests: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder>;
export function changeset(first: undefined | WriteMultipleSchemasServiceRequestBuilder | Array<WriteMultipleSchemasServiceRequestBuilder>, ...rest: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSetV4<WriteMultipleSchemasServiceRequestBuilder> {
  return new ODataBatchChangeSetV4(variadicArgumentToArray(first, rest));
}

export const defaultMultipleSchemasServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const map = { 'A_TestEntity1': TestEntity1, 'A_TestEntity2': TestEntity2, 'A_TestEntity3': TestEntity3, 'A_TestEntity4': TestEntity4 };
export type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilderV4<TestEntity1> | GetAllRequestBuilderV4<TestEntity2> | GetAllRequestBuilderV4<TestEntity3> | GetAllRequestBuilderV4<TestEntity4> | GetByKeyRequestBuilderV4<TestEntity1> | GetByKeyRequestBuilderV4<TestEntity2> | GetByKeyRequestBuilderV4<TestEntity3> | GetByKeyRequestBuilderV4<TestEntity4>;
export type WriteMultipleSchemasServiceRequestBuilder = CreateRequestBuilderV4<TestEntity1> | UpdateRequestBuilderV4<TestEntity1> | DeleteRequestBuilderV4<TestEntity1> | CreateRequestBuilderV4<TestEntity2> | UpdateRequestBuilderV4<TestEntity2> | DeleteRequestBuilderV4<TestEntity2> | CreateRequestBuilderV4<TestEntity3> | UpdateRequestBuilderV4<TestEntity3> | DeleteRequestBuilderV4<TestEntity3> | CreateRequestBuilderV4<TestEntity4> | UpdateRequestBuilderV4<TestEntity4> | DeleteRequestBuilderV4<TestEntity4>;
