/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilderV2, DeleteRequestBuilderV2, GetAllRequestBuilderV2, GetByKeyRequestBuilderV2, BatchChangeSet, BatchRequestBuilder, UpdateRequestBuilderV2 } from '@sap-cloud-sdk/core';
import { MultiSchemaTestEntity } from './index';

/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: (ReadMultipleSchemasServiceRequestBuilder | BatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>)[]): BatchRequestBuilder {
  return new BatchRequestBuilder(defaultMultipleSchemasServicePath, requests, entityToConstructorMap);
}

/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteMultipleSchemasServiceRequestBuilder[]): BatchChangeSet<WriteMultipleSchemasServiceRequestBuilder> {
  return new BatchChangeSet(requests);
}

export const defaultMultipleSchemasServicePath = 'VALUE_IS_UNDEFINED';
const entityToConstructorMap = { 'MultiSchemaTestEntity': MultiSchemaTestEntity };
export type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilderV2<MultiSchemaTestEntity> | GetByKeyRequestBuilderV2<MultiSchemaTestEntity>;
export type WriteMultipleSchemasServiceRequestBuilder = CreateRequestBuilderV2<MultiSchemaTestEntity> | UpdateRequestBuilderV2<MultiSchemaTestEntity> | DeleteRequestBuilderV2<MultiSchemaTestEntity>;
