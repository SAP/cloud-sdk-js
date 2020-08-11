/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { FieldType } from '../../common/selectable';
import { and, Filterable, FilterList } from '../../common/filter';
import { EntityBase } from '../../common';
import { OneToManyLink } from '../../common/selectable/one-to-many-link';
import { FilterLambdaExpression } from '../../common/filter/filter-lambda-expression';
/**
 * Will return the entity if at least one element of the multilink relation fulfills the condition.
 * param filters = A filter condition like MyEntity.someMultiLink.someProperty.eq('value')
 * returns The lambda filter function to be considered in the query
 */
export function any<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
>(
  ...filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): FilterLambdaExpression<EntityT, FieldType> {
  return new FilterLambdaExpression(toFilterList(filters), 'any');
}

// eslint-disable-next-line valid-jsdoc
/**
 * Will return the entity if all elements of the multilink relation fulfill the condition.
 * param filters = A filter condition like MyEntity.someMultiLink.someProperty.eq('value')
 * returns The lambda filter function to be considered in the query
 */
export function all<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
>(
  ...filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): FilterLambdaExpression<EntityT, FieldType> {
  return new FilterLambdaExpression(toFilterList(filters), 'all');
}

function toFilterList<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
>(
  filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): FilterList<EntityT> {
  return and(
    ...filters.map(f => (f instanceof OneToManyLink ? f._filters : f))
  );
}
