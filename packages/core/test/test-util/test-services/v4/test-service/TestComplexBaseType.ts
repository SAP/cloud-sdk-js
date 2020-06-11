/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType, createComplexType, edmToTs } from '../../../../../src/v4';

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
export class TestComplexBaseTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
  /**
   * Representation of the [[TestComplexBaseType.baseStringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  baseStringProperty: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('BaseStringProperty', this, 'Edm.String');
}

export namespace TestComplexBaseType {
  export function build(json: { [keys: string]: FieldType }): TestComplexBaseType {
    return createComplexType(json, {
      BaseStringProperty: (baseStringProperty: string) => ({ baseStringProperty: edmToTs(baseStringProperty, 'Edm.String') })
    });
  }
}
