/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, Entity } from '@sap-cloud-sdk/odata-v4';
import { CollectionField, ComplexTypeField, ConstructorOrField, DeserializedType, EdmTypeField, EnumField, FieldBuilder, FieldOptions, OrderableEdmTypeField, PropertyMetadata } from '@sap-cloud-sdk/odata-common/internal';

/**
 * City
 */
export interface City<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
  /**
   * Country Region.
   */
  countryRegion: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Name.
   */
  name: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Region.
   */
  region: DeserializedType<DeSerializersT, 'Edm.String'>;
}

/**
 * CityField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class CityField<EntityT extends Entity, DeSerializersT extends DeSerializers = DefaultDeSerializers, NullableT extends boolean = false, SelectableT extends boolean = false> extends ComplexTypeField<EntityT, DeSerializersT, City, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(this, this.deSerializers);
  /**
   * Representation of the [[City.countryRegion]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  countryRegion: EdmTypeField<EntityT, DeSerializersT, 'Edm.String', false, false> = this._fieldBuilder.buildEdmTypeField('CountryRegion', 'Edm.String', false);
  /**
   * Representation of the [[City.name]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  name: EdmTypeField<EntityT, DeSerializersT, 'Edm.String', false, false> = this._fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false);
  /**
   * Representation of the [[City.region]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  region: EdmTypeField<EntityT, DeSerializersT, 'Edm.String', false, false> = this._fieldBuilder.buildEdmTypeField('Region', 'Edm.String', false);

  /**
   * Creates an instance of CityField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>, deSerializers: DeSerializersT, fieldOptions?: FieldOptions<NullableT, SelectableT>) {
    super(fieldName, fieldOf, deSerializers, City, fieldOptions);
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
}
