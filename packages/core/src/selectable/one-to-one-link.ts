/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { Filterable, FilterLink } from '../filter';
import { Order, Orderable, OrderLink } from '../order';
import { Link } from './link';

/**
 * Represents a link from one entity to one other linked entity (as opposed to a list of linked entities). In OData v2 a `OneToOneLink` can be used to filter and order a selection on an entity based on filters and orders on a linked entity.
 *
 * @typeparam EntityT - Type of the entity to be linked from
 * @typeparam LinkedEntityT - Type of the entity to be linked to
 */
export class OneToOneLink<
  EntityT extends Entity,
  LinkedEntityT extends Entity
> extends Link<EntityT, LinkedEntityT> {
  /**
   * Create a new one to one link based on a given link.
   *
   * @typeparam EntityT - Type of the entity to be linked from
   * @typeparam LinkedEntityT - Type of the entity to be linked to
   * @param link - Link to be cloned
   * @returns Newly created link
   */
  static clone<EntityT extends Entity, LinkedEntityT extends Entity>(
    link: OneToOneLink<EntityT, LinkedEntityT>
  ): OneToOneLink<EntityT, LinkedEntityT> {
    const clonedLink = Link.clone(link) as OneToOneLink<EntityT, LinkedEntityT>;
    clonedLink.orderBys = link.orderBys;
    clonedLink.filters = link.filters;
    return clonedLink;
  }

  /**
   * List of criteria of the linked entity to order the given entity by with descending priority.
   */
  orderBys: Order<LinkedEntityT>[] = [];

  /**
   * Filterables to apply to the given entity based on the linked entity.
   */
  filters: Filterable<LinkedEntityT>;

  /**
   * Create order statements for the OData request based on the linked entity. The given statements have descending priority.
   *
   * Example:
   * ```
   * Entity.requestBuilder()
   *  .getAll()
   *  .orderBy(Entity.TO_LINKED_ENTITY.orderBy(asc(LinkedEntity.PROPERTY1), desc(LinkedEntity.PROPERTY2)));
   * ```
   * @param orderBy - Criteria to order by
   * @returns Newly created order link
   */
  orderBy(
    ...orderBy: Orderable<LinkedEntityT>[]
  ): OrderLink<EntityT, LinkedEntityT> {
    return new OrderLink(this, orderBy);
  }

  /**
   * Create filter statements to be applied to the OData request based on the linked entity values.
   *
   * @param filters - Filters based on the linked entity
   * @returns Newly created Filterlink
   */
  filter(
    ...filters: Filterable<LinkedEntityT>[]
  ): FilterLink<EntityT, LinkedEntityT> {
    return new FilterLink(this, filters);
  }
}
