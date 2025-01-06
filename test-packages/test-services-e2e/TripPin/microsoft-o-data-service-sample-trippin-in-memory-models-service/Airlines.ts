/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import type { AirlinesApi } from './AirlinesApi';

/**
 * This class represents the entity "Airlines" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class Airlines<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements AirlinesType<T>
{
  /**
   * Technical entity name for Airlines.
   */
  static override _entityName = 'Airlines';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * All key fields of the Airlines entity.
   */
  static _keys = ['AirlineCode'];
  /**
   * Airline Code.
   */
  declare airlineCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Name.
   */
  declare name: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: AirlinesApi<T>) {
    super(_entityApi);
  }
}

export interface AirlinesType<T extends DeSerializers = DefaultDeSerializers> {
  airlineCode: DeserializedType<T, 'Edm.String'>;
  name: DeserializedType<T, 'Edm.String'>;
}
