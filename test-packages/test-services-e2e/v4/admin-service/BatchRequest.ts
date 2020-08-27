/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilderV4, DeleteRequestBuilderV4, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, ODataBatchChangeSetV4, ODataBatchRequestBuilderV4, UpdateRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity } from './index';

/**
 * Batch builder for operations supported on the Admin Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadAdminServiceRequestBuilder | ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>>): ODataBatchRequestBuilderV4 {
  return new ODataBatchRequestBuilderV4(defaultAdminServicePath, requests, map);
}

/**
 * Change set constructor consists of write operations supported on the Admin Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteAdminServiceRequestBuilder[]): ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder> {
  return new ODataBatchChangeSetV4(requests);
}

export const defaultAdminServicePath = '/sap/opu/odata/sap/AdminService';
const map = { 'TestEntity': TestEntity };
export type ReadAdminServiceRequestBuilder = GetAllRequestBuilderV4<TestEntity> | GetByKeyRequestBuilderV4<TestEntity>;
export type WriteAdminServiceRequestBuilder = CreateRequestBuilderV4<TestEntity> | UpdateRequestBuilderV4<TestEntity> | DeleteRequestBuilderV4<TestEntity>;
