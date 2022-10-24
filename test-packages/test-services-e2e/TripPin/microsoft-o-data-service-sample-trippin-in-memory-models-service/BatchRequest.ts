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
  FunctionImportRequestBuilder,
  ActionImportRequestBuilder,
  BatchChangeSet
} from '@sap-cloud-sdk/odata-v4';
import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  Photos,
  People,
  Airlines,
  Airports,
  GetNearestAirportParameters,
  ResetDataSourceParameters
} from './index';

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
    transformVariadicArgumentToArray(first, rest)
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
  return new BatchChangeSet(transformVariadicArgumentToArray(first, rest));
}

export const defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
export type ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | FunctionImportRequestBuilder<
      DeSerializersT,
      GetNearestAirportParameters<DeSerializersT>,
      Airports
    >;
export type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | ActionImportRequestBuilder<
      DeSerializersT,
      ResetDataSourceParameters<DeSerializersT>,
      undefined
    >;
