import { Entity, EntityIdentifiable, Constructable } from '../entity';

type EntityBasedRequestBuilder<EntityCT extends Constructable<Entity>> =
  ReturnType<EntityCT['requestBuilder']>;

/**
 * @hidden
 */
export abstract class RequestBuilder<EntityT extends Entity>
  implements EntityIdentifiable<EntityT>
{
  static forEntity<EntityCT extends Constructable<Entity>>(
    entity: EntityCT
  ): EntityBasedRequestBuilder<EntityCT> {
    return entity.requestBuilder() as EntityBasedRequestBuilder<EntityCT>;
  }

  _entity: EntityT;
  _entityConstructor: Constructable<EntityT>;
}
