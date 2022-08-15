import {
  ComplexTypeField,
  ConstructorOrField,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  Entity,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v4';
/**
 * City
 */
export interface City<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Country Region.
   */
  countryRegion: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Name.
   */
  name: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Region.
   */
  region: DeserializedType<DeSerializersT, 'Edm.String'>;
}
/**
 * CityField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class CityField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  City,
  NullableT,
  SelectableT
> {
  private _fieldBuilder;
  /**
   * Representation of the {@link City.countryRegion} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  countryRegion: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Representation of the {@link City.name} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  name: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Representation of the {@link City.region} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  region: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Creates an instance of CityField.
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
export declare namespace City {
  /**
   * Metadata information on all properties of the `City` complex type.
   */
  const _propertyMetadata: PropertyMetadata<City>[];
}
//# sourceMappingURL=City.d.ts.map
