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
export class FilterLambdaExpression<EntityT extends EntityBase> {
  constructor(
    public filters: FilterList<EntityT>,
    public lambdaOperator: FilterLambdaOperator
  ) {}
}

/**
 * @internal
 */
export function isFilterLambdaExpression<EntityT extends EntityBase>(
  filterable: Filterable<EntityT>
): filterable is FilterLambdaExpression<EntityT> {
  return 'lambdaOperator' in filterable;
}
