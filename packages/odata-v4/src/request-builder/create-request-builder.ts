import {
  EntityApi,
  CreateRequestBuilderBase,
  entityDeserializer,
  entitySerializer,
  EntityIdentifiable
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers, edmToTs, tsToEdm } from '../de-serializers';
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
   * @param _entityConstructor - Constructor type of the entity to be created
   * @param _entity - Entity to be created
   */
  constructor(
    {
      entityConstructor,
      deSerializers,
      schema
    }: EntityApi<EntityT, DeSerializersT>,
    readonly _entity: EntityT
  ) {
    super(
      entityConstructor,
      _entity,
      createODataUri(deSerializers),
      entitySerializer(tsToEdm),
      entityDeserializer(
        schema,
        edmToTs,
        extractODataEtag,
        getLinkedCollectionResult,
        deSerializers
      ),
      responseDataAccessor
    );
  }
}
