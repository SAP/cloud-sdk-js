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

/**
 * Optional settings for fields.
 */
export interface FieldOptions<
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> {
  /**
   * Whether the value of the field can be null.
   */
  isNullable?: NullableT;
  /**
   * Whether the field can be reference in a `.select` statement.
   */
  isSelectable?: SelectableT;
}

/**
 * Get field options merged with default values.
 * The given options take precedence.
 * @param fieldOptions Given options.
 * @returns Given options merged with default values.
 */
export function getFieldOptions<
  NullableT extends boolean = false,
  SelectableT extends boolean = false
>(
  fieldOptions?: FieldOptions<NullableT, SelectableT>
): Required<FieldOptions<NullableT, SelectableT>> {
  return { ...defaultFieldOptions, ...fieldOptions } as Required<
    FieldOptions<NullableT, SelectableT>
  >;
}

const defaultFieldOptions: Required<FieldOptions> = {
  isNullable: false,
  isSelectable: false
};

/**
 * Abstract representation a property of an OData entity.
 *
 * `Field`s are used as static properties of entities or properties of [[ComplexTypeField]]s and are generated from the metadata, i.e. for each property of
 * an OData entity, there exists one static instance of `Field` (or rather one of its subclasses) in the corresponding generated class file.
 * Fields are used to represent the domain of values that can be used in select, filter and order by functions.
 *
 * See also: [[Selectable]], [[EdmTypeField]], [[ComplexTypeField]]
 *
 * @typeparam EntityT - Type of the entity the field belongs to.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 * @typeparam SelectableT - Boolean type that represents whether the field is selectable.
 */
export class Field<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> implements EntityIdentifiable<EntityT>
{
  readonly _entity: EntityT;
  readonly _fieldOptions: Required<FieldOptions<NullableT, SelectableT>>;
  /**
   * Creates an instance of Field.
   *
   * @param _fieldName - Actual name of the field used in the OData request
   * @param _entityConstructor - Constructor type of the entity the field belongs to
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    this._fieldOptions = getFieldOptions(fieldOptions);
  }

  /**
   * Path to the field to be used in filter and order by queries.
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this._fieldName;
  }
}
