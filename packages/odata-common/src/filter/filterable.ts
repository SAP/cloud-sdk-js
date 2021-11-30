import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import type { EntityBase } from '../entity-base';
import type { OneToManyLink, FieldType } from '../selectable';
import type { BooleanFilterFunction } from './boolean-filter-function';
import type { Filter } from './filter';
import { UnaryFilter } from './unary-filter';
import { FilterList } from './filter-list';
import { FilterLambdaExpression } from './filter-lambda-expression';
import { FilterLink } from './filter-link';

/**
 * A union of all types that can be used for filtering.
 * @typeparam EntityT - Type of the entity to be filtered on
 * @internal
 */
export type Filterable<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase = any
> =
  | Filter<EntityT, FieldType | FieldType[]>
  | FilterLink<EntityT>
  | FilterList<EntityT>
  | FilterLambdaExpression<EntityT>
  | UnaryFilter<EntityT>
  | BooleanFilterFunction<EntityT>
  | OneToManyLink<EntityT, LinkedEntityT>;

/**
 * Combine [[Filterable]]s with logical `and` to create a [[FilterList]].
 *
 * Example:
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(and(filterExp1, filterExp2));
 * ```
 *
 * Note that the [[GetAllRequestBuilder.filter | GetAllRequestBuilderV2.filter]]  and [[GetAllRequestBuilderV4.filter]] method take a rest parameter and thereby an array of filter expressions that are then combined conjunctively. As a consequence following is equivalent to the example above:
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(filterExp1, filterExp2);
 * ```
 * @typeparam EntityT - Type of the entity filter on.
 * @param expressions - Filterables to be combined with logical `and`.
 * @returns The newly created FilterList.
 * @internal
 */
export function and<EntityT extends EntityBase>(
  expressions: Filterable<EntityT>[]
): FilterList<EntityT>;

/**
 * @internal
 */
export function and<EntityT extends EntityBase>(
  ...expressions: Filterable<EntityT>[]
): FilterList<EntityT>;

/**
 * @param first - first
 * @param rest - rest
 * @returns A FilterList
 * @internal
 */
export function and<EntityT extends EntityBase>(
  first: undefined | Filterable<EntityT> | Filterable<EntityT>[],
  ...rest: Filterable<EntityT>[]
): FilterList<EntityT> {
  return new FilterList(variadicArgumentToArray(first, rest));
}

/**
 * Combine [[Filterable]]s with logical `or` to create a [[FilterList]].
 *
 * Example:
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(or(filterExp1, filterExp2));
 * ```
 * @typeparam EntityT - Type of the entity filter on.
 * @param expressions - Filterables to be combined with logical `or`
 * @returns The newly created FilterList
 * @internal
 */
export function or<EntityT extends EntityBase>(
  expressions: Filterable<EntityT>[]
): FilterList<EntityT>;

/**
 * @internal
 */
export function or<EntityT extends EntityBase>(
  ...expressions: Filterable<EntityT>[]
): FilterList<EntityT>;

/**
 * @param first - first
 * @param rest - rest
 * @returns A FilterList
 * @internal
 */
export function or<EntityT extends EntityBase>(
  first: Filterable<EntityT> | Filterable<EntityT>[],
  ...rest: Filterable<EntityT>[]
): FilterList<EntityT> {
  return new FilterList([], variadicArgumentToArray(first, rest));
}

/**
 * Negate a filter.
 * @param filter - The filter to negate.
 * @returns The negated filter.
 * @internal
 */
export function not<EntityT extends EntityBase>(
  filter: Filterable<EntityT>
): UnaryFilter<EntityT> {
  return new UnaryFilter(filter, 'not');
}
