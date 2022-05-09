import { DeSerializers } from './de-serializers';
import { EntityBase, ODataVersionOf } from './entity-base';
import { OneToManyLink, AllFields, OneToOneLink } from './selectable';
import { EntityApi } from './entity-api';

/**
 * Represents everything that can be used in an `.expand` statement. Only relevant for OData v4 requests.
 * @typeparam EntityT - Type of the entity to be selected on
 * @internal
 */
export type Expandable<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT> = EntityApi<
    EntityBase,
    DeSerializersT
  >
> = ODataVersionOf<EntityT> extends 'v2'
  ? never
  :
      | OneToManyLink<EntityT, DeSerializersT, LinkedEntityApiT>
      | OneToOneLink<EntityT, DeSerializersT, LinkedEntityApiT>
      | AllFields<EntityT>;
