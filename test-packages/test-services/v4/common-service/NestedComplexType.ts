/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
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
export class NestedComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, NestedComplexType, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[NestedComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', true, false> =
    this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', true);

  /**
   * Creates an instance of NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, NestedComplexType, fieldOptions);
  }
}

export namespace NestedComplexType {
  /**
   * Metadata information on all properties of the `NestedComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<NestedComplexType>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
}
