/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityV4 } from '../entity';
import { deserializeEntityV4 } from '../entity-deserializer';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination-service-types';
import {
  EntityIdentifiable,
  Constructable,
  Selectable,
  Filterable,
  and,
  Orderable,
  FilterList
} from '../../common';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataGetAllRequestConfig } from '../../common/request/odata-get-all-request-config';
import { Expandable } from '../../common/expandable';
import { oDataUriV4 } from '../uri-conversion';
import { OneToManyLink } from '../../common/selectable/one-to-many-link';
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
  extends MethodRequestBuilderBase<ODataGetAllRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param _entityConstructor - Constructor of the entity to create the request for
   */
  constructor(readonly _entityConstructor: Constructable<EntityT>) {
    super(new ODataGetAllRequestConfig(_entityConstructor, oDataUriV4));
  }
  /**
   * Restrict the response to the given selection of properties in the request.
   *
   * @param selects - Fields to select in the request
   * @returns The request builder itself, to facilitate method chaining
   */
  select(...selects: Selectable<EntityT>[]): this {
    this.requestConfig.selects = selects;
    return this;
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
   * Add order-by statements to the request.
   *
   * @param orderBy - OrderBy statements to order the response by
   * @returns The request builder itself, to facilitate method chaining
   */
  orderBy(...orderBy: Orderable<EntityT>[]): this {
    this.requestConfig.orderBy = orderBy;
    return this;
  }

  /**
   * Limit number of returned entities.
   *
   * @param top - Maximum number of entities to return in the response. Can be less, if less entities match the request
   * @returns The request builder itself, to facilitate method chaining
   */
  top(top: number): this {
    this.requestConfig.top = top;
    return this;
  }

  /**
   * Skip number of entities.
   *
   * @param skip - Number of matching entities to skip. Useful for paging
   * @returns The request builder itself, to facilitate method chaining
   */
  skip(skip: number): this {
    this.requestConfig.skip = skip;
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
