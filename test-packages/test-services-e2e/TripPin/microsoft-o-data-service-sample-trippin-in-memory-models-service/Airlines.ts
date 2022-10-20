/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType, entityDeserializer, BoundActionRequestBuilder, transformReturnValueForComplexType, defaultDeSerializers, BoundFunctionRequestBuilder, FunctionImportParameter, ActionImportParameter } from '@sap-cloud-sdk/odata-v4';
import type { AirlinesApi } from './AirlinesApi';

/**
 * This class represents the entity "Airlines" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class Airlines<T extends DeSerializers = DefaultDeSerializers> extends Entity implements AirlinesType<T> {
  /**
   * Technical entity name for Airlines.
   */
  static _entityName = 'Airlines';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * All key fields of the Airlines entity
   */
  static _keys = ['AirlineCode'];
  /**
   * Airline Code.
   */
  airlineCode!: DeserializedType<T, 'Edm.String'>;
  /**
   * Name.
   */
  name!: DeserializedType<T, 'Edm.String'>;

  constructor(readonly _entityApi: AirlinesApi<T>) {
    super(_entityApi);
  }

  resetDataSource_2<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<Airlines<DeSerializersT>, DeSerializersT, any, undefined | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'Microsoft.OData.SampleService.Models.TripPin.ResetDataSource', (data) => data, params, deSerializers
    ) as any;
  }
}

export interface AirlinesType<T extends DeSerializers = DefaultDeSerializers> {
  airlineCode: DeserializedType<T, 'Edm.String'>;
  name: DeserializedType<T, 'Edm.String'>;
}
