import { CityField } from './City';
import {
  ComplexTypeField,
  ConstructorOrField,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  EdmTypeField,
  Entity,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v4';
/**
 * AirportLocation
 */
export interface AirportLocation<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Loc.
   */
  loc: DeserializedType<DeSerializersT, 'Edm.Any'>;
  /**
   * Address.
   */
  address: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * City.
   */
  city: DeserializedType<
    DeSerializersT,
    'Microsoft.OData.SampleService.Models.TripPin.City'
  >;
}
/**
 * AirportLocationField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class AirportLocationField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  AirportLocation,
  NullableT,
  SelectableT
> {
  private _fieldBuilder;
  /**
   * Representation of the {@link AirportLocation.loc} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  loc: EdmTypeField<EntityT, DeSerializersT, 'Edm.Any', false, false>;
  /**
   * Representation of the {@link AirportLocation.address} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Representation of the {@link AirportLocation.city} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, DeSerializersT, false, false>;
  /**
   * Creates an instance of AirportLocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace AirportLocation {
  /**
   * Metadata information on all properties of the `AirportLocation` complex type.
   */
  const _propertyMetadata: PropertyMetadata<AirportLocation>[];
}
//# sourceMappingURL=AirportLocation.d.ts.map
