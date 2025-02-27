import type { DeSerializers } from '../de-serializers';
import type { EntityBase, EntityIdentifiable } from '../entity-base';
import type { EntityApi } from '../entity-api';

/**
 * Represents a request builder for a given entity API.
 */
export abstract class RequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> implements EntityIdentifiable<EntityT, DeSerializersT>
{
  _deSerializers: DeSerializersT;
  _entity: EntityT;

  constructor(public entityApi: EntityApi<EntityT, DeSerializersT>) {}
}
