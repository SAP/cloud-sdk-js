import { DeSerializers } from '../de-serializers';
import { EdmTypeShared } from '../edm-types';
import { EntityBase, EntityIdentifiable, ODataVersionOf } from '../entity-base';
import type { FilterFunction } from './filter-function-base';
import type { Filterable } from './filterable';

type FilterOperatorString = 'eq' | 'ne';
type FilterOperatorBoolean = 'eq' | 'ne';
type FilterOperatorNumber = 'eq' | 'ne' | 'lt' | 'le' | 'gt' | 'ge';
/**
 * @internal
 */
export type FilterOperator =
  | FilterOperatorString
  | FilterOperatorBoolean
  | FilterOperatorNumber;
/**
 * @internal
 */
export type FilterOperatorByType<FieldT> = FieldT extends string
  ? FilterOperatorString
  : FieldT extends number
  ? FilterOperatorNumber
  : FilterOperatorBoolean;

/**
 * Represents a filter expression to narrow the data on a [[GetAllRequestBuilder]] request for multiple entities that match the specified criteria.
 * A filter refers to the field of an entity and restricts the request based on an operator and a value. `Entity.FIELD_NAME.operator(value)`
 *
 * @example `Product.NAME.equals('cloud-sdk')` creates a filter for the entity `Product` that matches in case the field `NAME` equals 'cloud-sdk'.
 *
 * See also: [[Filterable]].
 * @typeparam EntityT - Type of the entity to be filtered on.
 * @typeparam FieldT - Type of the field to be filtered by, see also: [[FieldType]].
 * @internal
 */
export class Filter<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  FieldT
> implements EntityIdentifiable<EntityT, DeSerializersT>
{
  /**
   * Entity type of the entity tp be filtered.
   */
  readonly _entity: EntityT;

  readonly _deSerializers: DeSerializersT;

  /**
   * Creates an instance of Filter.
   * @param field - Name of the field of the entity to be filtered on or a filter function.
   * @param operator - Function to be used for matching.
   * @param value - Value to be used by the operator.
   * @param edmType - EDM type of the field to filter on, needed for custom fields.
   */
  constructor(
    public field: string | FilterFunction<EntityT, FieldT>,
    public operator: FilterOperator,
    public value: FieldT,
    public edmType?: EdmTypeShared<ODataVersionOf<EntityT>>
  ) {}
}

/**
 * Type guard for the `Filter` class.
 * @param filterable - Object to be checked.
 * @returns Whether the given object is of type `Filter`.
 * @internal
 */
export function isFilter<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  FieldT
>(
  filterable: Filterable<EntityT, DeSerializersT>
): filterable is Filter<EntityT, DeSerializersT, FieldT> {
  return (
    typeof filterable['field'] !== 'undefined' &&
    typeof filterable['operator'] !== 'undefined' &&
    typeof filterable['value'] !== 'undefined'
  );
}
