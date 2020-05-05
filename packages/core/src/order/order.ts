/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable, ConstructableODataV4 } from '../constructable';
import { Entity, EntityIdentifiable, EntityIdentifiableODataV4, EntityODataV4 } from '../entity';

type OrderType = 'asc' | 'desc';

/**
 * OData queries take this to determine the order of results.
 *
 * @typeparam EntityT -
 */
export class Order<EntityT extends Entity>
  implements EntityIdentifiable<EntityT> {
  readonly _entityConstructor: Constructable<EntityT>;
  readonly _entity: EntityT;

  /**
   * Creates an instance of Order.
   *
   * @param _fieldName - Field to order by
   * @param orderType - Type of ordering, can be 'asc' for ascending or 'desc' for descending
   */
  constructor(public _fieldName: string, public orderType: OrderType = 'asc') {}
}

export class OrderODataV4<EntityT extends EntityODataV4>
  implements EntityIdentifiableODataV4<EntityT> {
  readonly _entityConstructor: ConstructableODataV4<EntityT>;
  readonly _entity: EntityT;

  /**
   * Creates an instance of Order.
   *
   * @param _fieldName - Field to order by
   * @param orderType - Type of ordering, can be 'asc' for ascending or 'desc' for descending
   */
  constructor(public _fieldName: string, public orderType: OrderType = 'asc') {}
}
