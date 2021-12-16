/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { FunctionImportParameter } from '@sap-cloud-sdk/odata-common/internal';
import {
  FunctionImportRequestBuilder,
  DeSerializers,
  transformReturnValueForEntity,
  DefaultDeSerializers,
  defaultDeSerializers
} from '@sap-cloud-sdk/odata-v4';
import { Airports } from './Airports';
import { builder } from './service';
import { AirportsApi } from './AirportsApi';

/**
 * Type of the parameters to be passed to [[getNearestAirport]].
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
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function getNearestAirport<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: GetNearestAirportParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  GetNearestAirportParameters<DeSerializersT>,
  Airports
> {
  const params = {
    lat: new FunctionImportParameter('lat', 'Edm.Double', parameters.lat),
    lon: new FunctionImportParameter('lon', 'Edm.Double', parameters.lon)
  };

  return new FunctionImportRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'GetNearestAirport',
    data =>
      transformReturnValueForEntity(data, builder(deSerializers).airportsApi),
    params,
    deSerializers
  );
}

export const functionImports = {
  getNearestAirport
};
