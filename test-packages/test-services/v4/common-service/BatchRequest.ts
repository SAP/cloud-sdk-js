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
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { CommonEntity, CommonEntitySingleLink } from './index';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Batch builder for operations supported on the Common Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(
  ...requests: Array<
    | ReadCommonServiceRequestBuilder
    | BatchChangeSet<WriteCommonServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  requests: Array<
    | ReadCommonServiceRequestBuilder
    | BatchChangeSet<WriteCommonServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  first:
    | undefined
    | ReadCommonServiceRequestBuilder
    | BatchChangeSet<WriteCommonServiceRequestBuilder>
    | Array<
        | ReadCommonServiceRequestBuilder
        | BatchChangeSet<WriteCommonServiceRequestBuilder>
      >,
  ...rest: Array<
    | ReadCommonServiceRequestBuilder
    | BatchChangeSet<WriteCommonServiceRequestBuilder>
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
): BatchChangeSet<WriteCommonServiceRequestBuilder>;
export function changeset(
  requests: Array<WriteCommonServiceRequestBuilder>
): BatchChangeSet<WriteCommonServiceRequestBuilder>;
export function changeset(
  first:
    | undefined
    | WriteCommonServiceRequestBuilder
    | Array<WriteCommonServiceRequestBuilder>,
  ...rest: Array<WriteCommonServiceRequestBuilder>
): BatchChangeSet<WriteCommonServiceRequestBuilder> {
  return new BatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultCommonServicePath =
  '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV/';
const map = {
  A_CommonEntity: CommonEntity,
  A_CommonEntitySingleLink: CommonEntitySingleLink
};
export type ReadCommonServiceRequestBuilder =
  | GetAllRequestBuilder<CommonEntity>
  | GetAllRequestBuilder<CommonEntitySingleLink>
  | GetByKeyRequestBuilder<CommonEntity>
  | GetByKeyRequestBuilder<CommonEntitySingleLink>;
export type WriteCommonServiceRequestBuilder =
  | CreateRequestBuilder<CommonEntity>
  | UpdateRequestBuilder<CommonEntity>
  | DeleteRequestBuilder<CommonEntity>
  | CreateRequestBuilder<CommonEntitySingleLink>
  | UpdateRequestBuilder<CommonEntitySingleLink>
  | DeleteRequestBuilder<CommonEntitySingleLink>;
