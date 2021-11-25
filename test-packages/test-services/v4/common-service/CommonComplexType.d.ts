import { NestedComplexType, NestedComplexTypeField } from './NestedComplexType';
import { Entity } from '@sap-cloud-sdk/odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldOptions,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common/internal';
/**
 * CommonComplexType
 */
export interface CommonComplexType {
  /**
   * String Property.
   */
  stringProperty: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: NestedComplexType;
}
/**
 * CommonComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class CommonComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, CommonComplexType, NullableT, SelectableT> {
  private _fieldBuilder;
  /**
   * Representation of the [[CommonComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false>;
  /**
   * Representation of the [[CommonComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: EdmTypeField<EntityT, 'Edm.Boolean', true, false>;
  /**
   * Representation of the [[CommonComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: NestedComplexTypeField<EntityT, true, false>;
  /**
   * Creates an instance of CommonComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace CommonComplexType {
  /**
   * Metadata information on all properties of the `CommonComplexType` complex type.
   */
  const _propertyMetadata: PropertyMetadata<CommonComplexType>[];
}
//# sourceMappingURL=CommonComplexType.d.ts.map
