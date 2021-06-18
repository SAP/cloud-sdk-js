import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Entity } from '../entity';
import { FieldType, OneToManyLink } from '../selectable';
import {
  FilterLambdaExpression,
  BooleanFilterFunction,
  Filter,
  FilterLink,
  FilterList,
  UnaryFilter
} from '../filter';

/**
 * A union of all types that can be used for filtering.
 *
 * @typeparam EntityT - Type of the entity to be filtered on
 */
export type Filterable<
  EntityT extends Entity,
  LinkedEntityT extends Entity = any
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
 *
 * @typeparam EntityT - Type of the entity filter on.
 * @param expressions - Filterables to be combined with logical `and`.
 * @returns The newly created FilterList.
 */
export function and<EntityT extends Entity>(
  expressions: Filterable<EntityT>[]
): FilterList<EntityT>;
export function and<EntityT extends Entity>(
  ...expressions: Filterable<EntityT>[]
): FilterList<EntityT>;
export function and<EntityT extends Entity>(
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
 *
 * @typeparam EntityT - Type of the entity filter on.
 * @param expressions - Filterables to be combined with logical `or`
 * @returns The newly created FilterList
 */
export function or<EntityT extends Entity>(
  expressions: Filterable<EntityT>[]
): FilterList<EntityT>;
export function or<EntityT extends Entity>(
  ...expressions: Filterable<EntityT>[]
): FilterList<EntityT>;
export function or<EntityT extends Entity>(
  first: Filterable<EntityT> | Filterable<EntityT>[],
  ...rest: Filterable<EntityT>[]
): FilterList<EntityT> {
  return new FilterList([], variadicArgumentToArray(first, rest));
}

/*
  hidden
 */
export function toFilterableList<
  EntityT extends Entity,
  LinkedEntityT extends Entity
>(filters: Filterable<EntityT, LinkedEntityT>[]): Filterable<EntityT>[] {
  return filters.map(f => (f instanceof OneToManyLink ? f._filters : f));
}

/**
 * Negate a filter.
 * @param filter The filter to negate.
 * @returns The negated filter.
 */
export function not<EntityT extends Entity>(
  filter: Filterable<EntityT>
): UnaryFilter<EntityT> {
  return new UnaryFilter(filter, 'not');
}
