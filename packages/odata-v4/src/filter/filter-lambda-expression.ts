import type {
  EntityBase,
  Filterable,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
import {
  FilterLambdaExpression,
  and,
  toFilterableList
} from '@sap-cloud-sdk/odata-common/internal';
import type { DeSerializers } from '../de-serializers';
import type { Entity } from '../entity';

/**
 * Will return the entity if at least one element of the one-to-many link relation fulfills the condition.
 * @param filters - A filter condition like MyEntity.someMultiLink.someProperty.eq('value').
 * @returns The lambda filter function to be considered in the query.
 */
export function any<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
>(
  ...filters: Filterable<EntityT, DeSerializersT, LinkedEntityApiT>[]
): FilterLambdaExpression<EntityT, DeSerializersT> {
  return new FilterLambdaExpression(and(toFilterableList(filters)), 'any');
}

/**
 * Will return the entity if all elements of the one-to-many link relation fulfill the condition.
 * @param filters - A filter condition like MyEntity.someMultiLink.someProperty.eq('value').
 * @returns The lambda filter function to be considered in the query.
 */
export function all<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
>(
  ...filters: Filterable<EntityT, DeSerializersT, LinkedEntityApiT>[]
): FilterLambdaExpression<EntityT, DeSerializersT> {
  return new FilterLambdaExpression(and(toFilterableList(filters)), 'all');
}
