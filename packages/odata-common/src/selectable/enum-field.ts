import { EntityBase } from '../entity-base';
import { Filter } from '../filter';
import { EdmTypeShared } from '../edm-types';
import { DeSerializers } from '../de-serializers';
import { Field, FieldOptions } from './field';
import { ConstructorOrField } from './constructor-or-field';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';

/**
 * Represents a property with an enum value.
 * @typeParam EntityT - Type of the entity the field belongs to.
 * @typeParam EnumT - Enum type that contains all valid enum entries for this field.
 * @typeParam NullableT - Boolean type that represents whether the field is nullable.
 * @typeParam SelectableT - Boolean type that represents whether the field is selectable.
 */
export class EnumField<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  EnumT extends string = string,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends Field<EntityT, NullableT, SelectableT> {
  readonly edmType: EdmTypeShared<any> = 'Edm.Enum';

  /**
   * Creates an instance of EnumField.
   * @param fieldName - Actual name of the field used in the OData request.
   * @param _fieldOf - The constructor of the entity or the complex type field this field belongs to.
   * @param enumType - Enum type of the field according to the metadata description.
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    readonly _fieldOf: ConstructorOrField<EntityT>,
    readonly enumType?: Record<string, EnumT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
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
   * @param value - Value to be used in the filter.
   * @returns The resulting filter.
   */
  equals(value: EnumType<EnumT>): Filter<EntityT, DeSerializersT, string> {
    return new Filter(this.fieldPath(), 'eq', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   * @param value - Value to be used in the filter.
   * @returns The resulting filter.
   */
  notEquals(value: EnumType<EnumT>): Filter<EntityT, DeSerializersT, string> {
    return new Filter(this.fieldPath(), 'ne', value, this.edmType);
  }
}

/**
 * Convenient type to reflect all the values of a string based enum as a union type.
 * @typeParam T - String based enum type
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types
 * @internal
 */
export type EnumType<T extends string> = `${T}`;
