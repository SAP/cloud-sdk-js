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
} from '../../../../../src';

/**
 * TestComplexType2
 */
export interface TestComplexType2 {
  /**
   * String Property.
   */
  stringProperty: string;
}

/**
 * @deprecated Since v1.6.0. Use [[TestComplexType2.build]] instead.
 */
export function createTestComplexType2(json: any): TestComplexType2 {
  return TestComplexType2.build(json);
}

/**
 * TestComplexType2Field
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexType2Field<
  EntityT extends EntityV4,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, TestComplexType2, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[TestComplexType2.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);

  /**
   * Creates an instance of TestComplexType2Field.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, TestComplexType2, fieldOptions);
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

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  export function build(json: { [keys: string]: FieldType }): TestComplexType2 {
    return deserializeComplexTypeV4(json, TestComplexType2);
  }
}
