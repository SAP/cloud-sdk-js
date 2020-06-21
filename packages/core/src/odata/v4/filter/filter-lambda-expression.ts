/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { FieldType } from '../../common/selectable';
import {
  Filter,
  Filterable,
  FilterLink,
  FilterList,
  isFilter
} from '../../common/filter';
import { EntityBase } from '../../common';

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

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function any<FieldT extends FieldType, LinkedEntityT extends EntityBase>(
  ...filters: (
    | Filter<LinkedEntityT, FieldT>
    | FilterLink<LinkedEntityT>
    | FilterList<LinkedEntityT>
  )[]
): FilterLambdaExpression<LinkedEntityT, FieldType> {
  return new FilterLambdaExpression(filters, 'any');
}

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function all<FieldT extends FieldType, LinkedEntityT extends EntityBase>(
  ...filters: (
    | Filter<LinkedEntityT, FieldT>
    | FilterLink<LinkedEntityT>
    | FilterList<LinkedEntityT>
  )[]
): FilterLambdaExpression<LinkedEntityT, FieldType> {
  return new FilterLambdaExpression(filters, 'all');
}
