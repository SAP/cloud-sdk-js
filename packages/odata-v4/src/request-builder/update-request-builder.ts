import { identity } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationFetchOptions
} from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import {
  Constructable,
  UpdateRequestBuilderBase
  // eslint-disable-next-line import/no-internal-modules
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { entitySerializer } from '../entity-serializer';
import { extractODataEtag } from '../extract-odata-etag';
import { oDataUri } from '../uri-conversion/odata-uri';

export class UpdateRequestBuilder<
  EntityT extends Entity
> extends UpdateRequestBuilderBase<EntityT> {
  /**
   * Creates an instance of UpdateRequestBuilder.
   * @param _entityConstructor - Constructor type of the entity to be updated
   * @param _entity - Entity to be updated
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT
  ) {
    super(
      _entityConstructor,
      _entity,
      oDataUri,
      entitySerializer,
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
