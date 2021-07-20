import { Field, FieldOptions } from './field';
import { Entity } from '../entity';
import { EnumUnderlyingType } from '../edm-types';
import { ComplexTypeNamespace } from './complex-type-namespace';
import { ConstructorOrField } from './constructor-or-field';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';
import { Filter } from '../filter';
import { FieldTypeByEdmType } from './edm-type-field';

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
   * @param _fieldType - Edm type of the field according to the metadata description.
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
  equals<T extends EnumUnderlyingType>(
    value: EnumUnderlyingT extends 'Edm.Int64'? string: number
  ): Filter<EntityT, EnumUnderlyingT extends 'Edm.Int64'? string: number> {
    return new Filter(this.fieldPath(), 'eq', value, undefined, this.enumType, this.underlyingType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  notEquals(
    value: EnumUnderlyingT extends 'Edm.Int64'? string: number
  ): Filter<EntityT, EnumUnderlyingT extends 'Edm.Int64'? string: number> {
    return new Filter(this.fieldPath(), 'ne', value, undefined, this.enumType, this.underlyingType);
  }
}


/**
 * Convenience type to reflect the type of the instances of an enum field.
 * The actual type of the elements for complex type enum is [[ComplexTypeNamespace]].
 * @typeparam EnumFieldT - Type of of elements of the enum. This can either be an enum type or complex type.
 */
// export type EnumFieldType<
//   EnumFieldT extends EnumUnderlyingType
//   > = EnumFieldT | ComplexTypeNamespace<EnumFieldT>;

export type Enum<E> = Record<keyof E, number | string>;

export function isEnum(
  val: any
): val is Enum<any> {
  return typeof val === 'object' && Object.values(val).every(value => typeof value === 'number' || typeof value === 'string')
}
