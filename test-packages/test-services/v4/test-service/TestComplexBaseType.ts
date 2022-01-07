/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
 * TestComplexBaseType
 */
export interface TestComplexBaseType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Base String Property.
   * @nullable
   */
  baseStringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
}

/**
 * TestComplexBaseTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexBaseTypeField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  TestComplexBaseType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the [[TestComplexBaseType.baseStringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  baseStringProperty: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'BaseStringProperty',
    'Edm.String',
    true
  );

  /**
   * Creates an instance of TestComplexBaseTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, TestComplexBaseType, fieldOptions);
  }
}

export namespace TestComplexBaseType {
  /**
   * Metadata information on all properties of the `TestComplexBaseType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestComplexBaseType>[] = [
    {
      originalName: 'BaseStringProperty',
      name: 'baseStringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
}
