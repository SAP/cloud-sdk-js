import type { EntityBase } from '../entity-base';
import { FilterLink } from '../filter';
import { Orderable } from '../order';
import type { Filterable } from '../filter';
import { DeSerializers } from '../de-serializers';
import { Link } from './link';

/**
 * @param filters - filters
 * @returns filtered list
 * @internal
 */
export function toFilterableList<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityT extends EntityBase
>(
  filters: Filterable<EntityT, DeSerializersT, LinkedEntityT>[]
): Filterable<EntityT, DeSerializersT>[] {
  return filters.map(f => (f instanceof OneToManyLink ? f._filters : f));
}

/**
 * Represents a one to many relation for OData v4 entities.
 * For OData v2 entities the [[Link]] is used to represent one to many relation.
 * See [[Link]] for more information.
 * @internal
 */
export class OneToManyLink<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityT extends EntityBase
> extends Link<EntityT, DeSerializersT, LinkedEntityT> {
  _filters: FilterLink<EntityT, DeSerializersT, LinkedEntityT>;
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
   * @param filters - Filters based on the linked entity.
   * @returns Newly created `FilterLink`.
   */
  filter(
    ...expressions: (
      | Filterable<LinkedEntityT, DeSerializersT>
      | OneToManyLink<LinkedEntityT, DeSerializersT, EntityBase>
    )[]
  ): this {
    const link = this.clone();

    link._filters = new FilterLink(this, toFilterableList(expressions));
    return link;
  }

  /**
   * Add order-by statements to the request.
   ** @param orderBy - OrderBy statements to order the response by.
   * @returns The request builder itself, to facilitate method chaining.
   */
  orderBy(...orderBy: Orderable<LinkedEntityT>[]): this {
    const link = this.clone();
    link._orderBy = orderBy;
    return link;
  }

  /**
   * Number of returned entities.
   * @param top - Maximum number of entities to return in the response. Can be less, if less entities match the request.
   * @returns The request builder itself, to facilitate method chaining.
   */
  top(top: number): this {
    const link = this.clone();
    link._top = top;
    return link;
  }

  /**
   * Skip number of entities.
   * @param skip - Number of matching entities to skip. Useful for paging.
   * @returns The request builder itself, to facilitate method chaining.
   */
  skip(skip: number): this {
    const link = this.clone();
    link._skip = skip;
    return link;
  }
}
