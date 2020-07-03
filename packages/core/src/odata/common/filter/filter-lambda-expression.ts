/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { FieldType } from '../selectable';
import { EntityBase } from '../entity';
import { FilterList } from './filter-list';
import type { Filterable } from './filterable';

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
    public filters: FilterList<EntityT>,
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
  return 'lambdaOperator' in filterable;
}
