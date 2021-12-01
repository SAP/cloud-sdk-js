import {
  Constructable,
  CreateRequestBuilderBase,
  EntityIdentifiable
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { entitySerializer } from '../entity-serializer';
import { entityDeserializer } from '../entity-deserializer';
import { DeSerializers } from '../de-serializers';
import { responseDataAccessor } from './response-data-accessor';
/**
 * Create OData request to create an entity.
 * @typeparam EntityT - Type of the entity to be created
 */
export class CreateRequestBuilder<
    EntityT extends Entity,
    DeSerializersT extends DeSerializers
  >
  extends CreateRequestBuilderBase<EntityT, DeSerializersT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  /**
   * Creates an instance of CreateRequestBuilder.
   * @param _entityConstructor - Constructor type of the entity to be created
   * @param _entity - Entity to be created
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT
  ) {
    super(
      _entityConstructor,
      _entity,
      createODataUri(),
      entitySerializer,
      entityDeserializer,
      responseDataAccessor
    );
  }
}
