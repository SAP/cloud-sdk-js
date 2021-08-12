/* eslint-disable max-classes-per-file */

import { BigNumber } from 'bignumber.js';
import { EdmTypeShared } from '../../edm-types';
import { Entity, ODataVersionOf, Constructable } from '../../entity';
import { Filter } from '../../filter';
import {
  ComplexTypeField,
  getEdmType,
  getEntityConstructor
} from '../complex-type-field';
import { ConstructorOrField } from '../constructor-or-field';
import { EdmTypeField } from '../edm-type-field';

/**
 * @deprecated Since v1.47.0. Use [[OrderableEdmTypeField]] instead.
 * Represents a property with a big number value.
 * @typeparam EntityT - Type of the entity the field belongs to
 */
class BigNumberFieldBase<
  EntityT extends Entity,
  SelectableT extends boolean = false
> extends EdmTypeField<EntityT, BigNumber, false, SelectableT> {
  /**
   * Creates an instance of Filter for this field and the given value using the operator 'gt', i.e. `>`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  greaterThan(value: BigNumber): Filter<EntityT, BigNumber> {
    return new Filter(this.fieldPath(), 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ge', i.e. `>=`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  greaterOrEqual(value: BigNumber): Filter<EntityT, BigNumber> {
    return new Filter(this.fieldPath(), 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'lt', i.e. `<`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  lessThan(value: BigNumber): Filter<EntityT, BigNumber> {
    return new Filter(this.fieldPath(), 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'le', i.e. `<=`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  lessOrEqual(value: BigNumber): Filter<EntityT, BigNumber> {
    return new Filter(this.fieldPath(), 'le', value, this.edmType);
  }
}

/**
 * @deprecated Since v1.47.0. Use [[OrderableEdmTypeField]] instead.
 * Represents a selectable property with a big number value.
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class BigNumberField<EntityT extends Entity> extends BigNumberFieldBase<
  EntityT,
  true
> {}

/**
 * @deprecated Since v1.47.0. Use [[OrderableEdmTypeField]] instead.
 * Represents a complex type property with a big number value.
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class ComplexTypeBigNumberPropertyField<
  EntityT extends Entity,
  ComplexT = any
> extends BigNumberFieldBase<EntityT> {
  /**
   * The constructor of the entity or the complex type this field belongs to
   */
  readonly fieldOf: ConstructorOrField<EntityT, ComplexT>;

  /**
   * Creates an instance of ComplexTypeBigNumberPropertyField.
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
   * Creates an instance of ComplexTypeBigNumberPropertyField.
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
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this.fieldOf instanceof ComplexTypeField
      ? `${this.fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}
