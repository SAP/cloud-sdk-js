/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { FieldType } from '../../common/selectable';
import { and, Filterable, FilterList } from '../../common/filter';
import { EntityBase } from '../../common';
import { OneToManyLink } from '../../common/selectable/one-to-many-link';
import { FilterLambdaExpression } from '../../common/filter/filter-lambda-expression';
// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function any<
  EntityT extends EntityBase,
  FieldT extends FieldType,
  LinkedEntityT extends EntityBase
>(
  ...filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): FilterLambdaExpression<EntityT, FieldType> {
  return new FilterLambdaExpression(toFilterList(filters), 'any');
}

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function all<
  EntityT extends EntityBase,
  FieldT extends FieldType,
  LinkedEntityT extends EntityBase
>(
  ...filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): FilterLambdaExpression<EntityT, FieldType> {
  return new FilterLambdaExpression(toFilterList(filters), 'all');
}

function toFilterList<
  EntityT extends EntityBase,
  FieldT extends FieldType,
  LinkedEntityT extends EntityBase
>(
  filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): FilterList<EntityT> {
  return and(
    ...filters.map(f => (f instanceof OneToManyLink ? f._filters : f))
  );
}
