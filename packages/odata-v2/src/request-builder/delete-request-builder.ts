import {
  DeleteRequestBuilderBase,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { Entity } from '../entity';
import { createODataUri } from '../uri-conversion';

/**
 * Create OData query to delete an entity.
 * @typeparam EntityT - Type of the entity to be deleted
 */
export class DeleteRequestBuilder<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers
> extends DeleteRequestBuilderBase<EntityT, DeSerializersT> {
  /**
   * Creates an instance of DeleteRequestBuilder. If the entity is passed, version identifier will also be added.
   * @param entityConstructor - Constructor type of the entity to be deleted
   * @param keysOrEntity - Entity or Key-value pairs of key properties for the given entity
   * @param deSerializers - (De-)serializers used for transformation.
   */
  constructor(
    { entityConstructor, deSerializers }: EntityApi<EntityT, DeSerializersT>,
    keysOrEntity: Record<string, any> | Entity
  ) {
    super(entityConstructor, createODataUri(deSerializers), keysOrEntity);
  }

  /**
   * Add an eTag version identifier in the delete request header.
   * @param eTag - The version identifier of the entity
   * @returns The builder itself, to facilitate method chaining
   */
  setVersionIdentifier(eTag: string): this {
    this.requestConfig.eTag = eTag;
    return this;
  }
}
