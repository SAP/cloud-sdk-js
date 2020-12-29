/* eslint-disable max-classes-per-file */

import { Entity, Constructable } from '../entity';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';
import { ConstructorOrField } from './constructor-or-field';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';

/**
 * Represents a property with a enum value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
class EnumFieldBase<EntityT extends Entity> extends EdmTypeField<
  EntityT,
  /* TODO FieldType is designed to be a union type of a list of static known type.
   For enum type, one can only use any. Use string here since it's better than any.
   However, when using filter you use `EnumType eq 'test'`.
   */
  string
> {}

/**
 * Represents a selectable property with a enum value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class EnumField<EntityT extends Entity>
  extends EnumFieldBase<EntityT>
  implements SelectableEdmTypeField {
  readonly selectable: true;

  constructor(fieldName: string, fieldOf: Constructable<EntityT>) {
    super(fieldName, fieldOf, 'Edm.Enum');
  }
}

/**
 * Represents a complex type property with a enum value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class ComplexTypeEnumPropertyField<
  EntityT extends Entity,
  ComplexT = any
> extends EnumFieldBase<EntityT> {
  /**
   * The constructor of the entity or the complex type this field belongs to
   */
  readonly fieldOf: ConstructorOrField<EntityT, ComplexT>;

  /**
   * Creates an instance of ComplexTypeEnumPropertyField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param fieldOf - The constructor of the entity or the complex type this field belongs to
   * @param edmType - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT, ComplexT>
  ) {
    super(fieldName, getEntityConstructor(fieldOf), 'Edm.Enum');
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
