import { EdmTypeShared } from '../edm-types';
import {
  Constructable,
  Entity,
  EntityIdentifiable,
  ODataVersionOf
} from '../entity';
import type { FilterFunction } from './filter-function-base';
import type { Filterable } from './filterable';
import {FieldType} from "../selectable/field";

type FilterOperatorString = 'eq' | 'ne';
type FilterOperatorBoolean = 'eq' | 'ne';
type FilterOperatorNumber = 'eq' | 'ne' | 'lt' | 'le' | 'gt' | 'ge';
export type FilterOperator =
  | FilterOperatorString
  | FilterOperatorBoolean
  | FilterOperatorNumber;

export type FilterOperatorByType<FieldT extends FieldType> =
  FieldT extends string
    ? FilterOperatorString
    : FieldT extends number
    ? FilterOperatorNumber
    : FilterOperatorBoolean;

/**
 * Represents a filter expression to narrow the data on a [[GetAllRequestBuilder]] request for multiple entities that match the specified criteria.
 * A filter refers to the field of an entity and restricts the request based on an operator and a value. `Entity.FIELD_NAME.operator(value)`
 *
 * Example: `Product.NAME.equals('cloud-sdk')` creates a filter for the entity `Product` that matches in case the field `NAME` equals 'cloud-sdk'.
 *
 * See also: [[Filterable]]
 * @typeparam EntityT - Type of the entity to be filtered on
 * @typeparam FieldT - Type of the field to be filtered by, see also: [[FieldType]]
 */
// TODO 2.0 rename to BinaryFilter
export class Filter<
  EntityT extends Entity,
  FieldT extends FieldType | FieldType[]
> implements EntityIdentifiable<EntityT>
{
  /**
   * Constructor type of the entity to be filtered.
   */
  readonly _entityConstructor: Constructable<EntityT>;
  /**
   * Entity type of the entity tp be filtered.
   */
  readonly _entity: EntityT;

  /**
   * @deprecated Since v1.16.0. Use [[field]] instead.
   */
  public _fieldName: string | FilterFunction<EntityT, FieldT>;

  // TODO: change the constructor to the following:
  // Constructor(public field: string | Field<EntityT>, public operator: FilterOperator, public value: FieldT) {}
  // And deprecate passing a string as the field is needed later on
  /**
   * Creates an instance of Filter.
   * @param field - Name of the field of the entity to be filtered on or a filter function
   * @param operator - Function to be used for matching
   * @param value - Value to be used by the operator
   * @param edmType - EDM type of the field to filter on, needed for custom fields
   */

  constructor(
    public field: string | FilterFunction<EntityT, FieldT>,
    public operator: FilterOperator,
    public value: FieldT,
    public edmType?: EdmTypeShared<ODataVersionOf<EntityT>>
  ) {
    this._fieldName = field;
  }
}

export function isFilter<T extends Entity, FieldT extends FieldType>(
  filterable: Filterable<T>
): filterable is Filter<T, FieldT> {
  return (
    typeof filterable['field'] !== 'undefined' &&
    typeof filterable['operator'] !== 'undefined' &&
    typeof filterable['value'] !== 'undefined'
  );
}
