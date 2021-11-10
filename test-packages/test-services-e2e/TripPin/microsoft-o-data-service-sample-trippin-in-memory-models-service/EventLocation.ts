/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import { deserializeComplexType, Entity } from '@sap-cloud-sdk/odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldBuilder,
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
export function createEventLocation(json: any): EventLocation {
  return EventLocation.build(json);
}

/**
 * EventLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class EventLocationField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, EventLocation, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[EventLocation.buildingInfo]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  buildingInfo: EdmTypeField<EntityT, 'Edm.String', true, false> =
    this._fieldBuilder.buildEdmTypeField('BuildingInfo', 'Edm.String', true);
  /**
   * Representation of the [[EventLocation.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('Address', 'Edm.String', false);
  /**
   * Representation of the [[EventLocation.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, false, false> =
    this._fieldBuilder.buildComplexTypeField('City', CityField, false);

  /**
   * Creates an instance of EventLocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, EventLocation, fieldOptions);
  }
}

export namespace EventLocation {
  /**
   * Metadata information on all properties of the `EventLocation` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<EventLocation>[] = [
    {
      originalName: 'BuildingInfo',
      name: 'buildingInfo',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'Address',
      name: 'address',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'City',
      name: 'city',
      type: City,
      isCollection: false
    }
  ];

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2 or @sap-cloud-sdk/odata-v4` package instead.
   */
  export function build(json: {
    [keys: string]: FieldType | City;
  }): EventLocation {
    return deserializeComplexType(json, EventLocation);
  }
}
