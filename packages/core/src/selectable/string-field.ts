/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Constructable } from '../constructable';
import { EdmType } from '../edm-types';
import { Entity } from '../entity';
import { ComplexTypeField } from './complex-type-field';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';

// tslint:disable: max-classes-per-file

/**
 * Represents a property with a string value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
class StringFieldBase<EntityT extends Entity> extends EdmTypeField<EntityT, string> {}

/**
 * Represents a selectable property with a string value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class StringField<EntityT extends Entity> extends StringFieldBase<EntityT> implements SelectableEdmTypeField {
  readonly selectable: true;
}

/**
 * Represents a complex type property with a string value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class ComplexTypeStringPropertyField<EntityT extends Entity> extends StringFieldBase<EntityT> {
  /**
   * Creates an instance of ComplexTypeStringPropertyField.
   *
   * @param fieldName Actual name of the field used in the OData request
   *  @param parentComplexField  Parent complex field
   * @param edmType Type of the field according to the metadata description
   */
  constructor(fieldName: string, readonly parentComplexField: ComplexTypeField<EntityT>, edmType: EdmType) {
    super(fieldName, parentComplexField._entityConstructor, edmType);
  }

  /**
   * Path to the field to be used in filter and order by queries. Combines the parent complex type name with the field name.
   *
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return `${this.parentComplexField.pathToRootComplex}/${this._fieldName}`;
  }
}
