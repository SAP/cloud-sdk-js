import { EntityBase } from '../entity-base';
import { Link } from '../selectable/link';
import { EntityApi, EntityType } from '../entity-api';
import type { Orderable } from './orderable';

/**
 * Link to represent an order by on a linked entity.
 * @typeParam EntityT - Type of the entity to link from.
 * @typeParam LinkedEntityT - Type of the entity to link to.
 */
export class OrderLink<
  EntityT extends EntityBase,
  LinkedEntityApiT extends EntityApi<EntityBase, any>
> {
  readonly entityType: EntityT;
  readonly linkedEntityType: EntityType<LinkedEntityApiT>;

  /**
   * Creates an instance of OrderLink.
   * @param link - Link to the entity to order by.
   * @param orderBy - A list of orderables based on the linked entity.
   */
  constructor(
    public link: Link<EntityT, any, LinkedEntityApiT>,
    public orderBy: Orderable<
      EntityType<LinkedEntityApiT>,
      EntityApi<EntityBase, any>
    >[]
  ) {}
}
