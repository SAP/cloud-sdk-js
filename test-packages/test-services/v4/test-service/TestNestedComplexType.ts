/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  TestLvl2NestedComplexType,
  TestLvl2NestedComplexTypeField
} from './TestLvl2NestedComplexType';
import { deserializeComplexType, Entity } from '@sap-cloud-sdk/odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldBuilder,
  FieldOptions,
  FieldType,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common/internal';

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
 * TestNestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestNestedComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  TestNestedComplexType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', true, false> =
    this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', true);
  /**
   * Representation of the [[TestNestedComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestLvl2NestedComplexTypeField<EntityT, true, false> =
    this._fieldBuilder.buildComplexTypeField(
      'ComplexTypeProperty',
      TestLvl2NestedComplexTypeField,
      true
    );

  /**
   * Creates an instance of TestNestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, TestNestedComplexType, fieldOptions);
  }
}

export namespace TestNestedComplexType {
  /**
   * Metadata information on all properties of the `TestNestedComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestNestedComplexType>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'ComplexTypeProperty',
      name: 'complexTypeProperty',
      type: TestLvl2NestedComplexType,
      isCollection: false
    }
  ];
}
