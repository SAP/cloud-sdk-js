/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
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
 * TestComplexType1
 */
export interface TestComplexType1<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * String Property.
   */
  stringProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
}

/**
 * TestComplexType1Field
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexType1Field<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  TestComplexType1,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the [[TestComplexType1.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<
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
   * Creates an instance of TestComplexType1Field.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, TestComplexType1, fieldOptions);
  }
}

export namespace TestComplexType1 {
  /**
   * Metadata information on all properties of the `TestComplexType1` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestComplexType1>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
}
