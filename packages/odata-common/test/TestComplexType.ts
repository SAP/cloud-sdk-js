/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
// import { deserializeComplexType, Entity } from '@sap-cloud-sdk/odata-v2';
// import { ComplexTypeField, ConstructorOrField, EdmTypeField, FieldBuilder, FieldOptions, FieldType, PropertyMetadata } from '@sap-cloud-sdk/odata-common/internal';


import { ComplexTypeField, ConstructorOrField, EdmTypeField, FieldBuilder, FieldOptions, FieldType, PropertyMetadata,EntityBase as Entity } from '../src/internal';

/**
 * TestComplexType
 */
export interface TestComplexType {
  /**
   * String Property.
   */
  stringProperty: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
}

// /**
//  * @deprecated Since v1.6.0. Use [[TestComplexType.build]] instead.
//  */
// export function createTestComplexType(json: any): TestComplexType {
//   return TestComplexType.build(json);
// }

/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexTypeField<EntityT extends Entity, NullableT extends boolean = false, SelectableT extends boolean = false> extends ComplexTypeField<EntityT, TestComplexType, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[TestComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false> = this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);
  /**
   * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: EdmTypeField<EntityT, 'Edm.Boolean', true, false> = this._fieldBuilder.buildEdmTypeField('BooleanProperty', 'Edm.Boolean', true);

  /**
   * Creates an instance of TestComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>, fieldOptions?: FieldOptions<NullableT, SelectableT>) {
    super(fieldName, fieldOf, TestComplexType, fieldOptions);
  }
}

export namespace TestComplexType {
  /**
   * Metadata information on all properties of the `TestComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestComplexType>[] = [{
    originalName: 'StringProperty',
    name: 'stringProperty',
    type: 'Edm.String',
    isCollection: false
  }, {
    originalName: 'BooleanProperty',
    name: 'booleanProperty',
    type: 'Edm.Boolean',
    isCollection: false
  }];

  // /**
  //  * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
  //  */
  // export function build(json: { [keys: string]: FieldType }): TestComplexType {
  //   return deserializeComplexType(json, TestComplexType);
  // }
}
