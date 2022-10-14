import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  BoundActionRequestBuilder,
  BoundFunctionRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import type { AirlinesApi } from './AirlinesApi';
/**
 * This class represents the entity "Airlines" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export declare class Airlines<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements AirlinesType<T>
{
  readonly _entityApi: AirlinesApi<T>;
  /**
   * Technical entity name for Airlines.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the Airlines entity
   */
  static _keys: string[];
  /**
   * Airline Code.
   */
  airlineCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Name.
   */
  name: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: AirlinesApi<T>);
  GetFavoriteAirline<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    Airlines<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  GetInvolvedPeople<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    Airlines<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  GetFriendsTrips<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    userName: string
  ): BoundFunctionRequestBuilder<
    Airlines<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  ShareTrip<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    userName: string,
    tripId: string
  ): BoundActionRequestBuilder<DeSerializersT, any, string | null>;
}
export interface AirlinesType<T extends DeSerializers = DefaultDeSerializers> {
  airlineCode: DeserializedType<T, 'Edm.String'>;
  name: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=Airlines.d.ts.map
