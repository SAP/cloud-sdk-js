/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilderV4, DeleteRequestBuilderV4, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, BatchChangeSet, BatchRequestBuilder, UpdateRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity, TestEntityLink } from './index';

/**
 * Batch builder for operations supported on the Admin Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: (ReadAdminServiceRequestBuilder | BatchChangeSet<WriteAdminServiceRequestBuilder>)[]): BatchRequestBuilder {
  return new BatchRequestBuilder(defaultAdminServicePath, requests, entityToConstructorMap);
}

/**
 * Change set constructor consists of write operations supported on the Admin Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteAdminServiceRequestBuilder[]): BatchChangeSet<WriteAdminServiceRequestBuilder> {
  return new BatchChangeSet(requests);
}

export const defaultAdminServicePath = '/admin';
const entityToConstructorMap = { 'TestEntity': TestEntity, 'TestEntityLink': TestEntityLink };
export type ReadAdminServiceRequestBuilder = GetAllRequestBuilderV4<TestEntity> | GetAllRequestBuilderV4<TestEntityLink> | GetByKeyRequestBuilderV4<TestEntity> | GetByKeyRequestBuilderV4<TestEntityLink>;
export type WriteAdminServiceRequestBuilder = CreateRequestBuilderV4<TestEntity> | UpdateRequestBuilderV4<TestEntity> | DeleteRequestBuilderV4<TestEntity> | CreateRequestBuilderV4<TestEntityLink> | UpdateRequestBuilderV4<TestEntityLink> | DeleteRequestBuilderV4<TestEntityLink>;
