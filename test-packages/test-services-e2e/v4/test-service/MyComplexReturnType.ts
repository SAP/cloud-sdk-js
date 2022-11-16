/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
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
 * MyComplexReturnType
 */
export interface MyComplexReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Some Message.
   * @nullable
   */
  someMessage?: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Some Id.
   * @nullable
   */
  someId?: DeserializedType<DeSerializersT, 'Edm.Int32'>;
}

/**
 * MyComplexReturnTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export class MyComplexReturnTypeField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  MyComplexReturnType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the {@link MyComplexReturnType.someMessage} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  someMessage: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('someMessage', 'Edm.String', true);
  /**
   * Representation of the {@link MyComplexReturnType.someId} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  someId: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Int32',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('someId', 'Edm.Int32', true);

  /**
   * Creates an instance of MyComplexReturnTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, MyComplexReturnType, fieldOptions);
  }
}

export namespace MyComplexReturnType {
  /**
   * Metadata information on all properties of the `MyComplexReturnType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<MyComplexReturnType>[] = [
    {
      originalName: 'someMessage',
      name: 'someMessage',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'someId',
      name: 'someId',
      type: 'Edm.Int32',
      isCollection: false
    }
  ];
}
