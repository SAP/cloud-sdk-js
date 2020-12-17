import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '../../connectivity/scp-cf';
import { Constructable, EntityBase, EntityIdentifiable } from '../entity';
import { ODataDeleteRequestConfig } from '../request';
import type { ODataUri } from '../uri-conversion';
import type { FieldType } from '../selectable';
import { MethodRequestBuilderBase } from './request-builder-base';
/**
 * Abstract class to delete an entity holding the shared parts between OData v2 and v4
 *
 * @typeparam EntityT - Type of the entity to be deleted
 */
export abstract class DeleteRequestBuilderBase<EntityT extends EntityBase>
  extends MethodRequestBuilderBase<ODataDeleteRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  readonly _entityConstructor: Constructable<EntityT>;
  readonly _entity: EntityT;

  /**
   * Creates an instance of DeleteRequestBuilder. If the entity is passed, version identifier will also be added.
   *
   * @param entityConstructor - Constructor type of the entity to be deleted
   * @param oDataUri - ODataUri conversion interface at runtime either v2 or v4
   * @param keysOrEntity - Entity or Key-value pairs of key properties for the given entity
   */
  constructor(
    entityConstructor: Constructable<EntityT>,
    oDataUri: ODataUri,
    keysOrEntity: Record<string, FieldType> | EntityBase
  ) {
    super(new ODataDeleteRequestConfig(entityConstructor, oDataUri));
    this._entityConstructor = entityConstructor;
    if (keysOrEntity instanceof EntityBase) {
      this.requestConfig.keys = oDataUri.getEntityKeys(
        keysOrEntity,
        entityConstructor
      );
      this.setVersionIdentifier(keysOrEntity.versionIdentifier);
    } else {
      this.requestConfig.keys = keysOrEntity;
    }
  }

  /**
   * Instructs the request to force an overwrite of the entity by sending an 'If-Match: *' header instead of sending the ETag version identifier.
   *
   * @returns this The request itself to ease chaining while executing the request
   */
  ignoreVersionIdentifier(): this {
    this.requestConfig.versionIdentifierIgnored = true;
    return this;
  }

  /**
   * Execute query.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving once the entity was deleted
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<void> {
    return (
      this.build(destination, options)
        .then(request => request.execute())
        // Transform response to void
        .then(() => Promise.resolve())
        .catch(error => {
          throw new ErrorWithCause('OData delete request failed!', error);
        })
    );
  }

  abstract setVersionIdentifier(eTag: string): this;
}
