import { EntityV4 } from '../entity';
import { deserializeEntityV4 } from '../entity-deserializer';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination/destination-service-types';
import {
  EntityIdentifiable,
  Constructable,
  Filterable,
  and,
  FilterList
} from '../../common';
import { ODataGetAllRequestConfig } from '../../common/request/odata-get-all-request-config';
import { Expandable } from '../../common/expandable';
import { oDataUriV4 } from '../uri-conversion';
import { OneToManyLink } from '../../common/selectable/one-to-many-link';
import { GetAllRequestBuilderBase } from '../../common/request-builder/get-all-request-builder-base';
import { getCollectionResult } from './response-data-accessor';

/**
 * Create an OData request to get multiple entities based on the configuration of the request.
 * A `GetAllRequestBuilder` allows restricting the response in multiple dimensions.
 * The properties available in the response can be restricted by creating a [[GetAllRequestBuilderV2.select selection]], where no selection is equal to selecting all fields of the entity.
 * Navigational properties need to expanded explicitly by [[GetAllRequestBuilderV4.expand]].
 * The entities can be [[GetAllRequestBuilderV2.filter filtered]] and [[GetAllRequestBuilderV2.select ordered]] based on the values of their properties.
 * The number of entities in the result can be [[GetAllRequestBuilderV2.top limited]] and results can be [[GetAllRequestBuilderV2.skip skipped]] for paging purposes.
 * If none of the above mentioned are configured all entities of the given type will be requested.
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetAllRequestBuilderV4<EntityT extends EntityV4>
  extends GetAllRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT> {
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param entityConstructor - Constructor of the entity to create the request for
   */
  constructor(entityConstructor: Constructable<EntityT>) {
    super(
      entityConstructor,
      new ODataGetAllRequestConfig(entityConstructor, oDataUriV4)
    );
  }

  expand(...expands: Expandable<EntityT>[]): this {
    this.requestConfig.expands = expands;
    return this;
  }

  // TODO: Reconsider the OneToManyLink here
  /**
   * Add filter statements to the request.
   *
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(
    ...expressions: (Filterable<EntityT> | OneToManyLink<EntityT, any>)[]
  ): this {
    this.requestConfig.filter = toFilterList(expressions);
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
          deserializeEntityV4(json, this._entityConstructor, response.headers)
        )
      );
  }
}

// TODO: remove this code duplication
function toFilterList<EntityT extends EntityV4, LinkedEntityT extends EntityV4>(
  filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): FilterList<EntityT> {
  return and(
    ...filters.map(f => (f instanceof OneToManyLink ? f._filters : f))
  );
}
