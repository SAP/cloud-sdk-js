import BigNumber from 'bignumber.js';
import moment from 'moment';
import { EntityBase } from '../entity-base';
import { Time } from '../time';
import { Filter } from '../filter';
import { EdmTypeShared } from '../edm-types';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';
import { ConstructorOrField } from './constructor-or-field';
import { Field, FieldOptions } from './field';

/**
 * Convenience type that maps the given [[FieldType]] to a new type that is either nullable or not, depending on the given `NullableT`.
 * @typeparam FieldT - Field type of the field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 */
type NullableFieldType<
  FieldT,
  NullableT extends boolean
> = NullableT extends true ? FieldT | null : FieldT;

/**
 * Convenience type that maps the given EDM type to a [[FieldType]] without considering whether it is nullable.
 * @typeparam EdmT - EDM type of the field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 */
type NonNullableFieldTypeByEdmType<EdmT extends EdmTypeShared<'any'>> =
  EdmT extends 'Edm.String'
    ? string
    : EdmT extends 'Edm.Boolean'
    ? boolean
    : EdmT extends 'Edm.Decimal'
    ? BigNumber
    : EdmT extends 'Edm.Double'
    ? number
    : EdmT extends 'Edm.Single'
    ? number
    : EdmT extends 'Edm.Float'
    ? number
    : EdmT extends 'Edm.Int16'
    ? number
    : EdmT extends 'Edm.Int32'
    ? number
    : EdmT extends 'Edm.Int64'
    ? BigNumber
    : EdmT extends 'Edm.SByte'
    ? number
    : EdmT extends 'Edm.Binary'
    ? string
    : EdmT extends 'Edm.Guid'
    ? string
    : EdmT extends 'Edm.Byte'
    ? number
    : EdmT extends 'Edm.DateTime'
    ? moment.Moment
    : EdmT extends 'Edm.DateTimeOffset'
    ? moment.Moment
    : EdmT extends 'Edm.Time'
    ? Time
    : EdmT extends 'Edm.Date'
    ? moment.Moment
    : EdmT extends 'Edm.Duration'
    ? moment.Duration
    : EdmT extends 'Edm.TimeOfDay'
    ? Time
    : EdmT extends 'Edm.Enum'
    ? string
    : EdmT extends 'Edm.Any'
    ? any
    : never;

/**
 * Convenience type that maps the given EDM type to a [[FieldType]]. It also considers whether the field is nullable.
 * @typeparam EdmT - EDM type of the field. Deprecated: Field type of the field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 * @internal
 */
export type FieldTypeByEdmType<
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean
> = NullableFieldType<
  EdmT extends EdmTypeShared<'any'>
    ? NonNullableFieldTypeByEdmType<EdmT>
    : EdmT,
  NullableT
>;

/**
 * Represents a property of an OData entity with an EDM type.
 *
 * `EdmTypeField`s are used as static properties of entities or EDM typed fields of complex type fields. They are generated from the OData metadata, i.e. for each property of
 * an OData entity, that has an EDM type, there is one static instance of `EdmTypeField` (or rather one of its subclasses) in the corresponding generated class file.
 * `EdmTypeField`s are used to represent the domain of more or less primitive values that can be used in select, filter and order by functions.
 * For example, when constructing a query on the BusinessPartner entity, an instance of `EdmTypeField<BusinessPartner, string>`
 * can be supplied as argument to the select function, e.g. `BusinessPartner.FIRST_NAME`.
 *
 * See also: [[Selectable]]
 * @typeparam EntityT - Type of the entity the field belongs to
 * @typeparam EdmT - EDM type of the field. Deprecated: Field type of the field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 * @typeparam SelectableT - Boolean type that represents whether the field is selectable.
 * @internal
 */
export class EdmTypeField<
  EntityT extends EntityBase,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends Field<EntityT, NullableT, SelectableT> {
  /**
   * Creates an instance of EdmTypeField.
   * @param fieldName - Actual name of the field used in the OData request.
   * @param _fieldOf - Constructor type of the entity the field belongs to.
   * @param edmType - Type of the field according to the metadata description.
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    readonly _fieldOf: ConstructorOrField<EntityT>,
    readonly edmType: EdmT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, getEntityConstructor(_fieldOf), fieldOptions);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'eq', i.e. `==`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  equals(
    value: FieldTypeByEdmType<EdmT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmT, NullableT>> {
    return new Filter(this.fieldPath(), 'eq', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  notEquals(
    value: FieldTypeByEdmType<EdmT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmT, NullableT>> {
    return new Filter(this.fieldPath(), 'ne', value, this.edmType);
  }

  /**
   * Path to the field to be used in filter and order by queries.
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this._fieldOf instanceof ComplexTypeField
      ? `${this._fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}
