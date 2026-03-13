/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForEntity,
  transformReturnValueForUndefined,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  OperationParameter,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { microsoftODataServiceSampleTrippinInMemoryModelsService } from './service';
import { Airports } from './Airports';
import { AirportsApi } from './AirportsApi';

/**
 * Type of the parameters to be passed to {@link getNearestAirport}.
 */
export interface GetNearestAirportParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Lat.
   */
  lat: number;
  /**
   * Lon.
   */
  lon: number;
}

/**
 * Get Nearest Airport.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function getNearestAirport<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: GetNearestAirportParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  GetNearestAirportParameters<DeSerializersT>,
  Airports
> {
  const params = {
    lat: new OperationParameter('lat', 'Edm.Double', parameters.lat),
    lon: new OperationParameter('lon', 'Edm.Double', parameters.lon)
  };

  return new OperationRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'GetNearestAirport',
    data =>
      transformReturnValueForEntity(
        data,
        microsoftODataServiceSampleTrippinInMemoryModelsService(deSerializers)
          .airportsApi
      ),
    params,
    deSerializers,
    'function'
  );
}

/**
 * Type of the parameters to be passed to {@link resetDataSource}.
 */
export interface ResetDataSourceParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Reset Data Source.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function resetDataSource<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ResetDataSourceParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ResetDataSourceParameters<DeSerializersT>,
  undefined
> {
  const params = {};

  return new OperationRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'ResetDataSource',
    data => transformReturnValueForUndefined(data, val => undefined),
    params,
    deSerializers,
    'action'
  );
}

export const operations = {
  getNearestAirport,
  resetDataSource
};
