import { EntityBase } from '../entity-base';
import { EdmTypeShared } from '../edm-types';
import { Filter } from '../filter/filter';
import { DeSerializers } from '../de-serializers/de-serializers';
import { EdmTypeField, FieldTypeByEdmType } from './edm-type-field';

/**
 * {@link EdmTypeField}, that represents a property with an EDM type, that can be compared with `greaterThan`, `greaterOrEqual`, `lessThan` and `lessOrEqual`.
 * @typeParam EntityT - Type of the entity the field belongs to.
 * @typeParam EdmT - EDM type of the field.
 * @typeParam NullableT - Boolean type that represents whether the field is nullable.
 * @typeParam SelectableT - Boolean type that represents whether the field is selectable.
 */
export class OrderableEdmTypeField<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends EdmTypeField<EntityT, DeSerializersT, EdmT, NullableT, SelectableT> {
  /**
   * Creates an instance of Filter for this field and the given value using the operator 'gt', i.e. `>`.
   * @param value - Value to be used in the filter.
   * @returns The resulting filter.
   */
  greaterThan(
    value: FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  ): Filter<
    EntityT,
    DeSerializersT,
    FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  > {
    return new Filter(this.fieldPath(), 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ge', i.e. `>=`.
   * @param value - Value to be used in the filter.
   * @returns The resulting filter.
   */
  greaterOrEqual(
    value: FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  ): Filter<
    EntityT,
    DeSerializersT,
    FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  > {
    return new Filter(this.fieldPath(), 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'lt', i.e. `<`.
   * @param value - Value to be used in the filter.
   * @returns The resulting filter.
   */
  lessThan(
    value: FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  ): Filter<
    EntityT,
    DeSerializersT,
    FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  > {
    return new Filter(this.fieldPath(), 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'le', i.e. `<=`.
   * @param value - Value to be used in the filter.
   * @returns The resulting filter.
   */
  lessOrEqual(
    value: FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  ): Filter<
    EntityT,
    DeSerializersT,
    FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  > {
    return new Filter(this.fieldPath(), 'le', value, this.edmType);
  }
}
