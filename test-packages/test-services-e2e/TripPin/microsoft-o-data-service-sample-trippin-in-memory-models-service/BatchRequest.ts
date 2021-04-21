/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilderV4,
  DeleteRequestBuilderV4,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  ODataBatchChangeSetV4,
  ODataBatchRequestBuilderV4,
  UpdateRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Photos, People, Airlines, Airports } from './index';

/**
 * Batch builder for operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(
  ...requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV4;
export function batch(
  requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV4;
export function batch(
  first:
    | undefined
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
    | Array<
        | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
        | ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
      >,
  ...rest: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV4 {
  return new ODataBatchRequestBuilderV4(
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
): ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>;
export function changeset(
  requests: Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
): ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>;
export function changeset(
  first:
    | undefined
    | WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>,
  ...rest: Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
): ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder> {
  return new ODataBatchChangeSetV4(variadicArgumentToArray(first, rest));
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
  | GetAllRequestBuilderV4<Photos>
  | GetAllRequestBuilderV4<People>
  | GetAllRequestBuilderV4<Airlines>
  | GetAllRequestBuilderV4<Airports>
  | GetByKeyRequestBuilderV4<Photos>
  | GetByKeyRequestBuilderV4<People>
  | GetByKeyRequestBuilderV4<Airlines>
  | GetByKeyRequestBuilderV4<Airports>;
export type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder =
  | CreateRequestBuilderV4<Photos>
  | UpdateRequestBuilderV4<Photos>
  | DeleteRequestBuilderV4<Photos>
  | CreateRequestBuilderV4<People>
  | UpdateRequestBuilderV4<People>
  | DeleteRequestBuilderV4<People>
  | CreateRequestBuilderV4<Airlines>
  | UpdateRequestBuilderV4<Airlines>
  | DeleteRequestBuilderV4<Airlines>
  | CreateRequestBuilderV4<Airports>
  | UpdateRequestBuilderV4<Airports>
  | DeleteRequestBuilderV4<Airports>;
