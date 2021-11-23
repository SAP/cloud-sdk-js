/* eslint-disable max-classes-per-file */
import { DeSerializationMiddlewareBASE } from '../de-serializers/de-serialization-middleware';
import { Constructable, EntityBase } from '../entity-base';
import { NewFilterFunction } from './filter-function-base-new';

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
 * Example: `Product.NAME.equals('cloud-sdk')` creates a filter for the entity `Product` that matches in case the field `NAME` equals 'cloud-sdk'.
 *
 * See also: [[Filterable]]
 * @typeparam EntityT - Type of the entity to be filtered on
 * @typeparam FieldT - Type of the field to be filtered by, see also: [[FieldType]]
 */
// TODO 2.0 rename to BinaryFilter
export class NewFilter<
  EntityT extends EntityBase,
  T extends DeSerializationMiddlewareBASE,
  FieldT
> {
  entityConstructor: Constructable<EntityT>;
  constructor(
    public deSerializers: T,
    public field: string | NewFilterFunction<EntityT, FieldT>,
    public operator: FilterOperator,
    public value: FieldT
  ) {}
}
