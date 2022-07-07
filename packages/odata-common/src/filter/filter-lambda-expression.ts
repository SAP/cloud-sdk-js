import { DeSerializers } from '../de-serializers';
import { EntityBase } from '../entity-base';
import { FilterList } from './filter-list';
import type { Filterable } from './filterable';

/**
 * Possible operators used to filter one to many relations in OData v4.
 * Values are `any` or `all`.
 */
export type FilterLambdaOperator = 'any' | 'all';

/**
 * Class representing a filter expression based on a {@link FilterLambdaOperator}.
 */
export class FilterLambdaExpression<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> {
  constructor(
    public filters: FilterList<EntityT, DeSerializersT>,
    public lambdaOperator: FilterLambdaOperator
  ) {}
}

/**
 * @internal
 */
export function isFilterLambdaExpression<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  filterable: Filterable<EntityT, DeSerializersT>
): filterable is FilterLambdaExpression<EntityT, DeSerializersT> {
  return 'lambdaOperator' in filterable;
}
