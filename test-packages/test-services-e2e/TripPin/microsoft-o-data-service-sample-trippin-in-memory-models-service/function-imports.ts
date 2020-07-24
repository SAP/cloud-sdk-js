/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForEntity, FunctionImportRequestBuilder, FunctionImportParameter } from '@sap-cloud-sdk/core/v4';
import { People } from './People';
import { Airports } from './Airports';

/**
 * Type of the parameters to be passed to [[getPersonWithMostFriends]].
 */
export interface GetPersonWithMostFriendsParameters {
}

/**
 * Get Person With Most Friends.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function getPersonWithMostFriends(parameters: GetPersonWithMostFriendsParameters): FunctionImportRequestBuilder<GetPersonWithMostFriendsParameters, People> {
  const params = {

  }

  return new FunctionImportRequestBuilder('get', 'TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/', 'GetPersonWithMostFriends', (data) => transformReturnValueForEntity(data, People), params);
}

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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function getNearestAirport(parameters: GetNearestAirportParameters): FunctionImportRequestBuilder<GetNearestAirportParameters, Airports> {
  const params = {
    lat: new FunctionImportParameter('lat', 'Edm.Double', parameters.lat),
    lon: new FunctionImportParameter('lon', 'Edm.Double', parameters.lon)
  }

  return new FunctionImportRequestBuilder('get', 'TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/', 'GetNearestAirport', (data) => transformReturnValueForEntity(data, Airports), params);
}

export const functionImports = {
  getPersonWithMostFriends,
  getNearestAirport
};
