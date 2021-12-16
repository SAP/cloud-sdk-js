import {
  Constructable,
  DeleteRequestBuilderBase,
  EntityApi,
  FieldType
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
  readonly _entityConstructor: Constructable<EntityT>;
  readonly _entity: EntityT;

  /**
   * Creates an instance of DeleteRequestBuilder. If the entity is passed, version identifier will also be added.
   * @param entityApi - EntityApi on which the delete is executed
   * @param keysOrEntity - Entity or Key-value pairs of key properties for the given entity
   */
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    keysOrEntity: Record<string, FieldType> | Entity
  ) {
    super(entityApi, createODataUri(entityApi.deSerializers), keysOrEntity);
  }

  /**
   * Add ETag version identifier in the delete request header.
   * @param etag - The version identifier of the entity.
   * @returns The builder itself, to facilitate method chaining.
   */
  setVersionIdentifier(etag: string): this {
    if (etag) {
      this.requestConfig.addCustomHeaders({ 'if-match': etag });
    }
    return this;
  }
}
