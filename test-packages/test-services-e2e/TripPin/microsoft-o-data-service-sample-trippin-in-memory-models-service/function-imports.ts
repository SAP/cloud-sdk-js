/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { FunctionImportParameter } from '@sap-cloud-sdk/odata-common';
import {
  FunctionImportRequestBuilder,
  transformReturnValueForEntity
} from '@sap-cloud-sdk/odata-v4';
import { Airports } from './Airports';

/**
 * Type of the parameters to be passed to [[getNearestAirport]].
 */
export interface GetNearestAirportParameters {
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
export function getNearestAirport(
  parameters: GetNearestAirportParameters
): FunctionImportRequestBuilder<GetNearestAirportParameters, Airports> {
  const params = {
    lat: new FunctionImportParameter('lat', 'Edm.Double', parameters.lat),
    lon: new FunctionImportParameter('lon', 'Edm.Double', parameters.lon)
  };

  return new FunctionImportRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'GetNearestAirport',
    data => transformReturnValueForEntity(data, Airports),
    params
  );
}

export const functionImports = {
  getNearestAirport
};
