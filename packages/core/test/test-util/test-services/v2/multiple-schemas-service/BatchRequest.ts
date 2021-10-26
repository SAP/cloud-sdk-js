/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { MultiSchemaTestEntity } from './index';

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

export const defaultMultipleSchemasServicePath = 'VALUE_IS_UNDEFINED';
const map = { 'MultiSchemaTestEntity': MultiSchemaTestEntity };
export type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilder<MultiSchemaTestEntity> | GetByKeyRequestBuilder<MultiSchemaTestEntity>;
export type WriteMultipleSchemasServiceRequestBuilder = CreateRequestBuilder<MultiSchemaTestEntity> | UpdateRequestBuilder<MultiSchemaTestEntity> | DeleteRequestBuilder<MultiSchemaTestEntity>;
