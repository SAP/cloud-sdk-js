import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  entityDeserializer,
  EntityIdentifiable,
  Expandable,
  GetByKeyRequestBuilderBase,
  FieldType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { Entity } from '../entity';
import { createODataUriV4 } from '../uri-conversion';
import { extractODataEtag } from '../extract-odata-etag';
import {
  responseDataAccessor,
  getLinkedCollectionResult
} from './response-data-accessor';

/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetByKeyRequestBuilderV4.select selection]], where no selection is equal to selecting all fields of the entity.
 * Navigational properties need to expanded explicitly by [[GetAllRequestBuilderV4.expand]].
 * where no selection is equal to selecting all fields.
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
   * @param _entityConstructor - Constructor of the entity to create the request for
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
   */
  constructor(
    {
      entityConstructor,
      deSerializers,
      schema
    }: EntityApi<EntityT, DeSerializersT>,
    keys: Record<string, FieldType>
  ) {
    super(
      entityConstructor,
      schema,
      keys,
      createODataUriV4(deSerializers),
      entityDeserializer(
        deSerializers,
        schema,
        extractODataEtag,
        getLinkedCollectionResult
      ),
      responseDataAccessor
    );
  }

  expand(expands: Expandable<EntityT, DeSerializersT>[]): this;
  expand(...expands: Expandable<EntityT, DeSerializersT>[]): this;
  expand(
    first:
      | undefined
      | Expandable<EntityT, DeSerializersT>
      | Expandable<EntityT, DeSerializersT>[],
    ...rest: Expandable<EntityT, DeSerializersT>[]
  ): this {
    this.requestConfig.expands = variadicArgumentToArray(first, rest);
    return this;
  }
}
