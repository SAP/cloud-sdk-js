import { Entity, EntityIdentifiable, Constructable } from '../entity';

type EntitydRequestBuilder<
  EntityCT extends Constructable<Entity>
> = ReturnType<EntityCT['requestBuilder']>;

/**
 * @hidden
 */
export abstract class RequestBuilder<EntityT extends Entity>
  implements EntityIdentifiable<EntityT> {
  static forEntity<EntityCT extends Constructable<Entity>>(
    entity: EntityCT
  ): EntitydRequestBuilder<EntityCT> {
    return entity.requestBuilder() as EntitydRequestBuilder<EntityCT>;
  }

  _entity: EntityT;
  _entityConstructor: Constructable<EntityT>;
}
