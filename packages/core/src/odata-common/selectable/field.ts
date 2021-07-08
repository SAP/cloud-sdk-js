import BigNumber from 'bignumber.js';
import moment from 'moment';
import { Entity, EntityIdentifiable, Constructable } from '../entity';
import { Time } from '../time';

/**
 * Union type to represent all possible types of a field.
 */
export type FieldType =
  | string
  | number
  | boolean
  | Time
  | moment.Moment
  | moment.Duration
  | BigNumber
  | null
  | undefined;

/**
 * @deprecated Since v1.18.0. Use [[FieldType]] instead.
 * Represents types of nested fields.
 */
export type DeepFieldType = FieldType | { [keys: string]: DeepFieldType };

export interface FieldOptions<
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> {
  isNullable: NullableT;
  isSelectable: SelectableT;
}

export function getFieldOptions<
  T1 extends boolean = false,
  T2 extends boolean = false
>(fieldOptions?: Partial<FieldOptions<T1, T2>>): FieldOptions<T1, T2> {
  return { ...defaultFieldOptions, ...fieldOptions } as FieldOptions<T1, T2>;
}

const defaultFieldOptions: FieldOptions = {
  isNullable: false,
  isSelectable: false
};

export type FO<T extends FieldOptions<boolean, boolean>> =
  T extends FieldOptions<infer T1, infer T2> ? FieldOptions<T1, T2> : never;

/**
 * Abstract representation a property of an OData entity.
 *
 * `Field`s are used as static properties of entities or properties of [[ComplexTypeField]]s and are generated from the metadata, i.e. for each property of
 * an OData entity, there exists one static instance of `Field` (or rather one of its subclasses) in the corresponding generated class file.
 * Fields are used to represent the domain of values that can be used in select, filter and order by functions.
 *
 * See also: [[Selectable]], [[EdmTypeField]], [[ComplexTypeField]]
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */

export class Field<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> implements EntityIdentifiable<EntityT>
{
  readonly _entity: EntityT;
  /**
   * Creates an instance of Field.
   *
   * @param _fieldName - Actual name of the field used in the OData request
   * @param _isNullable - Whether the field can have the value `null`.
   * @param _entityConstructor - Constructor type of the entity the field belongs to
   */
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _fieldOptions?: Partial<FieldOptions<NullableT, SelectableT>>
  ) {
    this._fieldOptions = getFieldOptions(_fieldOptions);
  }

  /**
   * Path to the field to be used in filter and order by queries. In most cases this will just be the [[_fieldName]] itself. However, for complex types for instance, the path is prefixed with the name of the complextype.
   *
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this._fieldName;
  }
}
