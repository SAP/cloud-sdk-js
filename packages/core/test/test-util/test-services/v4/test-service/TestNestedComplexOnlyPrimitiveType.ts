/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType, createComplexType, edmToTs } from '../../../../../src/v4';

/**
 * TestNestedComplexOnlyPrimitiveType
 */
export interface TestNestedComplexOnlyPrimitiveType {
  /**
   * String Property.
   * @nullable
   */
  stringProperty?: string;
}

/**
 * @deprecated Since v1.6.0. Use [[TestNestedComplexOnlyPrimitiveType.build]] instead.
 */
export function createTestNestedComplexOnlyPrimitiveType(json: any): TestNestedComplexOnlyPrimitiveType {
  return TestNestedComplexOnlyPrimitiveType.build(json);
}

/**
 * TestNestedComplexOnlyPrimitiveTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestNestedComplexOnlyPrimitiveTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
  /**
   * Representation of the [[TestNestedComplexOnlyPrimitiveType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('StringProperty', this, 'Edm.String');
}

export namespace TestNestedComplexOnlyPrimitiveType {
  export function build(json: { [keys: string]: null | string | undefined }): TestNestedComplexOnlyPrimitiveType {
    return createComplexType(json, {
      StringProperty: (stringProperty: string) => ({ stringProperty: edmToTs(stringProperty, 'Edm.String') })
    });
  }
}
