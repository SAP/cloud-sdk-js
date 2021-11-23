import { Entity } from '@sap-cloud-sdk/odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldOptions,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common/internal';
/**
 * TestComplexType1
 */
export interface TestComplexType1 {
  /**
   * String Property.
   */
  stringProperty: string;
}
/**
 * TestComplexType1Field
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestComplexType1Field<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, TestComplexType1, NullableT, SelectableT> {
  private _fieldBuilder;
  /**
   * Representation of the [[TestComplexType1.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false>;
  /**
   * Creates an instance of TestComplexType1Field.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace TestComplexType1 {
  /**
   * Metadata information on all properties of the `TestComplexType1` complex type.
   */
  const _propertyMetadata: PropertyMetadata<TestComplexType1>[];
}
//# sourceMappingURL=TestComplexType1.d.ts.map
