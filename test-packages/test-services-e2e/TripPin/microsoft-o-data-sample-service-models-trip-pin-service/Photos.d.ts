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
import type { PhotosApi } from './PhotosApi';
/**
 * This class represents the entity "Photos" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export declare class Photos<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements PhotosType<T>
{
  readonly _entityApi: PhotosApi<T>;
  /**
   * Technical entity name for Photos.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the Photos entity
   */
  static _keys: string[];
  /**
   * Id.
   */
  id: DeserializedType<T, 'Edm.Int64'>;
  /**
   * Name.
   * @nullable
   */
  name?: DeserializedType<T, 'Edm.String'> | null;
  constructor(_entityApi: PhotosApi<T>);
}
export interface PhotosType<T extends DeSerializers = DefaultDeSerializers> {
  id: DeserializedType<T, 'Edm.Int64'>;
  name?: DeserializedType<T, 'Edm.String'> | null;
}
//# sourceMappingURL=Photos.d.ts.map
