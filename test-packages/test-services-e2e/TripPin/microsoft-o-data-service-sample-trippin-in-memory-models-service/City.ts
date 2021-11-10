/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
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
export function createCity(json: any): City {
  return City.build(json);
}

/**
 * CityField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class CityField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, City, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[City.countryRegion]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  countryRegion: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('CountryRegion', 'Edm.String', false);
  /**
   * Representation of the [[City.name]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  name: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false);
  /**
   * Representation of the [[City.region]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  region: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('Region', 'Edm.String', false);

  /**
   * Creates an instance of CityField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, City, fieldOptions);
  }
}

export namespace City {
  /**
   * Metadata information on all properties of the `City` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<City>[] = [
    {
      originalName: 'CountryRegion',
      name: 'countryRegion',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'Name',
      name: 'name',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'Region',
      name: 'region',
      type: 'Edm.String',
      isCollection: false
    }
  ];

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
   */
  export function build(json: { [keys: string]: FieldType }): City {
    return deserializeComplexType(json, City);
  }
}
