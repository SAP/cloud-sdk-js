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
 * AirportLocation
 */
export interface AirportLocation {
  /**
   * Loc.
   */
  loc: any;
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
 * @deprecated Since v1.6.0. Use [[AirportLocation.build]] instead.
 */
export declare function createAirportLocation(json: any): AirportLocation;
/**
 * AirportLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class AirportLocationField<
  EntityT extends EntityV4,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, AirportLocation, NullableT, SelectableT> {
  private _fieldBuilder;
  /**
   * Representation of the [[AirportLocation.loc]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  loc: EdmTypeField<EntityT, 'Edm.Any', false, false>;
  /**
   * Representation of the [[AirportLocation.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: EdmTypeField<EntityT, 'Edm.String', false, false>;
  /**
   * Representation of the [[AirportLocation.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, false, false>;
  /**
   * Creates an instance of AirportLocationField.
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
export declare namespace AirportLocation {
  /**
   * Metadata information on all properties of the `AirportLocation` complex type.
   */
  const _propertyMetadata: PropertyMetadata<AirportLocation>[];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json: { [keys: string]: FieldType | City }): AirportLocation;
}
//# sourceMappingURL=AirportLocation.d.ts.map
