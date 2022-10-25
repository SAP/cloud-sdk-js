/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  entityDeserializer,
  BoundActionRequestBuilder,
  transformReturnValueForComplexType,
  defaultDeSerializers,
  BoundFunctionRequestBuilder,
  FunctionImportParameter,
  ActionImportParameter
} from '@sap-cloud-sdk/odata-v4';
import { AirportLocation, AirportLocationField } from './AirportLocation';
import type { AirportsApi } from './AirportsApi';
import type { Photos } from './Photos';
import type { People } from './People';
import type { Airlines } from './Airlines';

/**
 * This class represents the entity "Airports" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class Airports<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements AirportsType<T>
{
  /**
   * Technical entity name for Airports.
   */
  static _entityName = 'Airports';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * All key fields of the Airports entity
   */
  static _keys = ['IcaoCode'];
  /**
   * Icao Code.
   */
  icaoCode!: DeserializedType<T, 'Edm.String'>;
  /**
   * Name.
   */
  name!: DeserializedType<T, 'Edm.String'>;
  /**
   * Iata Code.
   */
  iataCode!: DeserializedType<T, 'Edm.String'>;
  /**
   * Location.
   */
  location!: AirportLocation<T>;

  constructor(readonly _entityApi: AirportsApi<T>) {
    super(_entityApi);
  }

  getNearestAirport<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    lat: number,
    lon: number
  ): BoundFunctionRequestBuilder<
    Airports<DeSerializersT>,
    DeSerializersT,
    any,
    Airports | null
  > {
    const params = {
      lat: new FunctionImportParameter('lat', 'Edm.Double', lat),
      lon: new FunctionImportParameter('lon', 'Edm.Double', lon)
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'Microsoft.OData.SampleService.Models.TripPin.GetNearestAirport',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  resetDataSource<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    Airports<DeSerializersT>,
    DeSerializersT,
    any,
    undefined | null
  > {
    const params = {};
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any,
      this as any,
      'Microsoft.OData.SampleService.Models.TripPin.ResetDataSource',
      data => data,
      params,
      deSerializers
    ) as any;
  }
}

export interface AirportsType<T extends DeSerializers = DefaultDeSerializers> {
  icaoCode: DeserializedType<T, 'Edm.String'>;
  name: DeserializedType<T, 'Edm.String'>;
  iataCode: DeserializedType<T, 'Edm.String'>;
  location: AirportLocation<T>;
}
