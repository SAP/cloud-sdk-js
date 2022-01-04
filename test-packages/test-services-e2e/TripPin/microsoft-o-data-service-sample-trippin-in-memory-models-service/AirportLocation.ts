/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import {
  DefaultDeSerializers,
  DeSerializers,
  Entity
} from '@sap-cloud-sdk/odata-v4';
import {
  CollectionField,
  ComplexTypeField,
  ConstructorOrField,
  DeserializedType,
  EdmTypeField,
  EnumField,
  FieldBuilder,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * AirportLocation
 */
export interface AirportLocation<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Loc.
   */
  loc: DeserializedType<DeSerializersT, 'Edm.Any'>;
  /**
   * Address.
   */
  address: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * City.
   */
  city: DeserializedType<
    DeSerializersT,
    'Microsoft.OData.SampleService.Models.TripPin.City'
  >;
}

/**
 * AirportLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class AirportLocationField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  AirportLocation,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the [[AirportLocation.loc]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  loc: EdmTypeField<EntityT, DeSerializersT, 'Edm.Any', false, false> =
    this._fieldBuilder.buildEdmTypeField('Loc', 'Edm.Any', false);
  /**
   * Representation of the [[AirportLocation.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: EdmTypeField<EntityT, DeSerializersT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('Address', 'Edm.String', false);
  /**
   * Representation of the [[AirportLocation.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, DeSerializersT, false, false> =
    this._fieldBuilder.buildComplexTypeField('City', CityField, false);

  /**
   * Creates an instance of AirportLocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, AirportLocation, fieldOptions);
  }
}

export namespace AirportLocation {
  /**
   * Metadata information on all properties of the `AirportLocation` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<AirportLocation>[] = [
    {
      originalName: 'Loc',
      name: 'loc',
      type: 'Edm.Any',
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
}
