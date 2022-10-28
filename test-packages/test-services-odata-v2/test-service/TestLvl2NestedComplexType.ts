/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  ComplexTypeField,
  ConstructorOrField,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  EdmTypeField,
  Entity,
  FieldBuilder,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v2';

/**
 * TestLvl2NestedComplexType
 */
export interface TestLvl2NestedComplexType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * String Property.
   * @nullable
   */
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
}

/**
 * TestLvl2NestedComplexTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestLvl2NestedComplexTypeField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  TestLvl2NestedComplexType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the {@link TestLvl2NestedComplexType.stringProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );

  /**
   * Creates an instance of TestLvl2NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(
      fieldName,
      fieldOf,
      deSerializers,
      TestLvl2NestedComplexType,
      fieldOptions
    );
  }
}

export namespace TestLvl2NestedComplexType {
  /**
   * Metadata information on all properties of the `TestLvl2NestedComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestLvl2NestedComplexType>[] =
    [
      {
        originalName: 'StringProperty',
        name: 'stringProperty',
        type: 'Edm.String',
        isCollection: false
      }
    ];
}
