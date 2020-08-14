/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { Filterable, FilterLink } from '../filter';
import { Orderable } from '../order';
import { Link } from './link';

/**
 * Represents a one to many relation for OData v4 entites.
 * For OData v2 entites the [[Link]] is used to represent one to many relation.
 *
 * See also [[Link]] for more informations.
 */
export class OneToManyLink<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
> extends Link<EntityT, LinkedEntityT> {
  _filters: FilterLink<EntityT, LinkedEntityT>;
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
   * Create filter statements to be applied to the OData request based on the linked entity values.
   *
   * @param filters - Filters based on the linked entity
   * @returns Newly created Filterlink
   */
  filter(
    ...expressions: (
      | Filterable<LinkedEntityT>
      | OneToManyLink<LinkedEntityT, any>
    )[]
  ): this {
    const link = this.clone();

    link._filters = new FilterLink(
      this,
      expressions.map(e => (e instanceof OneToManyLink ? e._filters : e))
    );
    return link;
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
