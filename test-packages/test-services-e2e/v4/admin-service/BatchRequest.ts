/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilderV4, DeleteRequestBuilderV4, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, ODataBatchChangeSetV4, ODataBatchRequestBuilderV4, UpdateRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TestEntity, TestEntityLink } from './index';

/**
 * Batch builder for operations supported on the Admin Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadAdminServiceRequestBuilder | ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
export function batch(requests: Array<ReadAdminServiceRequestBuilder | ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
export function batch(first: undefined | ReadAdminServiceRequestBuilder | ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder> | Array<ReadAdminServiceRequestBuilder | ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>>, ...rest: Array<ReadAdminServiceRequestBuilder | ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>>): ODataBatchRequestBuilderV4 {
  return new ODataBatchRequestBuilderV4(defaultAdminServicePath, variadicArgumentToArray(first, rest), map);
}

/**
 * Change set constructor consists of write operations supported on the Admin Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: Array<WriteAdminServiceRequestBuilder>): ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>;
export function changeset(requests: Array<WriteAdminServiceRequestBuilder>): ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>;
export function changeset(first: undefined | WriteAdminServiceRequestBuilder | Array<WriteAdminServiceRequestBuilder>, ...rest: Array<WriteAdminServiceRequestBuilder>): ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder> {
  return new ODataBatchChangeSetV4(variadicArgumentToArray(first, rest));
}

export const defaultAdminServicePath = '/admin';
const map = { 'TestEntity': TestEntity, 'TestEntityLink': TestEntityLink };
export type ReadAdminServiceRequestBuilder = GetAllRequestBuilderV4<TestEntity> | GetAllRequestBuilderV4<TestEntityLink> | GetByKeyRequestBuilderV4<TestEntity> | GetByKeyRequestBuilderV4<TestEntityLink>;
export type WriteAdminServiceRequestBuilder = CreateRequestBuilderV4<TestEntity> | UpdateRequestBuilderV4<TestEntity> | DeleteRequestBuilderV4<TestEntity> | CreateRequestBuilderV4<TestEntityLink> | UpdateRequestBuilderV4<TestEntityLink> | DeleteRequestBuilderV4<TestEntityLink>;
