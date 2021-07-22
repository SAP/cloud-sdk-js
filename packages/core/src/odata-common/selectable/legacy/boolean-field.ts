/* eslint-disable max-classes-per-file */

import { EdmTypeShared } from '../../edm-types';
import { Entity, ODataVersionOf, Constructable } from '../../entity';
import {
  ComplexTypeField,
  getEdmType,
  getEntityConstructor
} from '../complex-type-field';
import { ConstructorOrField } from '../constructor-or-field';
import { EdmTypeField } from '../edm-type-field';

/**
 * @deprecated Since v1.47.0. Use [[EdmTypeField]] instead.
 * Represents a property with a boolean value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class BooleanFieldBase<
  EntityT extends Entity,
  SelectableT extends boolean = false
> extends EdmTypeField<EntityT, boolean, false, SelectableT> {}

/**
 * @deprecated Since v1.47.0. Use [[EdmTypeField]] instead.
 * Represents a selectable property with a boolean value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class BooleanField<EntityT extends Entity> extends BooleanFieldBase<
  EntityT,
  true
> {}

/**
 * @deprecated Since v1.47.0. Use [[EdmTypeField]] instead.
 * Represents a complex type property with a boolean value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class ComplexTypeBooleanPropertyField<
  EntityT extends Entity,
  ComplexT = any
> extends BooleanFieldBase<EntityT> {
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
  );

  /**
   * @deprecated Since v1.19.0.
   *
   * Creates an instance of ComplexTypeBooleanPropertyField.
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
    arg4?: EdmTypeShared<ODataVersionOf<EntityT>>
  ) {
    super(fieldName, getEntityConstructor(fieldOf), getEdmType(arg3, arg4));
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
