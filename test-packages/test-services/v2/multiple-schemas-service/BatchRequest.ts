/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilderV2, DeleteRequestBuilderV2, GetAllRequestBuilderV2, GetByKeyRequestBuilderV2, ODataBatchChangeSetV2, ODataBatchRequestBuilderV2, UpdateRequestBuilderV2 } from '@sap-cloud-sdk/core';
import { MultiSchemaTestEntity } from './index';

/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilderV2 {
  return new ODataBatchRequestBuilderV2(defaultMultipleSchemasServicePath, requests, map);
}

/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteMultipleSchemasServiceRequestBuilder[]): ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder> {
  return new ODataBatchChangeSetV2(requests);
}

export const defaultMultipleSchemasServicePath = '/sap/opu/odata/sap/SCHEMA_DATA';
const map = { 'MultiSchemaTestEntity': MultiSchemaTestEntity };
export type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilderV2<MultiSchemaTestEntity> | GetByKeyRequestBuilderV2<MultiSchemaTestEntity>;
export type WriteMultipleSchemasServiceRequestBuilder = CreateRequestBuilderV2<MultiSchemaTestEntity> | UpdateRequestBuilderV2<MultiSchemaTestEntity> | DeleteRequestBuilderV2<MultiSchemaTestEntity>;
