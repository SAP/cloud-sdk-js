/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  FunctionImportRequestBuilder
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
): FunctionImportRequestBuilder<
  DeSerializersT,
  GetNearestAirportParameters<DeSerializersT>,
  Airports
>;
export declare const functionImports: {
  getNearestAirport: typeof getNearestAirport;
};
//# sourceMappingURL=function-imports.d.ts.map
