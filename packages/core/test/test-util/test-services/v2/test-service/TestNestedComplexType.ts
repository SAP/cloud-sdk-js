/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestLvl2NestedComplexType, TestLvl2NestedComplexTypeField } from './TestLvl2NestedComplexType';
import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, EntityV2, FieldType, PropertyMetadata, deserializeComplexTypeV2 } from '../../../../../src';

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
  complexTypeProperty?: TestLvl2NestedComplexType;
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
export class TestNestedComplexTypeField<EntityT extends EntityV2> extends ComplexTypeField<EntityT, TestNestedComplexType> {
  /**
   * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('StringProperty', this, 'Edm.String');
  /**
   * Representation of the [[TestNestedComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestLvl2NestedComplexTypeField<EntityT> = new TestLvl2NestedComplexTypeField('ComplexTypeProperty', this);

  /**
   * Creates an instance of TestNestedComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>) {
    super(fieldName, fieldOf, TestNestedComplexType);
  }
}

export namespace TestNestedComplexType {
  /**
   * Metadata information on all properties of the `TestNestedComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestNestedComplexType>[] = [{
    originalName: 'StringProperty',
    name: 'stringProperty',
    type: 'Edm.String',
    isCollection: false
  }, {
    originalName: 'ComplexTypeProperty',
    name: 'complexTypeProperty',
    type: TestLvl2NestedComplexType,
    isCollection: false
  }];

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  export function build(json: { [keys: string]: FieldType | TestLvl2NestedComplexType }): TestNestedComplexType {
    return deserializeComplexTypeV2(json, TestNestedComplexType);
  }
}
