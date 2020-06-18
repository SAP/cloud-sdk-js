/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { Filterable, and, FilterList, Filter, FilterWithLambdaOperator } from '../filter';
import { Orderable } from '../order';
import { Link } from './link';
import { FieldType } from './field';
import { FilterLambdaExpression } from '../filter/filter-lambda-expression';

/**
 * @experimental
 */
export class OneToManyLink<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
> extends Link<EntityT, LinkedEntityT> {
  _filters: FilterList<LinkedEntityT>;
  _orderBy: Orderable<LinkedEntityT>[] = [];
  _top: number;
  _skip: number;

  clone(): this {
    const clonedLink = super.clone();
    clonedLink._filters = this._filters;
    clonedLink._orderBy = this._orderBy;
    clonedLink._top = this._top;
    clonedLink._skip = this._skip;
    return clonedLink;
  }

  /**
   * @experimental This is experimental and is subject to change. Use with caution.
   */
  filter(...expressions: FilterWithLambdaOperator<LinkedEntityT, FieldType>[]): FilterList<EntityT> {
    const filterLambdaExps = expressions.map(e => new FilterLambdaExpression(this, e.filter,e.lambdaOperator));
    return and(...filterLambdaExps);
  }

  /**
   * Add order-by statements to the request.
   *
   * @param orderBy - OrderBy statements to order the response by
   * @returns The request builder itself, to facilitate method chaining
   */
  orderBy(...orderBy: Orderable<LinkedEntityT>[]): this {
    const link = this.clone();
    link._orderBy = orderBy;
    return link;
  }

  /**
   * Limit number of returned entities.
   *
   * @param top - Maximum number of entities to return in the response. Can be less, if less entities match the request
   * @returns The request builder itself, to facilitate method chaining
   */
  top(top: number): this {
    const link = this.clone();
    link._top = top;
    return link;
  }

  /**
   * Skip number of entities.
   *
   * @param skip - Number of matching entities to skip. Useful for paging
   * @returns The request builder itself, to facilitate method chaining
   */
  skip(skip: number): this {
    const link = this.clone();
    link._skip = skip;
    return link;
  }
}
