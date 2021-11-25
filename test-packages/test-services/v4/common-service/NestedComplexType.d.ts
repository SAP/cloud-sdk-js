import { Entity } from '@sap-cloud-sdk/odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldOptions,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common/internal';
/**
 * NestedComplexType
 */
export interface NestedComplexType {
  /**
   * String Property.
   * @nullable
   */
  stringProperty?: string;
}
/**
 * NestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class NestedComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, NestedComplexType, NullableT, SelectableT> {
  private _fieldBuilder;
  /**
   * Representation of the [[NestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', true, false>;
  /**
   * Creates an instance of NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace NestedComplexType {
  /**
   * Metadata information on all properties of the `NestedComplexType` complex type.
   */
  const _propertyMetadata: PropertyMetadata<NestedComplexType>[];
}
//# sourceMappingURL=NestedComplexType.d.ts.map
