/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  ComplexTypeField,
  ComplexTypeStringPropertyField,
  ConstructorOrField,
  EntityV2,
  FieldType,
  PropertyMetadata,
  deserializeComplexTypeV2
} from '../../../../../src';

/**
 * TestLvl2NestedComplexType
 */
export interface TestLvl2NestedComplexType {
  /**
   * String Property.
   * @nullable
   */
  stringProperty?: string;
}

/**
 * @deprecated Since v1.6.0. Use [[TestLvl2NestedComplexType.build]] instead.
 */
export function createTestLvl2NestedComplexType(
  json: any
): TestLvl2NestedComplexType {
  return TestLvl2NestedComplexType.build(json);
}

/**
 * TestLvl2NestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestLvl2NestedComplexTypeField<
  EntityT extends EntityV2
> extends ComplexTypeField<EntityT, TestLvl2NestedComplexType> {
  /**
   * Representation of the [[TestLvl2NestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField(
    'StringProperty',
    this,
    'Edm.String'
  );

  /**
   * Creates an instance of TestLvl2NestedComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>) {
    super(fieldName, fieldOf, TestLvl2NestedComplexType);
  }
}

export namespace TestLvl2NestedComplexType {
  /**
   * Metadata information on all properties of the `TestLvl2NestedComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestLvl2NestedComplexType>[] = [
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
  export function build(json: {
    [keys: string]: FieldType;
  }): TestLvl2NestedComplexType {
    return deserializeComplexTypeV2(json, TestLvl2NestedComplexType);
  }
}
