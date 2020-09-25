/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, EntityV4, FieldType, PropertyMetadata, deserializeComplexTypeV4 } from '@sap-cloud-sdk/core';

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
export class CityField<EntityT extends EntityV4> extends ComplexTypeField<EntityT, City> {
  /**
   * Representation of the [[City.countryRegion]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  countryRegion: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('CountryRegion', this, 'Edm.String');
  /**
   * Representation of the [[City.name]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  name: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('Name', this, 'Edm.String');
  /**
   * Representation of the [[City.region]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  region: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('Region', this, 'Edm.String');

  /**
   * Creates an instance of CityField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>) {
    super(fieldName, fieldOf, City);
  }
}

export namespace City {
  /**
   * Metadata information on all properties of the `City` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<City>[] = [{
    originalName: 'CountryRegion',
    name: 'countryRegion',
    type: 'Edm.String',
    isCollection: false
  }, {
    originalName: 'Name',
    name: 'name',
    type: 'Edm.String',
    isCollection: false
  }, {
    originalName: 'Region',
    name: 'region',
    type: 'Edm.String',
    isCollection: false
  }];

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  export function build(json: { [keys: string]: FieldType }): City {
    return deserializeComplexTypeV4(json, City);
  }
}
