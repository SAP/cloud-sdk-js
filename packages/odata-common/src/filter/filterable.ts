import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import type { EntityBase } from '../entity-base';
import type { OneToManyLink } from '../selectable/one-to-many-link';
import { DeSerializers } from '../de-serializers';
import { EntityApi } from '../entity-api';
import type { BooleanFilterFunction } from './boolean-filter-function';
import type { Filter } from './filter';
import { UnaryFilter } from './unary-filter';
import { FilterList } from './filter-list';
import { FilterLambdaExpression } from './filter-lambda-expression';
import { FilterLink } from './filter-link';

/**
 * A union of all types that can be used for filtering.
 * @typeParam EntityT - Type of the entity to be filtered on.
 */
export type Filterable<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT> = EntityApi<
    EntityBase,
    any
  >
> =
  | Filter<EntityT, DeSerializersT, any>
  | FilterLink<EntityT, DeSerializersT, LinkedEntityApiT>
  | FilterList<EntityT, DeSerializersT>
  | FilterLambdaExpression<EntityT, DeSerializersT>
  | UnaryFilter<EntityT, DeSerializersT>
  | BooleanFilterFunction<EntityT>
  | OneToManyLink<EntityT, DeSerializersT, LinkedEntityApiT>;

// eslint-disable-next-line jsdoc/require-returns-check
/**
 * Combine {@link Filterable}s with logical `and` to create a {@link FilterList}.
 * @example
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(and(filterExp1, filterExp2));
 * ```
 *
 * Note that the {@link @sap-cloud-sdk/odata-v2!GetAllRequestBuilder.filter | GetAllRequestBuilderV2.filter}  and {@link @sap-cloud-sdk/odata-v4!GetAllRequestBuilder.filter | GetAllRequestBuilderV4.filter} method take a rest parameter and thereby an array of filter expressions that are then combined conjunctively. As a consequence following is equivalent to the example above:
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(filterExp1, filterExp2);
 * ```
 * @typeParam EntityT - Type of the entity filter on.
 * @param expressions - Filterables to be combined with logical `and`.
 * @returns The newly created FilterList.
 */
export function and<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  expressions: Filterable<EntityT, DeSerializersT>[]
): FilterList<EntityT, DeSerializersT>;
export function and<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  ...expressions: Filterable<EntityT, DeSerializersT>[]
): FilterList<EntityT, DeSerializersT>;
// eslint-disable-next-line jsdoc/require-jsdoc
export function and<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  first:
    | undefined
    | Filterable<EntityT, DeSerializersT>
    | Filterable<EntityT, DeSerializersT>[],
  ...rest: Filterable<EntityT, DeSerializersT>[]
): FilterList<EntityT, DeSerializersT> {
  return new FilterList(transformVariadicArgumentToArray(first, rest));
}

// eslint-disable-next-line jsdoc/require-returns-check
/**
 * Combine {@link Filterable}s with logical `or` to create a {@link FilterList}.
 * @example
 * ```ts
 * Entity.requestBuilder()
 *  .getAll()
 *  .filter(or(filterExp1, filterExp2));
 * ```
 * @typeParam EntityT - Type of the entity filter on.
 * @param expressions - Filterables to be combined with logical `or`.
 * @returns The newly created FilterList.
 */
export function or<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  expressions: Filterable<EntityT, DeSerializersT>[]
): FilterList<EntityT, DeSerializersT>;
export function or<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  ...expressions: Filterable<EntityT, DeSerializersT>[]
): FilterList<EntityT, DeSerializersT>;
// eslint-disable-next-line jsdoc/require-jsdoc
export function or<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  first:
    | Filterable<EntityT, DeSerializersT>
    | Filterable<EntityT, DeSerializersT>[],
  ...rest: Filterable<EntityT, DeSerializersT>[]
): FilterList<EntityT, DeSerializersT> {
  return new FilterList([], transformVariadicArgumentToArray(first, rest));
}

/**
 * Negate a filter.
 * @param filter - The filter to negate.
 * @returns The negated filter.
 */
export function not<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  filter: Filterable<EntityT, DeSerializersT>
): UnaryFilter<EntityT, DeSerializersT> {
  return new UnaryFilter(filter, 'not');
}
