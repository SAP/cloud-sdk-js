import { identity } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationFetchOptions
} from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import {
  EntityIdentifiable,
  EntityApi,
  UpdateRequestBuilderBase,
  entitySerializer
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { extractODataEtag } from '../extract-odata-etag';
import { DefaultDeSerializers, DeSerializers } from '../de-serializers';
import { createODataUri } from '../uri-conversion';

export class UpdateRequestBuilder<
    EntityT extends Entity,
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >
  extends UpdateRequestBuilderBase<EntityT, DeSerializersT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  /**
   * Creates an instance of UpdateRequestBuilder.
   * @param entityApi - Entity API for building and executing the request.
   * @param _entity - Entity to be updated.
   */
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    readonly _entity: EntityT
  ) {
    super(
      entityApi,
      _entity,
      createODataUri(entityApi.deSerializers),
      entitySerializer(entityApi.deSerializers),
      extractODataEtag,
      identity
    );
  }

  /**
   * Executes the query.
   * @param destination - Destination or DestinationFetchOptions to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the entity once it was updated
   */
  async execute(
    destination: Destination | DestinationFetchOptions
  ): Promise<EntityT> {
    if (this.isEmptyObject(this.requestConfig.payload)) {
      return this._entity;
    }

    const request = await this.build(destination);
    return super.executeRequest(request);
  }

  /**
   * Execute request and return an [[HttpResponse]].
   * @param destination - Destination or DestinationFetchOptions to execute the request against
   * @returns A promise resolving to an [[HttpResponse]].
   */
  async executeRaw(
    destination: Destination | DestinationFetchOptions
  ): Promise<HttpResponse> {
    if (this.isEmptyObject(this.requestConfig.payload)) {
      throw new Error('Cannot execute an update request with empty payload.');
    }

    const request = await this.build(destination);
    return super.executeRequestRaw(request);
  }
}
