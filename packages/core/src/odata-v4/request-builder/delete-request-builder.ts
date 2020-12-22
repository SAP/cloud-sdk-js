import {
  Constructable,
  DeleteRequestBuilder,
  EntityIdentifiable,
  FieldType
} from '../../odata-common';
import { EntityV4 } from '../entity';
import { oDataUriV4 } from '../uri-conversion';
/**
 * Create OData query to delete an entity.
 *
 * @typeparam EntityT - Type of the entity to be deleted
 */
export class DeleteRequestBuilderV4<EntityT extends EntityV4>
  extends DeleteRequestBuilder<EntityT>
  implements EntityIdentifiable<EntityT> {
  readonly _entityConstructor: Constructable<EntityT>;
  readonly _entity: EntityT;

  /**
   * Creates an instance of DeleteRequestBuilder. If the entity is passed, version identifier will also be added.
   *
   * @param entityConstructor - Constructor type of the entity to be deleted
   * @param keysOrEntity - Entity or Key-value pairs of key properties for the given entity
   */
  constructor(
    entityConstructor: Constructable<EntityT>,
    keysOrEntity: Record<string, FieldType> | EntityV4
  ) {
    super(entityConstructor, oDataUriV4, keysOrEntity);
  }

  /**
   * Add ETag version identifier in the delete request header.
   *
   * @param etag - The version identifier of the entity
   * @returns The builder itself, to facilitate method chaining
   */
  setVersionIdentifier(etag: string): this {
    if (etag) {
      this.requestConfig.addCustomHeaders({ 'if-match': etag });
    }
    return this;
  }
}
