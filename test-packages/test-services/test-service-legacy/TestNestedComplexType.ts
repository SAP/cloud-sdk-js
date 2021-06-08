/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  ComplexTypeField,
  ComplexTypeStringPropertyField,
  Entity,
  FieldType,
  createComplexType,
  edmToTs
} from '@sap-cloud-sdk/core';

/**
 * TestNestedComplexType
 */
export interface TestNestedComplexType {
  /**
   * String Property.
   * @nullable
   */
  stringProperty?: string;
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
export class TestNestedComplexTypeField<
  EntityT extends Entity
> extends ComplexTypeField<EntityT> {
  /**
   * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: ComplexTypeStringPropertyField<EntityT> =
    new ComplexTypeStringPropertyField('StringProperty', this, 'Edm.String');
}

export namespace TestNestedComplexType {
  export function build(json: {
    [keys: string]: FieldType;
  }): TestNestedComplexType {
    return createComplexType(json, {
      StringProperty: (stringProperty: string) => ({
        stringProperty: edmToTs(stringProperty, 'Edm.String')
      })
    });
  }
}
