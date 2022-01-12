import { DeSerializers } from '../de-serializers';
import { EntityBase } from '../entity-base';
import { FilterList } from './filter-list';
import type { Filterable } from './filterable';

/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export type FilterLambdaOperator = 'any' | 'all';

/**
 * @internal
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
  filterable: Filterable<
    EntityT,
    DeSerializersT
    // EntityApi<EntityBase, DeSerializersT>
  >
): filterable is FilterLambdaExpression<EntityT, DeSerializersT> {
  return 'lambdaOperator' in filterable;
}
