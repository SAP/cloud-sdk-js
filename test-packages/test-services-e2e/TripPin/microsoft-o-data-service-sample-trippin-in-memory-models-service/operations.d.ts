/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { Airports } from './Airports';
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
export declare function getNearestAirport<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: GetNearestAirportParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  GetNearestAirportParameters<DeSerializersT>,
  Airports
>;
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
export declare function resetDataSource<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ResetDataSourceParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ResetDataSourceParameters<DeSerializersT>,
  undefined
>;
export declare const operations: {
  getNearestAirport: typeof getNearestAirport;
  resetDataSource: typeof resetDataSource;
};
