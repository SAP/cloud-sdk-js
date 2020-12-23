import {
  Constructable,
  DeleteRequestBuilder as DeleteRequestBuilderBase,
  FieldType
} from '../../odata-common';
import { EntityV2 } from '../entity';
import { oDataUriV2 } from '../uri-conversion';
/**
 * Create OData query to delete an entity.
 *
 * @typeparam EntityT - Type of the entity to be deleted
 */
export class DeleteRequestBuilderV2<
  EntityT extends EntityV2
> extends DeleteRequestBuilderBase<EntityT> {
  /**
   * Creates an instance of DeleteRequestBuilder. If the entity is passed, version identifier will also be added.
   *
   * @param entityConstructor - Constructor type of the entity to be deleted
   * @param keysOrEntity - Entity or Key-value pairs of key properties for the given entity
   */
  constructor(
    entityConstructor: Constructable<EntityT>,
    keysOrEntity: Record<string, FieldType> | EntityV2
  ) {
    super(entityConstructor, oDataUriV2, keysOrEntity);
  }

  /**
   * Add an eTag version identifier in the delete request header.
   *
   * @param eTag - The version identifier of the entity
   * @returns The builder itself, to facilitate method chaining
   */
  setVersionIdentifier(eTag: string): this {
    this.requestConfig.eTag = eTag;
    return this;
  }
}

export { DeleteRequestBuilderV2 as DeleteRequestBuilder };
