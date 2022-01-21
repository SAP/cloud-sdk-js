import { DeSerializers } from '../de-serializers';
import { EntityBase } from '../entity-base';
import { FilterList } from './filter-list';
import type { Filterable } from './filterable';
import {EntityApi} from "../entity-api";

/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export type FilterLambdaOperator = 'any' | 'all';

/**
 * @internal
 */
export class FilterLambdaExpression<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
> {
  constructor(
    public filters: FilterList<EntityT, DeSerializersT, LinkedEntityApiT>,
    public lambdaOperator: FilterLambdaOperator
  ) {}
}

/**
 * @internal
 */
export function isFilterLambdaExpression<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
>(
  filterable: Filterable<EntityT, DeSerializersT>
): filterable is FilterLambdaExpression<
  EntityT,
  DeSerializersT,
  LinkedEntityApiT
> {
  return 'lambdaOperator' in filterable;
}
