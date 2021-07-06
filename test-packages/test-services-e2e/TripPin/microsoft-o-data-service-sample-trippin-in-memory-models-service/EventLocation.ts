/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmField,
  EntityV4,
  FieldType,
  PropertyMetadata,
  deserializeComplexTypeV4
} from '@sap-cloud-sdk/core';

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
  EntityT extends EntityV4,
  NullableT extends boolean = false
> extends ComplexTypeField<EntityT, EventLocation> {
  /**
   * Representation of the [[EventLocation.buildingInfo]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  buildingInfo: EdmField<EntityT, 'Edm.String', true> = new EdmField(
    'BuildingInfo',
    this,
    'Edm.String',
    true
  );
  /**
   * Representation of the [[EventLocation.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: EdmField<EntityT, 'Edm.String', false> = new EdmField(
    'Address',
    this,
    'Edm.String',
    false
  );
  /**
   * Representation of the [[EventLocation.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, false> = new CityField('City', this, false);

  /**
   * Creates an instance of EventLocationField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, fieldOf, EventLocation);
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
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  export function build(json: {
    [keys: string]: FieldType | City;
  }): EventLocation {
    return deserializeComplexTypeV4(json, EventLocation);
  }
}
