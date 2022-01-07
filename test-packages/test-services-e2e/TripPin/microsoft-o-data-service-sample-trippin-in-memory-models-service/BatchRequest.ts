/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder,
  BatchChangeSet
} from '@sap-cloud-sdk/odata-v4';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Photos, People, Airlines, Airports } from './index';

/**
 * Batch builder for operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
    | Array<
        | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
        | BatchChangeSet<DeSerializersT>
      >,
  ...rest: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT> {
  return new ODataBatchRequestBuilder(
    defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath,
    variadicArgumentToArray(first, rest)
  );
}

/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<
    WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
    | Array<
        WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
      >,
  ...rest: Array<
    WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(variadicArgumentToArray(first, rest));
}

export const defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
export type ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<Photos, DeSerializersT>
  | GetAllRequestBuilder<People, DeSerializersT>
  | GetAllRequestBuilder<Airlines, DeSerializersT>
  | GetAllRequestBuilder<Airports, DeSerializersT>
  | GetByKeyRequestBuilder<Photos, DeSerializersT>
  | GetByKeyRequestBuilder<People, DeSerializersT>
  | GetByKeyRequestBuilder<Airlines, DeSerializersT>
  | GetByKeyRequestBuilder<Airports, DeSerializersT>;
export type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<Photos, DeSerializersT>
  | UpdateRequestBuilder<Photos, DeSerializersT>
  | DeleteRequestBuilder<Photos, DeSerializersT>
  | CreateRequestBuilder<People, DeSerializersT>
  | UpdateRequestBuilder<People, DeSerializersT>
  | DeleteRequestBuilder<People, DeSerializersT>
  | CreateRequestBuilder<Airlines, DeSerializersT>
  | UpdateRequestBuilder<Airlines, DeSerializersT>
  | DeleteRequestBuilder<Airlines, DeSerializersT>
  | CreateRequestBuilder<Airports, DeSerializersT>
  | UpdateRequestBuilder<Airports, DeSerializersT>
  | DeleteRequestBuilder<Airports, DeSerializersT>;
