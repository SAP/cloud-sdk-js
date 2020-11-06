import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityIdentifiable,
  Filterable,
  GetAllRequestBuilderBase,
  and,
  ODataGetAllRequestConfig
} from '../../odata-common';
import { EntityV2 } from '../entity';
import { deserializeEntityV2 } from '../entity-deserializer';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationOptions
} from '../../connectivity/scp-cf';
import { oDataUriV2 } from '../uri-conversion';
import { getCollectionResult } from './response-data-accessor';

/**
 * Create an OData request to get multiple entities based on the configuration of the request.
 * A `GetAllRequestBuilder` allows restricting the response in multiple dimensions.
 * The properties available in the response can be restricted by creating a [[GetAllRequestBuilderV2.select selection]], where no selection is equal to selecting all fields.
 * Note that navigational properties are automatically expanded if they included in a  select.
 * The entities can be [[GetAllRequestBuilderV2.filter filtered]] and [[GetAllRequestBuilderV2.select ordered]] based on the values of their properties.
 * The number of entities in the result can be [[GetAllRequestBuilderV2.top limited]] and results can be [[GetAllRequestBuilderV2.skip skipped]] for paging purposes.
 * If none of the above mentioned are configured all entities of the given type will be requested.
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetAllRequestBuilderV2<EntityT extends EntityV2>
  extends GetAllRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT> {
  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param entityConstructor - Constructor of the entity to create the request for
   */
  constructor(entityConstructor: Constructable<EntityT>) {
    super(
      entityConstructor,
      new ODataGetAllRequestConfig(entityConstructor, oDataUriV2)
    );
  }

  /**
   * Add filter statements to the request.
   *
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(expressions: Filterable<EntityT>[]): this;
  filter(...expressions: Filterable<EntityT>[]): this;
  filter(
    first: undefined | Filterable<EntityT> | Filterable<EntityT>[],
    ...rest: Filterable<EntityT>[]
  ): this {
    this.requestConfig.filter = and(variadicArgumentToArray(first, rest));
    return this;
  }

  /**
   * Execute request.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the requested entities
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<EntityT[]> {
    return this.build(destination, options)
      .then(request => request.execute())
      .then(response =>
        getCollectionResult(response.data).map(json =>
          deserializeEntityV2(json, this._entityConstructor, response.headers)
        )
      );
  }
}

export { GetAllRequestBuilderV2 as GetAllRequestBuilder };
