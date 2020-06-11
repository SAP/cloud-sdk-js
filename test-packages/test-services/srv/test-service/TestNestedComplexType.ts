/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestNestedComplexOnlyPrimitiveType, TestNestedComplexOnlyPrimitiveTypeField } from './TestNestedComplexOnlyPrimitiveType';
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType, createComplexType, edmToTs } from '@sap-cloud-sdk/core';

/**
 * TestNestedComplexType
 */
export interface TestNestedComplexType {
  /**
   * String Property.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestNestedComplexOnlyPrimitiveType;
}

/**
 * @deprecated Since v1.6.0. Use [[TestNestedComplexType.build]] instead.
 */
export function createTestNestedComplexType(json: any): TestNestedComplexType {
  return TestNestedComplexType.build(json);
}

/**
 * TestNestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestNestedComplexTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
  /**
   * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('StringProperty', this, 'Edm.String');
  /**
   * Representation of the [[TestNestedComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexOnlyPrimitiveTypeField<EntityT> = new TestNestedComplexOnlyPrimitiveTypeField('ComplexTypeProperty', this);
}

export namespace TestNestedComplexType {
  export function build(json: { [keys: string]: FieldType | TestNestedComplexOnlyPrimitiveType }): TestNestedComplexType {
    return createComplexType(json, {
      StringProperty: (stringProperty: string) => ({ stringProperty: edmToTs(stringProperty, 'Edm.String') }),
      ComplexTypeProperty: (complexTypeProperty: TestNestedComplexOnlyPrimitiveType) => ({ complexTypeProperty: TestNestedComplexOnlyPrimitiveType.build(complexTypeProperty) })
    });
  }
}
