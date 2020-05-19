/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { Link } from '../selectable/link';
import { Orderable } from './orderable';

/**
 * Link to represent an order by on a linked entity.
 *
 * @typeparam EntityT - Type of the entity to link from
 * @typeparam LinkedEntityT - Type of the entity to link to
 */
export class OrderLink<
  EntityT extends EntityBase,
  LinkedEntityT extends EntityBase
> {
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
