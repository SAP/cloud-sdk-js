/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/core/v4';
import { TestEntity } from './index';
/**
 * Batch builder for operations supported on the Admin Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(
  ...requests: (
    | ReadAdminServiceRequestBuilder
    | ODataBatchChangeSet<WriteAdminServiceRequestBuilder>
  )[]
): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Admin Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: WriteAdminServiceRequestBuilder[]
): ODataBatchChangeSet<WriteAdminServiceRequestBuilder>;
export declare const defaultAdminServicePath =
  '/sap/opu/odata/sap/AdminService';
export declare type ReadAdminServiceRequestBuilder =
  | GetAllRequestBuilder<TestEntity>
  | GetByKeyRequestBuilder<TestEntity>;
export declare type WriteAdminServiceRequestBuilder =
  | CreateRequestBuilder<TestEntity>
  | UpdateRequestBuilder<TestEntity>
  | DeleteRequestBuilder<TestEntity>;
// # sourceMappingURL=BatchRequest.d.ts.map
