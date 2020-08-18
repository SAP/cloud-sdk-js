/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import { ComplexTypeAnyPropertyField, ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, Entity, FieldType, PropertyMetadata, deserializeComplexType } from '@sap-cloud-sdk/core/v4';

/**
 * AirportLocation
 */
export interface AirportLocation {
  /**
   * Loc.
   * @nullable
   */
  loc?: any;
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
 * @deprecated Since v1.6.0. Use [[AirportLocation.build]] instead.
 */
export function createAirportLocation(json: any): AirportLocation {
  return AirportLocation.build(json);
}

/**
 * AirportLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class AirportLocationField<EntityT extends Entity> extends ComplexTypeField<EntityT, AirportLocation> {
  /**
   * Representation of the [[AirportLocation.loc]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  loc: ComplexTypeAnyPropertyField<EntityT> = new ComplexTypeAnyPropertyField('Loc', this, 'Edm.Any');
  /**
   * Representation of the [[AirportLocation.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('Address', this, 'Edm.String');
  /**
   * Representation of the [[AirportLocation.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT> = new CityField('City', this);

  /**
   * Creates an instance of AirportLocationField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>) {
    super(fieldName, fieldOf, AirportLocation);
  }
}

export namespace AirportLocation {
  /**
   * Metadata information on all properties of the `AirportLocation` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<AirportLocation>[] = [{
    originalName: 'Loc',
    name: 'loc',
    type: 'Edm.Any',
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
  export function build(json: { [keys: string]: FieldType | City }): AirportLocation {
    return deserializeComplexType(json, AirportLocation);
  }
}
