/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  EntityV4,
  FieldBuilder,
  FieldOptions,
  FieldType,
  PropertyMetadata,
  deserializeComplexTypeV4
} from '@sap-cloud-sdk/core';

/**
 * TestComplexBaseType
 */
export interface TestComplexBaseType {
  /**
   * Base String Property.
   * @nullable
   */
  baseStringProperty?: string;
}

/**
 * @deprecated Since v1.6.0. Use [[TestComplexBaseType.build]] instead.
 */
export function createTestComplexBaseType(json: any): TestComplexBaseType {
  return TestComplexBaseType.build(json);
}

/**
 * TestComplexBaseTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexBaseTypeField<
  EntityT extends EntityV4,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  TestComplexBaseType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[TestComplexBaseType.baseStringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  baseStringProperty: EdmTypeField<EntityT, 'Edm.String', true, false> =
    this._fieldBuilder.buildEdmTypeField(
      'BaseStringProperty',
      'Edm.String',
      true
    );

  /**
   * Creates an instance of TestComplexBaseTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, TestComplexBaseType, fieldOptions);
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

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  export function build(json: {
    [keys: string]: FieldType;
  }): TestComplexBaseType {
    return deserializeComplexTypeV4(json, TestComplexBaseType);
  }
}
