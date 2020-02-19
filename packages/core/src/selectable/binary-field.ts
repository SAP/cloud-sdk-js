/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Constructable } from '../constructable';
import { EdmType } from '../edm-types';
import { Entity } from '../entity';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';

// tslint:disable: max-classes-per-file

/**
 * Represents a property with a binary value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class BinaryFieldBase<EntityT extends Entity> extends EdmTypeField<EntityT, string> {}

/**
 * Represents a selectable property with a binary value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class BinaryField<EntityT extends Entity> extends BinaryFieldBase<EntityT> implements SelectableEdmTypeField {
  readonly selectable: true;
}

/**
 * Represents a complex type property with a binary value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class ComplexTypeBinaryPropertyField<EntityT extends Entity> extends BinaryFieldBase<EntityT> {
  /**
   * Creates an instance of ComplexTypeBinaryPropertyField.
   *
   * @param fieldName Actual name of the field used in the OData request
   * @param entityConstructor Constructor type of the entity the field belongs to
   * @param parentTypeName Name of the parent complex type
   * @param edmType Type of the field according to the metadata description
   */
  constructor(fieldName: string, entityConstructor: Constructable<EntityT>, readonly parentTypeName: string, edmType: EdmType) {
    super(fieldName, entityConstructor, edmType);
  }

  /**
   * Path to the field to be used in filter and order by queries. Combines the parent complex type name with the field name.
   *
   * @returns Path to the field to be used in filter and order by queries
   */
  fieldPath(): string {
    return `${this.parentTypeName}/${this._fieldName}`;
  }
}
