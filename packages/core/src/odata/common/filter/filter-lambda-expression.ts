/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { EntityBase } from '../entity';
import { FieldType } from '../selectable';
import { Filter, isFilter } from './filter';
import { Filterable } from './filterable';
import { FilterLink } from './filter-link';
import { FilterList } from './filter-list';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export type FilterLambdaOperator = 'any' | 'all';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export class FilterLambdaExpression<
  EntityT extends EntityBase,
  FieldT extends FieldType
> {
  constructor(
    public filters: (
      | Filter<EntityT, FieldT>
      | FilterLink<EntityT>
      | FilterList<EntityT>
    )[],
    public lambdaOperator: FilterLambdaOperator
  ) {}

  validate() {
    this.filters.forEach(f => {
      if (isFilter(f) && typeof f.field !== 'string') {
        throw new Error(
          `The type of the field: ${
            f.field
          } is not string, but ${typeof f.field}.`
        );
      }
    });
  }
}

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function isFilterLambdaExpression<
  EntityT extends EntityBase,
  FieldT extends FieldType
>(
  filterable: Filterable<EntityT>
): filterable is FilterLambdaExpression<EntityT, FieldT> {
  return 'filters' in filterable && 'lambdaOperator' in filterable;
}
