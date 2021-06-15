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

export abstract class Field<EntityT extends Entity>
  implements EntityIdentifiable<EntityT>
{
  readonly _entity: EntityT;
  /**
   * Creates an instance of Field.
   *
   * @param _fieldName - Actual name of the field used in the OData request
   * @param _entityConstructor - Constructor type of the entity the field belongs to
   */
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>
  ) {}

  /**
   * Path to the field to be used in filter and order by queries. In most cases this will just be the [[_fieldName]] itself. However, for complex types for instance, the path is prefixed with the name of the complextype.
   *
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this._fieldName;
  }
}
