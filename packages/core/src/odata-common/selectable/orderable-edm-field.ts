import { Filter } from '../filter';
import { Entity } from '../entity';
import { EdmTypeShared } from '../edm-types';
import { EdmField, FieldTypeByEdmType } from './edm-field';

export class OrderableEdmField<
  EntityT extends Entity,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean = false
> extends EdmField<EntityT, EdmT, NullableT> {
  /**
   * Creates an instance of Filter for this field and the given value using the operator 'gt', i.e. `>`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  greaterThan(
    value: FieldTypeByEdmType<EdmT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmT, NullableT>> {
    return new Filter(this.fieldPath(), 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ge', i.e. `>=`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  greaterOrEqual(
    value: FieldTypeByEdmType<EdmT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmT, NullableT>> {
    return new Filter(this.fieldPath(), 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'lt', i.e. `<`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  lessThan(
    value: FieldTypeByEdmType<EdmT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmT, NullableT>> {
    return new Filter(this.fieldPath(), 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'le', i.e. `<=`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  lessOrEqual(
    value: FieldTypeByEdmType<EdmT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmT, NullableT>> {
    return new Filter(this.fieldPath(), 'le', value, this.edmType);
  }
}
