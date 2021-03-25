/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import {
  ComplexTypeField,
  ComplexTypeStringPropertyField,
  ConstructorOrField,
  EntityV4,
  FieldType,
  PropertyMetadata,
  deserializeComplexTypeV4
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
export function createLocation(json: any): Location {
  return Location.build(json);
}

/**
 * LocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class LocationField<EntityT extends EntityV4> extends ComplexTypeField<
  EntityT,
  Location
> {
  /**
   * Representation of the [[Location.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField(
    'Address',
    this,
    'Edm.String'
  );
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
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>) {
    super(fieldName, fieldOf, Location);
  }
}

export namespace Location {
  /**
   * Metadata information on all properties of the `Location` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<Location>[] = [
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
  export function build(json: { [keys: string]: FieldType | City }): Location {
    return deserializeComplexTypeV4(json, Location);
  }
}
