import { DeSerializers } from '../de-serializers';
import { EntityBase, EntityIdentifiable } from '../entity-base';

/**
 * @internal
 */
export abstract class RequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> implements EntityIdentifiable<EntityT, DeSerializersT>
{
  _deSerializers: DeSerializersT;
  _entity: EntityT;
}
