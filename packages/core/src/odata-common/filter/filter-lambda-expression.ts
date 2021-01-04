import { FieldType } from '../selectable';
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
export class FilterLambdaExpression<
  EntityT extends Entity,
  FieldT extends FieldType
> {
  constructor(
    public filters: FilterList<EntityT>,
    public lambdaOperator: FilterLambdaOperator
  ) {}
}

/**
 * hidden
 */
export function isFilterLambdaExpression<
  EntityT extends Entity,
  FieldT extends FieldType
>(
  filterable: Filterable<EntityT>
): filterable is FilterLambdaExpression<EntityT, FieldT> {
  return 'lambdaOperator' in filterable;
}
