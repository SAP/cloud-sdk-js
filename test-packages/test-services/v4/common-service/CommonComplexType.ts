/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { NestedComplexType, NestedComplexTypeField } from './NestedComplexType';
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
export class CommonComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, CommonComplexType, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  /**
   * Representation of the [[CommonComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);
  /**
   * Representation of the [[CommonComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: EdmTypeField<EntityT, 'Edm.Boolean', true, false> =
    this._fieldBuilder.buildEdmTypeField(
      'BooleanProperty',
      'Edm.Boolean',
      true
    );
  /**
   * Representation of the [[CommonComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: NestedComplexTypeField<EntityT, true, false> =
    this._fieldBuilder.buildComplexTypeField(
      'ComplexTypeProperty',
      NestedComplexTypeField,
      true
    );

  /**
   * Creates an instance of CommonComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, CommonComplexType, fieldOptions);
  }
}

export namespace CommonComplexType {
  /**
   * Metadata information on all properties of the `CommonComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<CommonComplexType>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'BooleanProperty',
      name: 'booleanProperty',
      type: 'Edm.Boolean',
      isCollection: false
    },
    {
      originalName: 'ComplexTypeProperty',
      name: 'complexTypeProperty',
      type: NestedComplexType,
      isCollection: false
    }
  ];
}
