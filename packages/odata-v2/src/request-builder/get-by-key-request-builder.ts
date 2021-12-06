import {
  EntityApi,
  entityDeserializer,
  EntityIdentifiable,
  GetByKeyRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { Entity } from '../entity';
import { createODataUriV2 } from '../uri-conversion';
import { extractODataEtag } from '../extract-odata-etag';
import {
  responseDataAccessor,
  getLinkedCollectionResult
} from './response-data-accessor';

/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetAllRequestBuilder.select selection]], where no selection is equal to selecting all fields.
 * Note that navigational properties are automatically expanded if they included in a  select.
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetByKeyRequestBuilder<
    EntityT extends Entity,
    DeSerializersT extends DeSerializers
  >
  extends GetByKeyRequestBuilderBase<EntityT, DeSerializersT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetByKeyRequestBuilder.
   * @param entityApi - Constructor of the entity to create the request for, the (de-)serializers, and the schema.
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
   */
  constructor(
    {
      entityConstructor,
      deSerializers,
      schema
    }: EntityApi<EntityT, DeSerializersT>,
    keys: Record<string, any>
  ) {
    super(
      entityConstructor,
      schema,
      keys,
      createODataUriV2(deSerializers),
      entityDeserializer(
        deSerializers,
        schema,
        extractODataEtag,
        getLinkedCollectionResult
      ),
      responseDataAccessor
    );
  }
}
