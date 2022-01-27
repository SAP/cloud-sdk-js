import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { DestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { EntityApi, EntityBase, EntityIdentifiable } from '../entity-base';
import { ODataUri } from '../uri-conversion';
import { ODataDeleteRequestConfig } from '../request';
import { DeSerializers } from '../de-serializers';
import { MethodRequestBuilder } from './request-builder-base';
/**
 * Abstract class to delete an entity holding the shared parts between OData v2 and v4
 * @typeparam EntityT - Type of the entity to be deleted
 * @internal
 */
export abstract class DeleteRequestBuilderBase<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >
  extends MethodRequestBuilder<
    ODataDeleteRequestConfig<EntityT, DeSerializersT>
  >
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  readonly _entity: EntityT;
  readonly _deSerializers: DeSerializersT;

  /**
   * Creates an instance of DeleteRequestBuilder. If the entity is passed, version identifier will also be added.
   * @param _entityApi - Entity API for building and executing the request.
   * @param oDataUri - URI conversion functions.
   * @param keysOrEntity - Entity or key-value pairs of key properties for the given entity.
   */
  constructor(
    readonly _entityApi: EntityApi<EntityT, DeSerializersT>,
    oDataUri: ODataUri<DeSerializersT>,
    keysOrEntity: Record<string, any> | EntityBase
  ) {
    super(new ODataDeleteRequestConfig(_entityApi, oDataUri));
    if (keysOrEntity instanceof EntityBase) {
      this.requestConfig.keys = oDataUri.getEntityKeys(
        keysOrEntity,
        _entityApi
      );
      this.setVersionIdentifier(keysOrEntity.versionIdentifier);
    } else {
      this.requestConfig.keys = keysOrEntity;
    }
  }

  /**
   * Instructs the request to force an overwrite of the entity by sending an 'If-Match: *' header instead of sending the ETag version identifier.
   * @returns this The request itself to ease chaining while executing the request
   */
  ignoreVersionIdentifier(): this {
    this.requestConfig.versionIdentifierIgnored = true;
    return this;
  }

  /**
   * Execute query.
   * @param destination - Destination or DestinationFetchOptions to execute the request against
   * @returns A promise resolving once the entity was deleted
   */
  async execute(destination: DestinationOrFetchOptions): Promise<void> {
    return (
      this.executeRaw(destination)
        // Transform response to void
        .then(() => Promise.resolve())
        .catch(error => {
          throw new ErrorWithCause('OData delete request failed!', error);
        })
    );
  }

  /**
   * Execute request and return an [[HttpResponse]].
   * @param destination - Destination or DestinationFetchOptions to execute the request against
   * @returns A promise resolving to an [[HttpResponse]].
   */
  async executeRaw(
    destination: DestinationOrFetchOptions
  ): Promise<HttpResponse> {
    return this.build(destination).then(request => request.execute());
  }

  abstract setVersionIdentifier(eTag: string): this;
}
