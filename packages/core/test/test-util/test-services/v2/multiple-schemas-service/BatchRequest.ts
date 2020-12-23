/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSetV2, ODataBatchRequestBuilder, UpdateRequestBuilder } from '../../../../../src';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { MultiSchemaTestEntity } from './index';

/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilder;
export function batch(requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilder;
export function batch(first: undefined | ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder> | Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>>, ...rest: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(defaultMultipleSchemasServicePath, variadicArgumentToArray(first, rest), map);
}

/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>;
export function changeset(requests: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>;
export function changeset(first: undefined | WriteMultipleSchemasServiceRequestBuilder | Array<WriteMultipleSchemasServiceRequestBuilder>, ...rest: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder> {
  return new ODataBatchChangeSetV2(variadicArgumentToArray(first, rest));
}

export const defaultMultipleSchemasServicePath = 'VALUE_IS_UNDEFINED';
const map = { 'MultiSchemaTestEntity': MultiSchemaTestEntity };
export type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilder<MultiSchemaTestEntity> | GetByKeyRequestBuilder<MultiSchemaTestEntity>;
export type WriteMultipleSchemasServiceRequestBuilder = CreateRequestBuilder<MultiSchemaTestEntity> | UpdateRequestBuilder<MultiSchemaTestEntity> | DeleteRequestBuilder<MultiSchemaTestEntity>;
