import { EntityBase, EntityIdentifiable, Constructable } from '../entity-base';

type OrderType = 'asc' | 'desc';

/**
 * OData queries take this to determine the order of results.
 * @typeparam EntityT -
 * @internal
 */
export class Order<EntityT extends EntityBase>
  implements EntityIdentifiable<EntityT>
{
  readonly _entityConstructor: Constructable<EntityT>;
  readonly _entity: EntityT;

  /**
   * Creates an instance of Order.
   * @param _fieldName - Field to order by
   * @param orderType - Type of ordering, can be 'asc' for ascending or 'desc' for descending
   */
  constructor(public _fieldName: string, public orderType: OrderType = 'asc') {}
}
