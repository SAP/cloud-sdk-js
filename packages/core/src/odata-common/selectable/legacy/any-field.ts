/* eslint-disable max-classes-per-file */

import { EdmTypeShared } from '../../edm-types';
import { Entity, ODataVersionOf } from '../../entity';
import {
  ComplexTypeField,
  getEdmType,
  getEntityConstructor
} from '../complex-type-field';
import { ConstructorOrField } from '../constructor-or-field';
import { EdmTypeField } from '../edm-type-field';

/**
 * @deprecated Since v1.47.0. Use [[EdmTypeField]] instead.
 * Represents a property with an unknown or currently unsupported EDM type like Edm.Geography.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
class AnyFieldBase<
  EntityT extends Entity,
  SelectableT extends boolean = false
> extends EdmTypeField<EntityT, any, false, SelectableT> {}

/**
 * @deprecated Since v1.47.0. Use [[EdmTypeField]] instead.
 * Represents a selectable property with with an unknown or currently unsupported EDM type like Edm.Geography.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class AnyField<EntityT extends Entity> extends AnyFieldBase<
  EntityT,
  true
> {}

/**
 * @deprecated Since v1.47.0. Use [[EdmTypeField]] instead.
 * Represents a complex type property with with an unknown or currently unsupported EDM type like Edm.Geography.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class ComplexTypeAnyPropertyField<
  EntityT extends Entity,
  ComplexT = any
> extends AnyFieldBase<EntityT> {
  /**
   * The constructor of the entity or the complex type this field belongs to
   */
  readonly fieldOf: ConstructorOrField<EntityT, ComplexT>;

  /**
   * Creates an instance of ComplexTypeAnyPropertyField.
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
