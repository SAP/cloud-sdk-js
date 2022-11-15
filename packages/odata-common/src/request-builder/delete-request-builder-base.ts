import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { DestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { v4 as uuid } from 'uuid';
import { EntityBase, EntityIdentifiable } from '../entity-base';
import { ODataUri } from '../uri-conversion';
import { ODataDeleteRequestConfig } from '../request/odata-delete-request-config';
import { DeSerializers } from '../de-serializers/de-serializers';
import { EntityApi } from '../entity-api';
import {
  BatchReference,
  WithBatchReference
} from '../request/odata-request-traits';
import { MethodRequestBuilder } from './request-builder-base';
/**
 * Abstract class to delete an entity holding the shared parts between OData v2 and v4.
 * @typeParam EntityT - Type of the entity to be deleted
 */
export abstract class DeleteRequestBuilderBase<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >
  extends MethodRequestBuilder<
    ODataDeleteRequestConfig<EntityT, DeSerializersT>
  >
  implements EntityIdentifiable<EntityT, DeSerializersT>, WithBatchReference
{
  readonly _entity: EntityT;
  readonly _deSerializers: DeSerializersT;
  private _batchReference: BatchReference;

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
   * Gets identifier for the batch request.
   * @returns Batch request identifier.
   */
  getBatchReference(): BatchReference {
    if (!this._batchReference) {
      this.setBatchId(uuid());
    }
    return this._batchReference;
  }

  /**
   * Sets user-defined identifier for the batch reference.
   * @param id - User-defined batch reuest identifier.
   */
  setBatchId(id: string): void {
    this._batchReference = { id };
  }

  /**
   * Instructs the request to force an overwrite of the entity by sending an 'If-Match: *' header instead of sending the ETag version identifier.
   * @returns The request itself to ease chaining while executing the request.
   */
  ignoreVersionIdentifier(): this {
    this.requestConfig.versionIdentifierIgnored = true;
    return this;
  }

  /**
   * Execute query.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving once the entity was deleted.
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
   * Execute request and return an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   */
  async executeRaw(
    destination: DestinationOrFetchOptions
  ): Promise<HttpResponse> {
    return this.build(destination).then(request => request.execute());
  }

  abstract setVersionIdentifier(eTag: string): this;
}
