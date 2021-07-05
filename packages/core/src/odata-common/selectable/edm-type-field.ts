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
  | 'Edm.Boolean'
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

export type FieldTypeByEdmType<
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean
> = EdmT extends 'Edm.String'
  ? NullableFieldType<string, NullableT>
  : EdmT extends 'Edm.Boolean'
  ? NullableFieldType<boolean, NullableT>
  : EdmT extends 'Edm.Decimal'
  ? NullableFieldType<BigNumber, NullableT>
  : EdmT extends 'Edm.Double'
  ? NullableFieldType<number, NullableT>
  : EdmT extends 'Edm.Single'
  ? NullableFieldType<number, NullableT>
  : EdmT extends 'Edm.Float'
  ? NullableFieldType<number, NullableT>
  : EdmT extends 'Edm.Int16'
  ? NullableFieldType<number, NullableT>
  : EdmT extends 'Edm.Int32'
  ? NullableFieldType<number, NullableT>
  : EdmT extends 'Edm.Int64'
  ? NullableFieldType<BigNumber, NullableT>
  : EdmT extends 'Edm.SByte'
  ? NullableFieldType<number, NullableT>
  : EdmT extends 'Edm.Binary'
  ? NullableFieldType<string, NullableT>
  : EdmT extends 'Edm.Guid'
  ? NullableFieldType<string, NullableT>
  : EdmT extends 'Edm.Byte'
  ? NullableFieldType<number, NullableT>
  : EdmT extends 'Edm.DateTime'
  ? NullableFieldType<moment.Moment, NullableT>
  : EdmT extends 'Edm.Time'
  ? NullableFieldType<Time, NullableT>
  : EdmT extends 'Edm.Date'
  ? NullableFieldType<moment.Moment, NullableT>
  : EdmT extends 'Edm.Duration'
  ? NullableFieldType<moment.Duration, NullableT>
  : EdmT extends 'Edm.TimeOfDay'
  ? NullableFieldType<Time, NullableT>
  : EdmT extends 'Edm.Enum'
  ? NullableFieldType<string, NullableT>
  : EdmT extends 'Edm.Any'
  ? NullableFieldType<any, NullableT>
  : never;

/**
 * Represents a property of an OData entity with an Edm type.
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
 * @typeparam FieldT - Type of the field
 */
export class EdmTypeField<
  EntityT extends Entity,
  EdmT extends EdmTypeShared<'any'>,
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
    readonly edmType: EdmT,
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
    value: FieldTypeByEdmType<EdmT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmT, NullableT>> {
    return new Filter(this.fieldPath(), 'eq', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  notEquals(
    value: FieldTypeByEdmType<EdmT, NullableT>
  ): Filter<EntityT, FieldTypeByEdmType<EdmT, NullableT>> {
    return new Filter(this.fieldPath(), 'ne', value, this.edmType);
  }
}

/**
 * Interface denoting a selectable [[EdmTypeField]].
 */
export interface SelectableEdmTypeField {
  /**
   * This property denotes that this is a selectable edm type field.
   */
  selectable: true;
}
