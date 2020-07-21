/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType, createComplexType, edmToTs } from '@sap-cloud-sdk/core/v4';

/**
 * City
 */
export interface City {
  /**
   * Name.
   * @nullable
   */
  name?: string;
  /**
   * Country Region.
   * @nullable
   */
  countryRegion?: string;
  /**
   * Region.
   * @nullable
   */
  region?: string;
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
export class CityField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
  /**
   * Representation of the [[City.name]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  name: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('Name', this, 'Edm.String');
  /**
   * Representation of the [[City.countryRegion]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  countryRegion: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('CountryRegion', this, 'Edm.String');
  /**
   * Representation of the [[City.region]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  region: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('Region', this, 'Edm.String');
}

export namespace City {
  export function build(json: { [keys: string]: FieldType }): City {
    return createComplexType(json, {
      Name: (name: string) => ({ name: edmToTs(name, 'Edm.String') }),
      CountryRegion: (countryRegion: string) => ({ countryRegion: edmToTs(countryRegion, 'Edm.String') }),
      Region: (region: string) => ({ region: edmToTs(region, 'Edm.String') })
    });
  }
}
