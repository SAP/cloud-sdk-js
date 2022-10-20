import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  BoundActionRequestBuilder
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
  resetDataSource_2<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    Airlines<DeSerializersT>,
    DeSerializersT,
    any,
    undefined | null
  >;
}
export interface AirlinesType<T extends DeSerializers = DefaultDeSerializers> {
  airlineCode: DeserializedType<T, 'Edm.String'>;
  name: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=Airlines.d.ts.map
