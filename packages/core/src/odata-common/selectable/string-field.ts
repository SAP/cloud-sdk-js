/* eslint-disable max-classes-per-file */

import { EdmTypeShared } from '../edm-types';
import { Entity, ODataVersionOf, Constructable } from '../entity';
import {
  ComplexTypeField,
  getEdmType,
  getEntityConstructor,
  getIsNullable
} from './complex-type-field';
import { ConstructorOrField } from './constructor-or-field';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';
import { ConditionallyNullable } from './nullable';

class StringFieldBase<
  EntityT extends Entity,
  NullableT extends boolean
> extends EdmTypeField<
  EntityT,
  ConditionallyNullable<string, NullableT>,
  NullableT
> {}

/**
 * Represents a selectable property with a string value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class StringField<
    EntityT extends Entity,
    NullableT extends boolean = false
  >
  extends StringFieldBase<EntityT, NullableT>
  implements SelectableEdmTypeField
{
  readonly selectable: true;
}

/**
 * Represents a complex type property with a string value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class ComplexTypeStringPropertyField<
  EntityT extends Entity,
  ComplexT = any,
  NullableT extends boolean = false
> extends StringFieldBase<EntityT, NullableT> {
  /**
   * The constructor of the entity or the complex type this field belongs to
   */
  readonly fieldOf: ConstructorOrField<EntityT, ComplexT>;

  /**
   * Creates an instance of ComplexTypeStringPropertyField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param fieldOf - The constructor of the entity or the complex type this field belongs to
   * @param edmType - Type of the field according to the metadata description
   * @param isNullable - Whether the field is nullable or not
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT, ComplexT>,
    edmType: EdmTypeShared<ODataVersionOf<EntityT>>,
    isNullable: NullableT
  );

  /**
   * @deprecated Since v1.19.0.
   *
   * Creates an instance of ComplexTypeStringPropertyField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param entityConstructor - Constructor type of the entity the field belongs to
   * @param parentTypeName - Name of the parent complex type
   * @param edmType - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    parentTypeName: string,
    edmType: EdmTypeShared<ODataVersionOf<EntityT>>
  );

  /*
   * Union of the two possible constructors.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT, ComplexT>,
    arg3: string | EdmTypeShared<ODataVersionOf<EntityT>>,
    arg4:
      | EdmTypeShared<ODataVersionOf<EntityT>>
      | NullableT = false as NullableT
  ) {
    super(
      fieldName,
      getEntityConstructor(fieldOf),
      getEdmType(arg3, arg4),
      getIsNullable(arg4)
    );
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
