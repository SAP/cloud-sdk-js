/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

import {
  TestNestedComplexType,
  TestNestedComplexTypeField
} from './TestNestedComplexType';
import {
  ComplexTypeField,
  ConstructorOrField,
  EntityV2,
  FieldType,
  PropertyMetadata,
  deserializeComplexTypeV2,
  EdmField
} from '../../../../../src';
import { FieldBuilder } from '../../../../../src/odata-common/selectable/field-builder';

/**
 * TestComplexType
 */
export interface TestComplexType {
  /**
   * String Property.
   */
  stringProperty: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: any;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestNestedComplexType;
}

/**
 * @deprecated Since v1.6.0. Use [[TestComplexType.build]] instead.
 */
export function createTestComplexType_1(json: any): TestComplexType {
  return TestComplexType.build(json);
}

/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexTypeField<
  EntityT extends EntityV2,
  NullableT extends boolean
> extends ComplexTypeField<EntityT, TestComplexType, NullableT> {
  /**
   * Representation of the [[TestComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmField<EntityT, 'Edm.String', true>;
  /**
   * Representation of the [[TestComplexType.int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int16Property: EdmField<EntityT, 'Edm.Int16', true>;
  /**
   * Representation of the [[TestComplexType.somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  somethingTheSdkDoesNotSupport: EdmField<EntityT, 'Edm.Any', false>;
  /**
   * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexTypeField<EntityT, true>;

  /**
   * Creates an instance of TestComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    isNullable: NullableT
  ) {
    super(fieldName, fieldOf, TestComplexType, isNullable);
    const fieldBuilder = new FieldBuilder(this);

    this.stringProperty = fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      true
    );
    this.int16Property = fieldBuilder.buildEdmTypeField(
      'Int16Property',
      'Edm.Int16',
      true
    );
    this.somethingTheSdkDoesNotSupport = fieldBuilder.buildEdmTypeField(
      'SomethingTheSDKDoesNotSupport',
      'Edm.Any',
      false
    );
    this.complexTypeProperty = fieldBuilder.buildComplexTypeField(
      'ComplexTypeProperty',
      TestNestedComplexTypeField,
      true
    );
  }
}

export namespace TestComplexType {
  /**
   * Metadata information on all properties of the `TestComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestComplexType>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'Int16Property',
      name: 'int16Property',
      type: 'Edm.Int16',
      isCollection: false
    },
    {
      originalName: 'SomethingTheSDKDoesNotSupport',
      name: 'somethingTheSdkDoesNotSupport',
      type: 'Edm.Any',
      isCollection: false
    },
    {
      originalName: 'ComplexTypeProperty',
      name: 'complexTypeProperty',
      type: TestNestedComplexType,
      isCollection: false
    }
  ];

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  export function build(json: {
    [keys: string]: FieldType | TestNestedComplexType;
  }): TestComplexType {
    return deserializeComplexTypeV2(json, TestComplexType);
  }
}
