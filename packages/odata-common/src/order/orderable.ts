import { DeSerializers } from '../de-serializers';
import { EntityBase } from '../entity-base';
import {
  ComplexTypePropertyFields,
  SimpleTypeFields,
  Link
} from '../selectable';
import { Order } from './order';
import { OrderLink } from './order-link';

/**
 * A union of all types that can be used for ordering.
 * @typeparam EntityT - Type of the entity to be ordered
 * @internal
 */
export type Orderable<EntityT extends EntityBase> =
  | Order<EntityT>
  | OrderLink<EntityT, EntityBase>;

/**
 * A union of all types that can be used as input for ordering.
 * @typeparam EntityT - Type of the entity to be ordered
 * @internal
 */
export type OrderableInput<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> =
  | SimpleTypeFields<EntityT>
  | Link<EntityT, DeSerializersT, EntityBase>
  | ComplexTypePropertyFields<EntityT>;

/**
 * Create new Order by `orderBy._fieldName` in ascending order.
 * @typeparam EntityT - Type of the entity to be ordered
 * @param orderBy - Field or link to be ordered by
 * @returns New order
 * @internal
 */
export function asc<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(orderBy: OrderableInput<EntityT, DeSerializersT>): Order<EntityT> {
  if (orderBy instanceof Link) {
    return new Order(orderBy._fieldName);
  }
  return new Order(orderBy.fieldPath());
}

/**
 * Create new Order by `orderBy._fieldName` in descending order.
 * @typeparam EntityT - Type of the entity to be ordered
 * @param orderBy - Field or link to be ordered by
 * @returns New order
 * @internal
 */
export function desc<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(orderBy: OrderableInput<EntityT, DeSerializersT>): Order<EntityT> {
  if (orderBy instanceof Link) {
    return new Order(orderBy._fieldName);
  }
  return new Order(orderBy.fieldPath(), 'desc');
}
