import { City, CityField } from './City';
import { Entity } from '@sap-cloud-sdk/odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldOptions,
  FieldType,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common';
/**
 * EventLocation
 */
export interface EventLocation {
  /**
   * Building Info.
   * @nullable
   */
  buildingInfo?: string;
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
 * @deprecated Since v1.6.0. Use [[EventLocation.build]] instead.
 */
export declare function createEventLocation(json: any): EventLocation;
/**
 * EventLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class EventLocationField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, EventLocation, NullableT, SelectableT> {
  private _fieldBuilder;
  /**
   * Representation of the [[EventLocation.buildingInfo]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  buildingInfo: EdmTypeField<EntityT, 'Edm.String', true, false>;
  /**
   * Representation of the [[EventLocation.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: EdmTypeField<EntityT, 'Edm.String', false, false>;
  /**
   * Representation of the [[EventLocation.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, false, false>;
  /**
   * Creates an instance of EventLocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace EventLocation {
  /**
   * Metadata information on all properties of the `EventLocation` complex type.
   */
  const _propertyMetadata: PropertyMetadata<EventLocation>[];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `../../../../core` package instead.
   */
  function build(json: { [keys: string]: FieldType | City }): EventLocation;
}
//# sourceMappingURL=EventLocation.d.ts.map
