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
import { Photos, People, Airlines, Airports } from './index';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Batch builder for operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(
  ...requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export function batch(
  first:
    | undefined
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
    | Array<
        | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
        | BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
      >,
  ...rest: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
  >
): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(
    defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath,
    variadicArgumentToArray(first, rest),
    map
  );
}

/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(
  ...requests: Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
): BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>;
export function changeset(
  requests: Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
): BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>;
export function changeset(
  first:
    | undefined
    | WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>,
  ...rest: Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
): BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder> {
  return new BatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
const map = {
  Photos: Photos,
  People: People,
  Airlines: Airlines,
  Airports: Airports
};
export type ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder =

    | GetAllRequestBuilder<Photos>
    | GetAllRequestBuilder<People>
    | GetAllRequestBuilder<Airlines>
    | GetAllRequestBuilder<Airports>
    | GetByKeyRequestBuilder<Photos>
    | GetByKeyRequestBuilder<People>
    | GetByKeyRequestBuilder<Airlines>
    | GetByKeyRequestBuilder<Airports>;
export type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder =

    | CreateRequestBuilder<Photos>
    | UpdateRequestBuilder<Photos>
    | DeleteRequestBuilder<Photos>
    | CreateRequestBuilder<People>
    | UpdateRequestBuilder<People>
    | DeleteRequestBuilder<People>
    | CreateRequestBuilder<Airlines>
    | UpdateRequestBuilder<Airlines>
    | DeleteRequestBuilder<Airlines>
    | CreateRequestBuilder<Airports>
    | UpdateRequestBuilder<Airports>
    | DeleteRequestBuilder<Airports>;
