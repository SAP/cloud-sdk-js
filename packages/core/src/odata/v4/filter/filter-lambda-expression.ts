/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { FieldType } from '../../common/selectable';
import { Filterable, FilterList } from '../../common/filter';
import { EntityBase } from '../../common';
import { OneToManyLink } from '../../common/selectable/one-to-many-link';
import { FilterLambdaExpression } from '../../common/filter/filter-lambda-expression';
// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function any<FieldT extends FieldType, EntityT extends EntityBase>(
  ...filters: (Filterable<EntityT> | OneToManyLink<EntityT>)[]
): FilterLambdaExpression<EntityT, FieldType> {
  return new FilterLambdaExpression(toFilterList(filters), 'any');
}

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function all<FieldT extends FieldType, EntityT extends EntityBase>(
  ...filters: (Filterable<EntityT> | OneToManyLink<EntityT>)[]
): FilterLambdaExpression<EntityT, FieldType> {
  return new FilterLambdaExpression(toFilterList(filters), 'all');
}

function toFilterList<FieldT extends FieldType, EntityT extends EntityBase>(
  filters: (Filterable<EntityT> | OneToManyLink<EntityT>)[]
): FilterList<EntityT> {
  return new FilterList(
    filters.map(f => {
      if (f instanceof OneToManyLink) {
        return f._filters;
      }
      return f;
    })
  );
}
