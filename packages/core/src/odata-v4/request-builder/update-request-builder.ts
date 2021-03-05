import { identity } from '@sap-cloud-sdk/util';
import {
  Constructable,
  UpdateRequestBuilder as UpdateRequestBuilderBase
} from '../../odata-common';
import { Entity } from '../entity';
import { entitySerializer } from '../entity-serializer';
import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '../../connectivity/scp-cf';
import { oDataUri } from '../uri-conversion';
import { extractODataEtag } from '../extract-odata-etag';
import { HttpRequestAndResponse } from '../../http-client';

/**
 * Create OData query to update an entity.
 *
 * @typeparam EntityT - Type of the entity to be updated
 */
export class UpdateRequestBuilder<
  EntityT extends Entity
> extends UpdateRequestBuilderBase<EntityT> {
  /**
   * Creates an instance of UpdateRequestBuilder.
   *
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
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the entity once it was updated
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<EntityT> {
    if (this.isEmptyObject(this.requestConfig.payload)) {
      return this._entity;
    }

    const request = await this.build(destination, options);
    return super.executeRequest(request);
  }

  /**
   * Execute request and return the request and the raw response.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to an [[HttpRequestAndResponse]].
   */
  async executeRaw(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<HttpRequestAndResponse> {
    if (this.isEmptyObject(this.requestConfig.payload)) {
      throw new Error('Cannot execute an update request with empty payload.');
    }

    const request = await this.build(destination, options);
    return super.executeRequestRaw(request);
  }
}

export { UpdateRequestBuilder as UpdateRequestBuilderV4 };
