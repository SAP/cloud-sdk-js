import {
  TestLvl2NestedComplexType,
  TestLvl2NestedComplexTypeField
} from './TestLvl2NestedComplexType';
import { Entity } from '@sap-cloud-sdk/odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldOptions,
  FieldType,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common';
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
export declare function createTestNestedComplexType(
  json: any
): TestNestedComplexType;
/**
 * TestNestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestNestedComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  TestNestedComplexType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder;
  /**
   * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', true, false>;
  /**
   * Representation of the [[TestNestedComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestLvl2NestedComplexTypeField<EntityT, true, false>;
  /**
   * Creates an instance of TestNestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace TestNestedComplexType {
  /**
   * Metadata information on all properties of the `TestNestedComplexType` complex type.
   */
  const _propertyMetadata: PropertyMetadata<TestNestedComplexType>[];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
   */
  function build(json: {
    [keys: string]: FieldType | TestLvl2NestedComplexType;
  }): TestNestedComplexType;
}
//# sourceMappingURL=TestNestedComplexType.d.ts.map
