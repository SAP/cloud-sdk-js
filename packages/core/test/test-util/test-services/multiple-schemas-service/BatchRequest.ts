/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '../../../../src';
import { MultiSchemaTestEntity } from './index';

/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests - The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(
  ...requests: (ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>)[]
): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(defaultMultipleSchemasServicePath, requests, map);
}

/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests - The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteMultipleSchemasServiceRequestBuilder[]): ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder> {
  return new ODataBatchChangeSet(requests);
}

export const defaultMultipleSchemasServicePath = '/sap/opu/odata/sap/SCHEMA_DATA';
const map = { MultiSchemaTestEntity };
export type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilder<MultiSchemaTestEntity> | GetByKeyRequestBuilder<MultiSchemaTestEntity>;
export type WriteMultipleSchemasServiceRequestBuilder =
  | CreateRequestBuilder<MultiSchemaTestEntity>
  | UpdateRequestBuilder<MultiSchemaTestEntity>
  | DeleteRequestBuilder<MultiSchemaTestEntity>;
