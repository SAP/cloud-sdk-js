/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, Entity, FieldType, PropertyMetadata, deserializeComplexType } from '@sap-cloud-sdk/core/v4';

/**
 * Location
 */
export interface Location {
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
 * @deprecated Since v1.6.0. Use [[Location.build]] instead.
 */
export function createLocation(json: any): Location {
  return Location.build(json);
}

/**
 * LocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class LocationField<EntityT extends Entity> extends ComplexTypeField<EntityT, Location> {
  /**
   * Representation of the [[Location.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('Address', this, 'Edm.String');
  /**
   * Representation of the [[Location.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT> = new CityField('City', this);

  /**
   * Creates an instance of LocationField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT, Location>) {
    super(fieldName, fieldOf, Location);
  }
}

export namespace Location {
  /**
   * Metadata information on all properties of the `Location` complex type.
   */
  export const _propertyMetadata: PropertyMetadata[] = [{
    originalName: 'Address',
    name: 'address',
    type: 'Edm.String'
  }, {
    originalName: 'City',
    name: 'city',
    type: City
  }];
  /**
   * Type reference to the according complex type.
   */
  export const _complexType: Location = {};

  /**
   * @deprecated Since v1.25.0. Use [[deserializeComplexType]] instead.
   */
  export function build(json: { [keys: string]: FieldType | City }): Location {
    return deserializeComplexType(json, Location);
  }
}
