import { DeSerializers } from '../de-serializers';
import { EntityBase, EntityIdentifiable } from '../entity-base';
import {EntityApi} from "../entity-api";

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

  constructor(public entityApi: EntityApi<EntityT, DeSerializersT>) {}
}
