/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { City, CityField } from './City';
import {
  CollectionField,
  ComplexTypeField,
  ConstructorOrField,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  EdmTypeField,
  Entity,
  EnumField,
  FieldBuilder,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v4';

/**
 * EventLocation
 */
export interface EventLocation<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Building Info.
   * @nullable
   */
  buildingInfo?: DeserializedType<DeSerializersT, 'Edm.String'>;
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
 * EventLocationField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export class EventLocationField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  EventLocation,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the {@link EventLocation.buildingInfo} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  buildingInfo: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('BuildingInfo', 'Edm.String', true);
  /**
   * Representation of the {@link EventLocation.address} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  address: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  > = this._fieldBuilder.buildEdmTypeField('Address', 'Edm.String', false);
  /**
   * Representation of the {@link EventLocation.city} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  city: CityField<EntityT, DeSerializersT, false, false> =
    this._fieldBuilder.buildComplexTypeField('City', CityField, false);

  /**
   * Creates an instance of EventLocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, EventLocation, fieldOptions);
  }
}

export namespace EventLocation {
  /**
   * Metadata information on all properties of the `EventLocation` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<EventLocation>[] = [
    {
      originalName: 'BuildingInfo',
      name: 'buildingInfo',
      type: 'Edm.String',
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
