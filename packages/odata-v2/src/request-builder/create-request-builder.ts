import {
  Constructable,
  EntityIdentifiable,
  CreateRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializationMiddlewareBASE } from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';
import { DeSerializationMiddleware } from '../de-serializers/de-serialization-middleware';
import { CustomDeSerializer } from '../de-serializers/get-de-serializers';
import { Entity } from '../entity';
import { entityDeserializer } from '../entity-deserializer';
import { entitySerializer } from '../entity-serializer';
import { createODataUri } from '../uri-conversion/odata-uri';
import { responseDataAccessor } from './response-data-accessor';
/**
 * Create OData request to create an entity.
 * @typeparam EntityT - Type of the entity to be created
 */
export class CreateRequestBuilder<
    EntityT extends Entity,
    T extends DeSerializationMiddlewareBASE = DeSerializationMiddleware
  >
  extends CreateRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT>
{
  /**
   * Creates an instance of CreateRequestBuilder.
   * @param _entityConstructor - Constructor type of the entity to be created
   * @param _entity - Entity to be created
   * @param deSerializers - TODO
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT,
    deSerializers: CustomDeSerializer<T>
  ) {
    super(
      _entityConstructor,
      _entity,
      createODataUri(deSerializers),
      entitySerializer,
      entityDeserializer,
      responseDataAccessor
    );
  }
}
