/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  EntityV4,
  FieldBuilder,
  FieldOptions,
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
export class LocationField<
  EntityT extends EntityV4,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, Location, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[Location.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('Address', 'Edm.String', false);
  /**
   * Representation of the [[Location.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, false, false> =
    this._fieldBuilder.buildComplexTypeField('City', CityField, false);

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
  ) {
    super(fieldName, fieldOf, Location, fieldOptions);
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
