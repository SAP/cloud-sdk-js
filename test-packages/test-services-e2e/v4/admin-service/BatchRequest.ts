/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './index';

/**
 * Batch builder for operations supported on the Admin Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadAdminServiceRequestBuilder | ODataBatchChangeSet<WriteAdminServiceRequestBuilder>>): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(defaultAdminServicePath, requests, map);
}

/**
 * Change set constructor consists of write operations supported on the Admin Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteAdminServiceRequestBuilder[]): ODataBatchChangeSet<WriteAdminServiceRequestBuilder> {
  return new ODataBatchChangeSet(requests);
}

export const defaultAdminServicePath = '/sap/opu/odata/sap/AdminService';
const map = { 'TestEntity': TestEntity };
export type ReadAdminServiceRequestBuilder = GetAllRequestBuilder<TestEntity> | GetByKeyRequestBuilder<TestEntity>;
export type WriteAdminServiceRequestBuilder = CreateRequestBuilder<TestEntity> | UpdateRequestBuilder<TestEntity> | DeleteRequestBuilder<TestEntity>;
