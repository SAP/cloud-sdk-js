/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import {
  DefaultDeSerializers,
  DeSerializers,
  Entity,
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
} from '@sap-cloud-sdk/odata-v4';

/**
 * Location
 */
export interface Location<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
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
 * LocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class LocationField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  Location,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the [[Location.address]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: EdmTypeField<EntityT, DeSerializersT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('Address', 'Edm.String', false);
  /**
   * Representation of the [[Location.city]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, DeSerializersT, false, false> =
    this._fieldBuilder.buildComplexTypeField('City', CityField, false);

  /**
   * Creates an instance of LocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, Location, fieldOptions);
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
}
