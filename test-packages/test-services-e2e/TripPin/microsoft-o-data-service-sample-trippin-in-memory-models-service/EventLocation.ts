/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, Entity, FieldType, PropertyMetadata, deserializeComplexType } from '@sap-cloud-sdk/core/v4';

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
   * @nullable
   */
  address?: string;
  /**
   * City.
   * @nullable
   */
  city?: City;
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
export class EventLocationField<EntityT extends Entity> extends ComplexTypeField<EntityT, EventLocation> {
  /**
   * Representation of the [[EventLocation.buildingInfo]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  buildingInfo: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('BuildingInfo', this, 'Edm.String');
  /**
   * Representation of the [[EventLocation.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('Address', this, 'Edm.String');
  /**
   * Representation of the [[EventLocation.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT> = new CityField('City', this);

  /**
   * Creates an instance of EventLocationField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>) {
    super(fieldName, fieldOf, EventLocation);
  }
}

export namespace EventLocation {
  /**
   * Metadata information on all properties of the `EventLocation` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<EventLocation>[] = [{
    originalName: 'BuildingInfo',
    name: 'buildingInfo',
    type: 'Edm.String',
    isCollection: false
  }, {
    originalName: 'Address',
    name: 'address',
    type: 'Edm.String',
    isCollection: false
  }, {
    originalName: 'City',
    name: 'city',
    type: City,
    isCollection: false
  }];

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/core` package instead.
   */
  export function build(json: { [keys: string]: FieldType | City }): EventLocation {
    return deserializeComplexType(json, EventLocation);
  }
}
