/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import { AirportLocation } from './AirportLocation';
import type { AirportsApi } from './AirportsApi';
/**
 * This class represents the entity "Airports" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export declare class Airports<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements AirportsType<T>
{
  readonly _entityApi: AirportsApi<T>;
  /**
   * Technical entity name for Airports.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the Airports entity
   */
  static _keys: string[];
  /**
   * Icao Code.
   */
  icaoCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Name.
   */
  name: DeserializedType<T, 'Edm.String'>;
  /**
   * Iata Code.
   */
  iataCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Location.
   */
  location: AirportLocation<T>;
  constructor(_entityApi: AirportsApi<T>);
}
export interface AirportsType<T extends DeSerializers = DefaultDeSerializers> {
  icaoCode: DeserializedType<T, 'Edm.String'>;
  name: DeserializedType<T, 'Edm.String'>;
  iataCode: DeserializedType<T, 'Edm.String'>;
  location: AirportLocation<T>;
}
//# sourceMappingURL=Airports.d.ts.map
