/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType, entityDeserializer, BoundActionRequestBuilder, transformReturnValueForComplexType, defaultDeSerializers, BoundFunctionRequestBuilder, FunctionImportParameter, ActionImportParameter } from '@sap-cloud-sdk/odata-v4';
import type { PhotosApi } from './PhotosApi';

/**
 * This class represents the entity "Photos" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class Photos<T extends DeSerializers = DefaultDeSerializers> extends Entity implements PhotosType<T> {
  /**
   * Technical entity name for Photos.
   */
  static _entityName = 'Photos';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * All key fields of the Photos entity
   */
  static _keys = ['Id'];
  /**
   * Id.
   */
  id!: DeserializedType<T, 'Edm.Int64'>;
  /**
   * Name.
   * @nullable
   */
  name?: DeserializedType<T, 'Edm.String'> | null;

  constructor(readonly _entityApi: PhotosApi<T>) {
    super(_entityApi);
  }

  resetDataSource<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<Photos<DeSerializersT>, DeSerializersT, any, undefined | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'Microsoft.OData.SampleService.Models.TripPin.ResetDataSource', (data) => data, params, deSerializers
    ) as any;
  }
}

export interface PhotosType<T extends DeSerializers = DefaultDeSerializers> {
  id: DeserializedType<T, 'Edm.Int64'>;
  name?: DeserializedType<T, 'Edm.String'> | null;
}
