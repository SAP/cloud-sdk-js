import BigNumber from 'bignumber.js';
import moment from 'moment';
import { EdmTypeShared } from '../edm-types';
import { Entity } from '../entity';
import { Filter } from '../filter';
import { Time } from '../time';
import { getEntityConstructor } from './complex-type-field';
import { ConstructorOrField } from './constructor-or-field';
import { Field, FieldType } from './field';

export type SortableEdmType =
  | 'Edm.Decimal'
  | 'Edm.Double'
  | 'Edm.Single'
  | 'Edm.Float'
  | 'Edm.Int16'
  | 'Edm.Int32'
  | 'Edm.Int64'
  | 'Edm.SByte'
  | 'Edm.Byte'
  | 'Edm.DateTime'
  | 'Edm.DateTimeOffset'
  | 'Edm.Time'
  | 'Edm.Date'
  | 'Edm.Duration'
  | 'Edm.TimeOfDay';

export function isSortableEdmType(edmType: EdmTypeShared<'any'>): boolean {
  return [
    'Edm.Boolean',
    'Edm.Decimal',
    'Edm.Double',
    'Edm.Single',
    'Edm.Float',
    'Edm.Int16',
    'Edm.Int32',
    'Edm.Int64',
    'Edm.SByte',
    'Edm.Byte',
    'Edm.DateTime',
    'Edm.Time',
    'Edm.Date',
    'Edm.Duration',
    'Edm.TimeOfDay'
  ].includes(edmType);
}

type NullableFieldType<
  FieldT extends FieldType,
  NullableT extends boolean
> = NullableT extends true ? FieldT | null : FieldT;

export type NonNullableFieldTypeByEdmType<
  EdmOrFieldT extends EdmTypeShared<'any'> | FieldType
> = EdmOrFieldT extends 'Edm.String'
  ? string
  : EdmOrFieldT extends 'Edm.Boolean'
  ? boolean
  : EdmOrFieldT extends 'Edm.Decimal'
  ? BigNumber
  : EdmOrFieldT extends 'Edm.Double'
  ? number
  : EdmOrFieldT extends 'Edm.Single'
  ? number
  : EdmOrFieldT extends 'Edm.Float'
  ? number
  : EdmOrFieldT extends 'Edm.Int16'
  ? number
  : EdmOrFieldT extends 'Edm.Int32'
  ? number
  : EdmOrFieldT extends 'Edm.Int64'
  ? BigNumber
  : EdmOrFieldT extends 'Edm.SByte'
  ? number
  : EdmOrFieldT extends 'Edm.Binary'
  ? string
  : EdmOrFieldT extends 'Edm.Guid'
  ? string
  : EdmOrFieldT extends 'Edm.Byte'
  ? number
  : EdmOrFieldT extends 'Edm.DateTime'
  ? moment.Moment
  : EdmOrFieldT extends 'Edm.Time'
  ? Time
  : EdmOrFieldT extends 'Edm.Date'
  ? moment.Moment
  : EdmOrFieldT extends 'Edm.Duration'
  ? moment.Duration
  : EdmOrFieldT extends 'Edm.TimeOfDay'
  ? Time
  : EdmOrFieldT extends 'Edm.Enum'
  ? string
  : EdmOrFieldT extends 'Edm.Any'
  ? any
  : EdmOrFieldT extends FieldType
  ? EdmOrFieldT
  : never;

export type FieldTypeByEdmType<
  EdmOrFieldT extends EdmTypeShared<'any'> | FieldType,
  NullableT extends boolean
> = NullableFieldType<
  EdmOrFieldT extends EdmTypeShared<'any'>
    ? NonNullableFieldTypeByEdmType<EdmOrFieldT>
    : EdmOrFieldT,
  NullableT
>;

/**
 * Convenience type to support old `EdmTypeField` with field type as generic parameter.
 * This will become obsolete in the next major version update.
 */
export type EdmTypeForEdmOrFieldType<
  EdmOrFieldT extends EdmTypeShared<'any'> | FieldType
> = EdmOrFieldT extends EdmTypeShared<'any'>
  ? EdmOrFieldT
  : EdmTypeShared<'any'>;

/**
 * Represents a property of an OData entity with an EDM type.
 *
 * `EdmTypeField`s are used as static properties of entities and are generated from the metadata, i.e. for each property of
 * an OData entity, that has an Edm type, there exists one static instance of `EdmTypeField` (or rather one of its subclasses) in the corresponding generated class file.
 * `EdmTypeField`s are used to represent the domain of more or less primitive values that can be used in select, filter and order by functions.
 * For example, when constructing a query on the BusinessPartner entity, an instance of `EdmTypeField<BusinessPartner, string>`
 * can be supplied as argument to the select function, e.g. `BusinessPartner.FIRST_NAME`.
 *
 * See also: [[Selectable]]
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 * @typeparam EdmOrFieldT - [[EDM type | EdmTypeShared]] of the field. Deprecated: Field type of the field.
 */
export class EdmTypeField<
  EntityT extends Entity,
  EdmOrFieldT extends EdmTypeShared<'any'> | FieldType,
  NullableT extends boolean = false
> extends Field<EntityT, NullableT> {
  /**
   * Creates an instance of EdmTypeField.
   *
   * @param fieldName - Actual name of the field used in the OData request.
   * @param _fieldOf - Constructor type of the entity the field belongs to.
   * @param edmType - Type of the field according to the metadata description.
   * @param isNullable - Whether the field can have the value `null`.
   */
  constructor(
    fieldName: string,
    readonly _fieldOf: ConstructorOrField<EntityT>,
    readonly edmType: EdmTypeForEdmOrFieldType<EdmOrFieldT>,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, getEntityConstructor(_fieldOf), isNullable);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'eq', i.e. `==`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  equals(
    value: FieldTypeByEdmType<EdmOrFieldT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmOrFieldT, NullableT>> {
    return new Filter(this.fieldPath(), 'eq', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  notEquals(
    value: FieldTypeByEdmType<EdmOrFieldT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmOrFieldT, NullableT>> {
    return new Filter(this.fieldPath(), 'ne', value, this.edmType);
  }
}
