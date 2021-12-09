import {
  EntityIdentifiable,
  CreateRequestBuilderBase,
  entityDeserializer,
  entitySerializer,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { Entity } from '../entity';
import { createODataUri } from '../uri-conversion';
import { extractODataEtag } from '../extract-odata-etag';
import {
  responseDataAccessor,
  getLinkedCollectionResult
} from './response-data-accessor';

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
   * @param entityApi - Constructor of the entity to create the request for, the (de-)serializers, and the schema.
   * @param _entity - Entity to be created
   */
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    readonly _entity: EntityT
  ) {
    super(
      entityApi,
      _entity,
      createODataUri(entityApi.deSerializers),
      entitySerializer(entityApi.deSerializers),
      entityDeserializer(
        entityApi.deSerializers,
        extractODataEtag,
        getLinkedCollectionResult
      ),
      responseDataAccessor
    );
  }
}
