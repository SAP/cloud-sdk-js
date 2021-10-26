import { EntityBase, EntityIdentifiable, Constructable } from '../entity-base';

type EntityBasedRequestBuilder<EntityCT extends Constructable<EntityBase>> =
  ReturnType<EntityCT['requestBuilder']>;


export abstract class RequestBuilder<EntityT extends EntityBase>
  implements EntityIdentifiable<EntityT>
{
  static forEntity<EntityCT extends Constructable<EntityBase>>(
    entity: EntityCT
  ): EntityBasedRequestBuilder<EntityCT> {
    return entity.requestBuilder() as EntityBasedRequestBuilder<EntityCT>;
  }

  _entity: EntityT;
  _entityConstructor: Constructable<EntityT>;
}
