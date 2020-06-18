/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { FieldType } from '../selectable';
import { Filter } from './filter';
import { FilterLink } from './filter-link';
import { FilterList } from './filter-list';
import { FilterLambdaExpression, FilterLambdaOperator } from './filter-lambda-expression';

/**
 * A union of all types that can be used for filtering.
 *
 * @typeparam EntityT - Type of the entity to be filtered on
 */
export type Filterable<EntityT extends EntityBase> =
  | Filter<EntityT, FieldType>
  | FilterLink<EntityT>
  | FilterList<EntityT>
  | FilterLambdaExpression<EntityT, FieldType>;

/**
 * Create a [[FilterList]] by combining [[Filterable]]s with logical `and`.
 *
 * Example:
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(and(filterExp1, filterExp2));
 * ```
 *
 * Note that the [[GetAllRequestBuilder.filter]] method takes a rest parameter and thereby an array of filter expressions that are then combined conjunctively. As a consequence following is equivalent to the example above:
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(filterExp1, filterExp2);
 * ```
 *
 * @typeparam EntityT - Type of the entity to be filtered on
 * @param expressions - Filterables to be combined with logical `and`
 * @returns The newly created FilterList
 */
export function and<EntityT extends EntityBase>(
  ...expressions: Filterable<EntityT>[]
): FilterList<EntityT> {
  return new FilterList(expressions);
}

/**
 * Create a [[FilterList]] by combining [[Filterable]]s with logical `or`.
 *
 * Example:
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(or(filterExp1, filterExp2));
 * ```
 *
 * @typeparam EntityT - Type of the entity to be filtered on
 * @param expressions - Filterables to be combined with logical `or`
 * @returns The newly created FilterList
 */
export function or<EntityT extends EntityBase>(
  ...expressions: Filterable<EntityT>[]
): FilterList<EntityT> {
  return new FilterList([], expressions);
}

// TODO:
// Export function not<EntityT extends Entity>(expression: Filterable<EntityT>): Filterable<EntityT> {
//   Return new FilterList([], expressions);
// }

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function any<FieldT extends FieldType, LinkedEntityT extends EntityBase>(filter: Filter<LinkedEntityT, FieldT>): FilterWithLambdaOperator<LinkedEntityT, FieldType>{
  return {filter, lambdaOperator: 'any'};
}

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function all<FieldT extends FieldType, LinkedEntityT extends EntityBase>(filter: Filter<LinkedEntityT, FieldT>): FilterWithLambdaOperator<LinkedEntityT, FieldType>{
  return {filter, lambdaOperator: 'all'};
}

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export interface FilterWithLambdaOperator<LinkedEntityT extends EntityBase, FieldT extends FieldType>{
  filter: Filter<LinkedEntityT, FieldT>;
  lambdaOperator: FilterLambdaOperator;
}
