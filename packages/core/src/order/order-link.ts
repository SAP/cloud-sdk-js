/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityODataV4 } from '../entity';
import { Link, LinkODataV4 } from '../selectable/link';
import { Orderable, OrderableODataV4 } from './orderable';

/**
 * Link to represent an order by on a linked entity.
 *
 * @typeparam EntityT - Type of the entity to link from
 * @typeparam LinkedEntityT - Type of the entity to link to
 */
export class OrderLink<EntityT extends Entity, LinkedEntityT extends Entity> {
  readonly entityType: EntityT;
  readonly linkedEntityType: LinkedEntityT;

  /**
   * Creates an instance of OrderLink.
   *
   * @param link - Link to the entity to order by
   * @param orderBy - A list of orderables based on the linked entity
   */
  constructor(
    public link: Link<EntityT, LinkedEntityT>,
    public orderBy: Orderable<LinkedEntityT>[]
  ) {}
}

export class OrderLinkODataV4<EntityT extends EntityODataV4, LinkedEntityT extends EntityODataV4> {
  readonly entityType: EntityT;
  readonly linkedEntityType: LinkedEntityT;

  /**
   * Creates an instance of OrderLink.
   *
   * @param link - Link to the entity to order by
   * @param orderBy - A list of orderables based on the linked entity
   */
  constructor(
    public link: LinkODataV4<EntityT, LinkedEntityT>,
    public orderBy: OrderableODataV4<LinkedEntityT>[]
  ) {}
}
