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
 * Batch builder for operations supported on the Microsoft O Data Sample Service Models Trip Pin Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | ReadMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
    | Array<
        | ReadMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
        | BatchChangeSet<DeSerializersT>
      >,
  ...rest: Array<
    | ReadMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT> {
  return new ODataBatchRequestBuilder(
    defaultMicrosoftODataSampleServiceModelsTripPinServicePath,
    transformVariadicArgumentToArray(first, rest)
  );
}

/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Sample Service Models Trip Pin Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    WriteMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<
    WriteMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | WriteMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
    | Array<
        WriteMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
      >,
  ...rest: Array<
    WriteMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(transformVariadicArgumentToArray(first, rest));
}

export const defaultMicrosoftODataSampleServiceModelsTripPinServicePath =
  'VALUE_IS_UNDEFINED';
export type ReadMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<
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
export type WriteMicrosoftODataSampleServiceModelsTripPinServiceRequestBuilder<
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
