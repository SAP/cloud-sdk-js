import { identity } from '@sap-cloud-sdk/util';
import { Constructable, UpdateRequestBuilder } from '../../odata-common';
import { EntityV4 } from '../entity';
import { entitySerializerV4 } from '../entity-serializer';
import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '../../connectivity/scp-cf';
import { oDataUriV4 } from '../uri-conversion';
import { extractODataEtagV4 } from '../extract-odata-etag';

/**
 * Create OData query to update an entity.
 *
 * @typeparam EntityT - Type of the entity to be updated
 */
export class UpdateRequestBuilderV4<
  EntityT extends EntityV4
> extends UpdateRequestBuilder<EntityT> {
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
      oDataUriV4,
      entitySerializerV4,
      extractODataEtagV4,
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
}
