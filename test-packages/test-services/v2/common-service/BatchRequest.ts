/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { CommonEntity } from './index';

/**
 * Batch builder for operations supported on the Common Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(
  ...requests: Array<
    | ReadCommonServiceRequestBuilder
    | ODataBatchChangeSet<WriteCommonServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  requests: Array<
    | ReadCommonServiceRequestBuilder
    | ODataBatchChangeSet<WriteCommonServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  first:
    | undefined
    | ReadCommonServiceRequestBuilder
    | ODataBatchChangeSet<WriteCommonServiceRequestBuilder>
    | Array<
        | ReadCommonServiceRequestBuilder
        | ODataBatchChangeSet<WriteCommonServiceRequestBuilder>
      >,
  ...rest: Array<
    | ReadCommonServiceRequestBuilder
    | ODataBatchChangeSet<WriteCommonServiceRequestBuilder>
  >
): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(
    defaultCommonServicePath,
    variadicArgumentToArray(first, rest),
    map
  );
}

/**
 * Change set constructor consists of write operations supported on the Common Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(
  ...requests: Array<WriteCommonServiceRequestBuilder>
): ODataBatchChangeSet<WriteCommonServiceRequestBuilder>;
export function changeset(
  requests: Array<WriteCommonServiceRequestBuilder>
): ODataBatchChangeSet<WriteCommonServiceRequestBuilder>;
export function changeset(
  first:
    | undefined
    | WriteCommonServiceRequestBuilder
    | Array<WriteCommonServiceRequestBuilder>,
  ...rest: Array<WriteCommonServiceRequestBuilder>
): ODataBatchChangeSet<WriteCommonServiceRequestBuilder> {
  return new ODataBatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultCommonServicePath =
  '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV/';
const map = { A_CommonEntity: CommonEntity };
export type ReadCommonServiceRequestBuilder =
  | GetAllRequestBuilder<CommonEntity>
  | GetByKeyRequestBuilder<CommonEntity>;
export type WriteCommonServiceRequestBuilder =
  | CreateRequestBuilder<CommonEntity>
  | UpdateRequestBuilder<CommonEntity>
  | DeleteRequestBuilder<CommonEntity>;
