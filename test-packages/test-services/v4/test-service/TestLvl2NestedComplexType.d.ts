import { Entity } from '@sap-cloud-sdk/odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldOptions,
  FieldType,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common/internal';
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
export declare function createTestLvl2NestedComplexType(
  json: any
): TestLvl2NestedComplexType;
/**
 * TestLvl2NestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestLvl2NestedComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  TestLvl2NestedComplexType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder;
  /**
   * Representation of the [[TestLvl2NestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', true, false>;
  /**
   * Creates an instance of TestLvl2NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace TestLvl2NestedComplexType {
  /**
   * Metadata information on all properties of the `TestLvl2NestedComplexType` complex type.
   */
  const _propertyMetadata: PropertyMetadata<TestLvl2NestedComplexType>[];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
   */
  function build(json: {
    [keys: string]: FieldType;
  }): TestLvl2NestedComplexType;
}
//# sourceMappingURL=TestLvl2NestedComplexType.d.ts.map
