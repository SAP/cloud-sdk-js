import {
  EntityIdentifiable,
  CreateRequestBuilderBase,
  entityDeserializer,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
import {
  DeSerializers,
  DefaultDeSerializers,
  edmToTs
} from '../de-serializers';
import { Entity } from '../entity';
import { entitySerializer } from '../entity-serializer';
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
    T extends DeSerializers = DefaultDeSerializers
  >
  extends CreateRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT>
{
  /**
   * Creates an instance of CreateRequestBuilder.
   * @param entityApi - Constructor of the entity to create the request for, the (de-)serializers, and the schema.
   * @param _entity - Entity to be created
   */
  constructor(
    { entityConstructor, deSerializers, schema }: EntityApi<EntityT, T>,
    readonly _entity: EntityT
  ) {
    super(
      entityConstructor,
      _entity,
      createODataUri(deSerializers),
      entitySerializer,
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
