import { EntityBase } from '../entity-base';
import { Order } from '../order/order';
import { Filterable } from '../filter/filterable';
import { Orderable } from '../order/orderable';
import { OrderLink } from '../order/order-link';
import { FilterLink } from '../filter/filter-link';
import { Link } from './link';

/**
 * Represents a link from one entity to one other linked entity (as opposed to a list of linked entities). In OData v2 a `OneToOneLink` can be used to filter and order a selection on an entity based on filters and orders on a linked entity.
 * @typeparam EntityT - Type of the entity to be linked from
 * @typeparam LinkedEntityT - Type of the entity to be linked to
 * @internal
 */
export class OneToOneLink<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
> extends Link<EntityT, LinkedEntityT> {
  /**
   * @deprecated Since v1.21.0. Use [[clone]] instead.
   * Create a new one to one link based on a given link.
   * @typeparam EntityT - Type of the entity to be linked from
   * @typeparam LinkedEntityT - Type of the entity to be linked to
   * @param link - Link to be cloned
   * @returns Newly created link
   */
  static clone<EntityT1 extends EntityBase, LinkedEntityT1 extends EntityBase>(
    link: OneToOneLink<EntityT1, LinkedEntityT1>
  ): OneToOneLink<EntityT1, LinkedEntityT1> {
    const clonedLink = link.clone() as OneToOneLink<EntityT1, LinkedEntityT1>;
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

  clone(): this {
    const clonedLink = super.clone();
    clonedLink.filters = this.filters;
    clonedLink.orderBys = this.orderBys;
    return clonedLink;
  }

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
   * @param filters - Filters based on the linked entity.
   * @returns Newly created [[FilterLink]].
   */
  filter(
    ...filters: Filterable<LinkedEntityT>[]
  ): FilterLink<EntityT, LinkedEntityT> {
    return new FilterLink(this, filters);
  }
}
