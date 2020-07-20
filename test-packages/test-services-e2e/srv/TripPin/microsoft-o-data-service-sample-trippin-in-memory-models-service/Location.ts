/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType, createComplexType, edmToTs } from '@sap-cloud-sdk/core/v4';

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
export class LocationField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
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
}

export namespace Location {
  export function build(json: { [keys: string]: FieldType | City }): Location {
    return createComplexType(json, {
      Address: (address: string) => ({ address: edmToTs(address, 'Edm.String') }),
      City: (city: City) => ({ city: City.build(city) })
    });
  }
}
