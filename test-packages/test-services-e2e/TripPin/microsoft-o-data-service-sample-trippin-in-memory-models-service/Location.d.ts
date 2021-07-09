import { City, CityField } from './City';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  EntityV4,
  FieldOptions,
  FieldType,
  PropertyMetadata
} from '@sap-cloud-sdk/core';
/**
 * Location
 */
export interface Location {
  /**
   * Address.
   */
  address: string;
  /**
   * City.
   */
  city: City;
}
/**
 * @deprecated Since v1.6.0. Use [[Location.build]] instead.
 */
export declare function createLocation(json: any): Location;
/**
 * LocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class LocationField<
  EntityT extends EntityV4,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, Location, NullableT, SelectableT> {
  private _fieldBuilder;
  /**
   * Representation of the [[Location.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: EdmTypeField<EntityT, 'Edm.String', false, false>;
  /**
   * Representation of the [[Location.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, false, false>;
  /**
   * Creates an instance of LocationField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace Location {
  /**
   * Metadata information on all properties of the `Location` complex type.
   */
  const _propertyMetadata: PropertyMetadata<Location>[];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json: { [keys: string]: FieldType | City }): Location;
}
//# sourceMappingURL=Location.d.ts.map
