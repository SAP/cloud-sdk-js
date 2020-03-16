/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../constructable';
import { Entity, EntityIdentifiable } from '../entity';

type OrderType = 'asc' | 'desc';

/**
 * OData queries take this to determine the order of results.
 *
 * @typeparam EntityT -
 */
export class Order<EntityT extends Entity> implements EntityIdentifiable<EntityT> {
  readonly _entityConstructor: Constructable<EntityT>;

  /**
   * Creates an instance of Order.
   *
   * @param _fieldName - Field to order by
   * @param orderType - Type of ordering, can be 'asc' for ascending or 'desc' for descending
   */
  constructor(public _fieldName: string, public orderType: OrderType = 'asc') {}
}
