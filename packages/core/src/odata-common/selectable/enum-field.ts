import { Entity } from '../entity';
import { EnumUnderlyingType } from '../edm-types';
import { Filter } from '../filter';
import { Field, FieldOptions } from './field';
import { ConstructorOrField } from './constructor-or-field';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';

/**
 * Represents a field of an enum type.
 * @typeparam EntityT - Type of the entity the field belongs to.
 * @typeparam EnumT - Type of the enum filed.
 * @typeparam EnumUnderlyingT - The underlying type of the enum field according to the metadata description.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 * @typeparam SelectableT - Boolean type that represents whether the field is selectable.
 */
export class EnumField<
  EntityT extends Entity,
  EnumT extends Enum<EnumT>,
  EnumUnderlyingT extends EnumUnderlyingType,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends Field<EntityT, NullableT, SelectableT> {
  /**
   *
   * Creates an instance of EnumField.
   *
   * @param fieldName - Actual name of the field used in the OData request.
   * @param _fieldOf - The constructor of the entity or the complex type field this field belongs to.
   * @param enumType - The enum type of the enum type filed e.g., `TestEnumType`.
   * @param underlyingType - The underlying type of the enum field according to the metadata description.
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    readonly _fieldOf: ConstructorOrField<EntityT>,
    readonly enumType: EnumT,
    readonly underlyingType: EnumUnderlyingT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>) {
    super(fieldName, getEntityConstructor(_fieldOf), fieldOptions);
  }

  /**
   * Gets the path to the complex type property represented by this.
   * @returns The path to the complex type property.
   */
  fieldPath(): string {
    return this._fieldOf instanceof ComplexTypeField
      ? `${this._fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'eq', i.e. `==`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  equals(
    value: EnumUnderlyingT extends 'Edm.Int64'? string: number
  ): Filter<EntityT, EnumUnderlyingT extends 'Edm.Int64'? string: number> {
    return new Filter(this.fieldPath(), 'eq', value, undefined, this.enumType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  notEquals(
    value: EnumUnderlyingT extends 'Edm.Int64'? string: number
  ): Filter<EntityT, EnumUnderlyingT extends 'Edm.Int64'? string: number> {
    return new Filter(this.fieldPath(), 'ne', value, undefined, this.enumType);
  }
}

export type Enum<E> = Record<keyof E, number | string>;

export function isEnum(
  val: any
): val is Enum<any> {
  return typeof val === 'object' && Object.values(val).every(value => typeof value === 'number' || typeof value === 'string');
}
