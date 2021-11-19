import { EntityBase, EntityIdentifiable, Constructable } from '../entity-base';

export abstract class RequestBuilder<EntityT extends EntityBase>
  implements EntityIdentifiable<EntityT>
{
  _entity: EntityT;
  _entityConstructor: Constructable<EntityT>;
}
