import {
  ComplexTypeField,
  ConstructorOrField,
  EntityV4,
  FieldOptions,
  FieldType,
  PropertyMetadata
} from '@sap-cloud-sdk/core';
/**
 * City
 */
export interface City {
  /**
   * Country Region.
   */
  countryRegion: string;
  /**
   * Name.
   */
  name: string;
  /**
   * Region.
   */
  region: string;
}
/**
 * @deprecated Since v1.6.0. Use [[City.build]] instead.
 */
export declare function createCity(json: any): City;
/**
 * CityField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class CityField<
  EntityT extends EntityV4,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, City, NullableT, SelectableT> {
  /** TODO */
  private _fieldBuilder;
  /**
   * Representation of the [[City.countryRegion]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  countryRegion: import('@sap-cloud-sdk/core').EdmTypeClassByType<
    EntityT,
    'Edm.String',
    false,
    import('@sap-cloud-sdk/core').IsSelectableField<this>
  >;
  /**
   * Representation of the [[City.name]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  name: import('@sap-cloud-sdk/core').EdmTypeClassByType<
    EntityT,
    'Edm.String',
    false,
    import('@sap-cloud-sdk/core').IsSelectableField<this>
  >;
  /**
   * Representation of the [[City.region]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  region: import('@sap-cloud-sdk/core').EdmTypeClassByType<
    EntityT,
    'Edm.String',
    false,
    import('@sap-cloud-sdk/core').IsSelectableField<this>
  >;
  /**
   * Creates an instance of CityField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: Partial<FieldOptions<NullableT, SelectableT>>
  );
}
export declare namespace City {
  /**
   * Metadata information on all properties of the `City` complex type.
   */
  const _propertyMetadata: PropertyMetadata<City>[];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json: { [keys: string]: FieldType }): City;
}
//# sourceMappingURL=City.d.ts.map
