import { Entity } from '../entity';
import { FilterList } from './filter-list';
import type { Filterable } from './filterable';

/* eslint-disable valid-jsdoc */

/**
 * hidden
 */
export type FilterLambdaOperator = 'any' | 'all';

/**
 * hidden
 */
export class FilterLambdaExpression<EntityT extends Entity> {
  constructor(
    public filters: FilterList<EntityT>,
    public lambdaOperator: FilterLambdaOperator
  ) {}
}

/**
 * hidden
 */
export function isFilterLambdaExpression<EntityT extends Entity>(
  filterable: Filterable<EntityT>
): filterable is FilterLambdaExpression<EntityT> {
  return 'lambdaOperator' in filterable;
}
