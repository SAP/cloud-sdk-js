import {
  Constructable,
  entityDeserializer,
  EntityIdentifiable,
  GetByKeyRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DefaultDeSerializers, DeSerializers } from '../de-serializers';
import { Entity } from '../entity';
import { createODataUri } from '../uri-conversion/odata-uri';
import { edmToTs } from '../de-serializers/payload-value-converter';
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
    T extends DeSerializers = DefaultDeSerializers
  >
  extends GetByKeyRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT>
{
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetByKeyRequestBuilder.
   * @param _entityConstructor - Constructor of the entity to create the request for
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
   * @param deSerializers - TODO
   * @param schema - TODO
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    keys: Record<string, any>,
    deSerializers: T,
    schema: Record<string, any>
  ) {
    super(
      _entityConstructor,
      keys,
      createODataUri(deSerializers),
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
