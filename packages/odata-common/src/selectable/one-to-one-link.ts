import { EntityBase } from '../entity-base';
import { Order, Orderable, OrderLink } from '../order';
import { Filterable, FilterLink } from '../filter';
import { DeSerializers } from '../de-serializers';
import { EntityApi, EntityType } from '../entity-api';
import { Link } from './link';

/**
 * Represents a link from one entity to one other linked entity (as opposed to a list of linked entities). In OData v2 a `OneToOneLink` can be used to filter and order a selection on an entity based on filters and orders on a linked entity.
 * @typeParam EntityT - Type of the entity to be linked from
 * @typeParam LinkedEntityT - Type of the entity to be linked to.
 */
export class OneToOneLink<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
> extends Link<EntityT, DeSerializersT, LinkedEntityApiT> {
  /**
   * List of criteria of the linked entity to order the given entity by with descending priority.
   */
  orderBys: Order<EntityType<LinkedEntityApiT>>[] = [];

  /**
   * Filterables to apply to the given entity based on the linked entity.
   */
  filters: Filterable<EntityType<LinkedEntityApiT>, DeSerializersT>;

  clone(): this {
    const clonedLink = super.clone();
    clonedLink.filters = this.filters;
    clonedLink.orderBys = this.orderBys;
    return clonedLink;
  }

  /**
   * Create order statements for the OData request based on the linked entity. The given statements have descending priority.
   * @example
   * ```
   * Entity.requestBuilder()
   *  .getAll()
   *  .orderBy(Entity.TO_LINKED_ENTITY.orderBy(asc(LinkedEntity.PROPERTY1), desc(LinkedEntity.PROPERTY2)));
   * ```
   * @param orderBy - Criteria to order by.
   * @returns Newly created order link.
   */
  orderBy(
    ...orderBy: Orderable<EntityType<LinkedEntityApiT>>[]
  ): OrderLink<EntityT, LinkedEntityApiT> {
    return new OrderLink(this, orderBy);
  }

  /**
   * Create filter statements to be applied to the OData request based on the linked entity values.
   * @param filters - Filters based on the linked entity.
   * @returns Newly created {@link FilterLink}.
   */
  filter(
    ...filters: Filterable<EntityType<LinkedEntityApiT>, DeSerializersT>[]
  ): FilterLink<EntityT, DeSerializersT, LinkedEntityApiT> {
    return new FilterLink(this, filters);
  }
}
