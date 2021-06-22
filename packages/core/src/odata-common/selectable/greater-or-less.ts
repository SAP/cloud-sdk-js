import { Filter } from '../filter';
import { Entity } from '../entity';
import { EdmTypeField } from './edm-type-field';
import { FieldType } from './field';

/**
 * [[EdmTypeField]] including operations for comparison, i.e. `greaterThan`, `greaterOrEqual`, `lessThan`, `lessOrEqual`.
 * @typeparam EntityT - Type of the entity the field belongs to.
 * @typeparam FieldT - Type of the field.
 */
export class GreaterOrLessEdmTypeField<
  EntityT extends Entity,
  FieldT extends FieldType
> extends EdmTypeField<EntityT, FieldT> {
  /**
   * Creates an instance of Filter for this field and the given value using the operator 'gt', i.e. `>`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  greaterThan(value: FieldT): Filter<EntityT, FieldT> {
    return new Filter(this.fieldPath(), 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ge', i.e. `>=`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  greaterOrEqual(value: FieldT): Filter<EntityT, FieldT> {
    return new Filter(this.fieldPath(), 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'lt', i.e. `<`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  lessThan(value: FieldT): Filter<EntityT, FieldT> {
    return new Filter(this.fieldPath(), 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'le', i.e. `<=`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  lessOrEqual(value: FieldT): Filter<EntityT, FieldT> {
    return new Filter(this.fieldPath(), 'le', value, this.edmType);
  }
}
