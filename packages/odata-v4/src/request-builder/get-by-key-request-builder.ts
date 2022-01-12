import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  EntityIdentifiable,
  Expandable,
  GetByKeyRequestBuilderBase,
  EntityApi,
  EntityBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers, entityDeserializer } from '../de-serializers';
import { Entity } from '../entity';
import { createODataUri } from '../uri-conversion';
import { responseDataAccessor } from './response-data-accessor';

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
   * @param entityApi - Entity API for building and executing the request.
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
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
    this.requestConfig.expands = variadicArgumentToArray(first, rest);
    return this;
  }
}
