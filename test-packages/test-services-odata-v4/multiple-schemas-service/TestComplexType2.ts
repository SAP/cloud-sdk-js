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
 * TestComplexType2
 */
export interface TestComplexType2<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * String Property.
   */
  stringProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
}

/**
 * TestComplexType2Field
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexType2Field<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  TestComplexType2,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the {@link TestComplexType2.stringProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    false
  );

  /**
   * Creates an instance of TestComplexType2Field.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, TestComplexType2, fieldOptions);
  }
}

export namespace TestComplexType2 {
  /**
   * Metadata information on all properties of the `TestComplexType2` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestComplexType2>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
}
