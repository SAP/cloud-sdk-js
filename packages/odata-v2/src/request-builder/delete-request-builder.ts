import {
  Constructable,
  DeleteRequestBuilderBase,
  FieldType
  // eslint-disable-next-line import/no-internal-modules
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { oDataUri } from '../uri-conversion/odata-uri';
/**
 * Create OData query to delete an entity.
 * @typeparam EntityT - Type of the entity to be deleted
 */
export class DeleteRequestBuilder<
  EntityT extends Entity
> extends DeleteRequestBuilderBase<EntityT> {
  /**
   * Creates an instance of DeleteRequestBuilder. If the entity is passed, version identifier will also be added.
   * @param entityConstructor - Constructor type of the entity to be deleted
   * @param keysOrEntity - Entity or Key-value pairs of key properties for the given entity
   */
  constructor(
    entityConstructor: Constructable<EntityT>,
    keysOrEntity: Record<string, FieldType> | Entity
  ) {
    super(entityConstructor, oDataUri, keysOrEntity);
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
