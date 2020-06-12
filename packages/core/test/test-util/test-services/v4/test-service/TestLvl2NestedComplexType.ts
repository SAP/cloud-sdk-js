/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType, createComplexType, edmToTs } from '../../../../../src/v4';

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
export function createTestLvl2NestedComplexType(json: any): TestLvl2NestedComplexType {
  return TestLvl2NestedComplexType.build(json);
}

/**
 * TestLvl2NestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestLvl2NestedComplexTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
  /**
   * Representation of the [[TestLvl2NestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('StringProperty', this, 'Edm.String');
}

export namespace TestLvl2NestedComplexType {
  export function build(json: { [keys: string]: FieldType }): TestLvl2NestedComplexType {
    return createComplexType(json, {
      StringProperty: (stringProperty: string) => ({ stringProperty: edmToTs(stringProperty, 'Edm.String') })
    });
  }
}
