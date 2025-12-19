import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import { GetByKeyRequestBuilderBase } from '@sap-cloud-sdk/odata-common/internal';
import { entityDeserializer } from '../de-serializers';
import { createODataUri } from '../uri-conversion';
import { responseDataAccessor } from './response-data-accessor';
import type { Entity } from '../entity';
import type { DefaultDeSerializers, DeSerializers } from '../de-serializers';
import type {
  EntityIdentifiable,
  Expandable,
  EntityApi,
  EntityBase
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a {@link GetByKeyRequestBuilder.select | selection}, where no selection is equal to selecting all fields of the entity.
 * Navigational properties need to be expanded explicitly by {@link GetAllRequestBuilder.expand}.
 * Where no selection is equal to selecting all fields.
 * @typeParam EntityT - Type of the entity to be requested.
 */
export class GetByKeyRequestBuilder<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>
  extends GetByKeyRequestBuilderBase<EntityT, DeSerializersT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  /**
   * Creates an instance of GetByKeyRequestBuilder.
   * @param entityApi - Entity API for building and executing the request.
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value.
   */
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    keys: Record<string, any>
  ) {
    super(
      entityApi,
      keys,
      createODataUri(entityApi.deSerializers),
      entityDeserializer(entityApi.deSerializers),
      responseDataAccessor
    );
  }

  expand(
    expands: Expandable<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this;
  expand(
    ...expands: Expandable<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this;
  expand(
    first:
      | undefined
      | Expandable<
          EntityT,
          DeSerializersT,
          EntityApi<EntityBase, DeSerializersT>
        >
      | Expandable<
          EntityT,
          DeSerializersT,
          EntityApi<EntityBase, DeSerializersT>
        >[],
    ...rest: Expandable<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this {
    this.requestConfig.expands = transformVariadicArgumentToArray(first, rest);
    return this;
  }
}
