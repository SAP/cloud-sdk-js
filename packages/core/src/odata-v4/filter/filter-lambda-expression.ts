import {
  FilterLambdaExpression,
  Entity as EntityBase,
  and,
  Filterable,
  toFilterableList
} from '../../odata-common';

/**
 * Will return the entity if at least one element of the multilink relation fulfills the condition.
 * @param filters - A filter condition like MyEntity.someMultiLink.someProperty.eq('value')
 * @returns The lambda filter function to be considered in the query
 */
export function any<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
>(
  ...filters: Filterable<EntityT, LinkedEntityT>[]
): FilterLambdaExpression<EntityT> {
  return new FilterLambdaExpression(and(toFilterableList(filters)), 'any');
}

// eslint-disable-next-line valid-jsdoc
/**
 * Will return the entity if all elements of the multilink relation fulfill the condition.
 * @param filters - A filter condition like MyEntity.someMultiLink.someProperty.eq('value')
 * @returns The lambda filter function to be considered in the query
 */
export function all<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
>(
  ...filters: Filterable<EntityT, LinkedEntityT>[]
): FilterLambdaExpression<EntityT> {
  return new FilterLambdaExpression(and(toFilterableList(filters)), 'all');
}
