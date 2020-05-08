/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { Filterable, and, FilterList } from '../filter';
import { Orderable } from '../order';
import { Link } from './link';

/**
 * Represents a navigation property of an OData entity.
 *
 * OData is a relational data model, i.e. entities can be related to one another.
 * For example, BusinessPartner is in a 1:n relation with BusinessPartnerAddress and in a 1:1 relation with Customer.
 * Like normal properties, navigation properties can be used for selecting (expanding) and filtering.
 * For example, when constructing a query on the BusinessPartner entity, an instance of `OneToManyLink<BusinessPartner, Customer>`
 * can be passed as argument to the select function, e.g. `BusinessPartner.TO_CUSTOMER`.
 *
 * NOTE: the OneToManyLink class represents navigation properties with a 1:n cardinality.
 * For navigation properties with a 1:0..1 cardinality, see [[OneToOneLink]].
 *
 * See also: [[Selectable]]
 *
 * @typeparam EntityT - Type of the entity to be linked from
 * @typeparam LinkedEntityT - Type of the entity to be linked to
 */
export class OneToManyLink<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
> extends Link<EntityT, LinkedEntityT> {
  /**
   * @deprecated
   * Create a new link based on a given link.
   *
   * @typeparam EntityT - Type of the entity to be linked from
   * @typeparam LinkedEntityT - Type of the entity to be linked to
   * @param link - OneToManyLink to be cloned
   * @returns Newly created link
   */
  static clone<EntityT extends EntityBase, LinkedEntityT extends EntityBase>(
    link: OneToManyLink<EntityT, LinkedEntityT>
  ): OneToManyLink<EntityT, LinkedEntityT> {
    return link.clone();
  }

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
   * Add filter statements to the request.
   *
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(...expressions: Filterable<LinkedEntityT>[]): this {
    const link = this.clone();
    link._filters = and(...expressions);
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
