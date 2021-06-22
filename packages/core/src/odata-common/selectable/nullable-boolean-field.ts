/* eslint-disable max-classes-per-file */

import { EdmTypeShared } from '../edm-types';
import { Entity, ODataVersionOf } from '../entity';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';
import { ConstructorOrField } from './constructor-or-field';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';

/**
 * Represents a property with a boolean value, that is nullable.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class NullableBooleanFieldBase<
  EntityT extends Entity
> extends EdmTypeField<EntityT, boolean | null> {}

/**
 * Represents a selectable property with a boolean value, that is nullable.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class NullableBooleanField<EntityT extends Entity>
  extends NullableBooleanFieldBase<EntityT>
  implements SelectableEdmTypeField
{
  readonly selectable: true;
}

/**
 * Represents a complex type property with a boolean value, that is nullable.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class ComplexTypeNullableBooleanPropertyField<
  EntityT extends Entity,
  ComplexT = any
> extends NullableBooleanFieldBase<EntityT> {
  /**
   * The constructor of the entity or the complex type this field belongs to
   */
  readonly fieldOf: ConstructorOrField<EntityT, ComplexT>;

  /**
   * Creates an instance of ComplexTypeBooleanPropertyField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param fieldOf - The constructor of the entity or the complex type this field belongs to
   * @param edmType - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT, ComplexT>,
    edmType: EdmTypeShared<ODataVersionOf<EntityT>>
  ) {
    super(fieldName, getEntityConstructor(fieldOf), edmType);
    this.fieldOf = fieldOf;
  }

  /**
   * Path to the field to be used in filter and order by queries. Combines the parent complex type name with the field name.
   *
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this.fieldOf instanceof ComplexTypeField
      ? `${this.fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}
