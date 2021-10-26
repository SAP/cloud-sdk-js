/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity1, TestEntity2, TestEntity3, TestEntity4 } from './index';

/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilder;
export function batch(requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilder;
export function batch(first: undefined | ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder> | Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>>, ...rest: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(defaultMultipleSchemasServicePath, variadicArgumentToArray(first, rest), map);
}

/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>;
export function changeset(requests: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>;
export function changeset(first: undefined | WriteMultipleSchemasServiceRequestBuilder | Array<WriteMultipleSchemasServiceRequestBuilder>, ...rest: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder> {
  return new ODataBatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultMultipleSchemasServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const map = { 'A_TestEntity1': TestEntity1, 'A_TestEntity2': TestEntity2, 'A_TestEntity3': TestEntity3, 'A_TestEntity4': TestEntity4 };
export type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilder<TestEntity1> | GetAllRequestBuilder<TestEntity2> | GetAllRequestBuilder<TestEntity3> | GetAllRequestBuilder<TestEntity4> | GetByKeyRequestBuilder<TestEntity1> | GetByKeyRequestBuilder<TestEntity2> | GetByKeyRequestBuilder<TestEntity3> | GetByKeyRequestBuilder<TestEntity4>;
export type WriteMultipleSchemasServiceRequestBuilder = CreateRequestBuilder<TestEntity1> | UpdateRequestBuilder<TestEntity1> | DeleteRequestBuilder<TestEntity1> | CreateRequestBuilder<TestEntity2> | UpdateRequestBuilder<TestEntity2> | DeleteRequestBuilder<TestEntity2> | CreateRequestBuilder<TestEntity3> | UpdateRequestBuilder<TestEntity3> | DeleteRequestBuilder<TestEntity3> | CreateRequestBuilder<TestEntity4> | UpdateRequestBuilder<TestEntity4> | DeleteRequestBuilder<TestEntity4>;
