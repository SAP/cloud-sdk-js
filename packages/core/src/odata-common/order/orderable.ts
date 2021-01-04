import { Entity } from '../entity';
import { Link, SimpleTypeFields } from '../selectable';
import { ComplexTypePropertyFields } from '../selectable/complex-type-property-fields';
import { Order } from './order';
import { OrderLink } from './order-link';

/**
 * A union of all types that can be used for ordering.
 *
 * @typeparam EntityT - Type of the entity to be ordered
 */
export type Orderable<EntityT extends Entity> =
  | Order<EntityT>
  | OrderLink<EntityT, Entity>;

/**
 * A union of all types that can be used as input for ordering.
 *
 * @typeparam EntityT - Type of the entity to be ordered
 */
export type OrderableInput<EntityT extends Entity> =
  | SimpleTypeFields<EntityT>
  | Link<EntityT, Entity>
  | ComplexTypePropertyFields<EntityT, any>;

/**
 * Create new Order by `orderBy._fieldName` in ascending order.
 *
 * @typeparam EntityT - Type of the entity to be ordered
 * @param orderBy - Field or link to be ordered by
 * @returns New order
 */
export function asc<EntityT extends Entity>(
  orderBy: OrderableInput<EntityT>
): Order<EntityT> {
  if (orderBy instanceof Link) {
    return new Order(orderBy._fieldName);
  }
  return new Order(orderBy.fieldPath());
}

/**
 * Create new Order by `orderBy._fieldName` in descending order.
 *
 * @typeparam EntityT - Type of the entity to be ordered
 * @param orderBy - Field or link to be ordered by
 * @returns New order
 */
export function desc<EntityT extends Entity>(
  orderBy: OrderableInput<EntityT>
): Order<EntityT> {
  if (orderBy instanceof Link) {
    return new Order(orderBy._fieldName);
  }
  return new Order(orderBy.fieldPath(), 'desc');
}
