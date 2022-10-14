import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  BoundActionRequestBuilder,
  BoundFunctionRequestBuilder
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
  GetFavoriteAirline<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    Photos<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  GetInvolvedPeople<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    Photos<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  GetFriendsTrips<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    userName: string
  ): BoundFunctionRequestBuilder<
    Photos<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  ShareTrip<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    userName: string,
    tripId: string
  ): BoundActionRequestBuilder<DeSerializersT, any, string | null>;
}
export interface PhotosType<T extends DeSerializers = DefaultDeSerializers> {
  id: DeserializedType<T, 'Edm.Int64'>;
  name?: DeserializedType<T, 'Edm.String'> | null;
}
//# sourceMappingURL=Photos.d.ts.map
