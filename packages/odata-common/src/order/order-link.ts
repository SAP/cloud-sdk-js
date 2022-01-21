import { EntityBase } from '../entity-base';
import { Link } from '../selectable';
import { DeSerializers } from '../de-serializers';
import { EntityApi, EntityType } from '../entity-api';
import type { Orderable } from './orderable';

/**
 * Link to represent an order by on a linked entity.
 * @typeparam EntityT - Type of the entity to link from
 * @typeparam LinkedEntityT - Type of the entity to link to
 * @internal
 */
export class OrderLink<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
> {
  readonly entityType: EntityT;
  readonly linkedEntityType: EntityType<LinkedEntityApiT>;

  /**
   * Creates an instance of OrderLink.
   * @param link - Link to the entity to order by
   * @param orderBy - A list of orderables based on the linked entity
   */
  constructor(
    public link: Link<EntityT, DeSerializersT, LinkedEntityApiT>,
    public orderBy: Orderable<
      EntityType<LinkedEntityApiT>,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ) {}
}
