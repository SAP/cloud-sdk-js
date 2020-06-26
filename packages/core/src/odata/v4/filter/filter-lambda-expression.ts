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
import { OneToManyLink } from '../../common/selectable/one-to-many-link';

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
      | Filterable<EntityT> | FilterLambdaExpression<EntityT, FieldType>
    )[],
    public lambdaOperator: FilterLambdaOperator
  ) {}
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
export function any<FieldT extends FieldType, EntityT extends EntityBase>(
  ...filters: (Filterable<EntityT> | OneToManyLink<EntityT>)[]
): FilterLambdaExpression<EntityT, FieldType> {
  return new FilterLambdaExpression(toFilterable(filters), 'any');
}

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function all<FieldT extends FieldType, EntityT extends EntityBase>(
  ...filters: (Filterable<EntityT> | OneToManyLink<EntityT>)[]
): FilterLambdaExpression<EntityT, FieldType> {
  return new FilterLambdaExpression(toFilterable(filters), 'all');
}

function toFilterable<FieldT extends FieldType, EntityT extends EntityBase>(filters: (
  | Filterable<EntityT>
  | OneToManyLink<EntityT>
  )[]): Filterable<EntityT>[]{
  return filters.map(f => {
    if(f instanceof OneToManyLink){
      return f._filters;
    }
    return f;
  });
}
