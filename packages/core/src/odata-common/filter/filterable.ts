import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Entity } from '../entity';
import { FieldType, OneToManyLink } from '../selectable';
import { Filter } from './filter';
import { FilterLink } from './filter-link';
import { FilterList } from './filter-list';
import { FilterLambdaExpression } from './filter-lambda-expression';

/**
 * A union of all types that can be used for filtering.
 *
 * @typeparam EntityT - Type of the entity to be filtered on
 */
export type Filterable<EntityT extends Entity> =
  | Filter<EntityT, FieldType | FieldType[]>
  | FilterLink<EntityT>
  | FilterList<EntityT>
  | FilterLambdaExpression<EntityT>;

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
 * Note that the [[GetAllRequestBuilder.filter | GetAllRequestBuilderV2.filter]]  and [[GetAllRequestBuilderV4.filter]] method take a rest parameter and thereby an array of filter expressions that are then combined conjunctively. As a consequence following is equivalent to the example above:
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
>(
  filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): Filterable<EntityT>[] {
  return filters.map(f => (f instanceof OneToManyLink ? f._filters : f));
}

// TODO:
// Export function not<EntityT extends Entity>(expression: Filterable<EntityT>): Filterable<EntityT> {
//   Return new FilterList([], expressions);
// }
