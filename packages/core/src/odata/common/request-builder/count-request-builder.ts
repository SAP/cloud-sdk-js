/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../../common';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination-service-types';
import { ODataCountRequestConfig } from '../request/odata-count-request-config';
import { GetAllRequestBuilderV2 } from '../../v2/request-builder';
import { GetAllRequestBuilderV4 } from '../../v4/request-builder';

/**
 * Create an OData request to count entities based on the configuration of the request.
 * A `CountRequestBuilder` allows only for execution of the request.
 * If you want to apply query parameters like filter, skip or top do it on the [[GetAllRequestBuilder]] the count is created from.
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export class CountRequestBuilder<
  EntityT extends EntityBase
> extends MethodRequestBuilderBase<ODataCountRequestConfig<EntityT>> {
  /**
   * Creates an instance of CountRequestBuilder.
   *
   * @param _entityConstructor - Constructor of the entity to create the request for
   */
  constructor(
    readonly getAllRequest:
      | GetAllRequestBuilderV2<EntityT>
      | GetAllRequestBuilderV4<EntityT>
  ) {
    super(new ODataCountRequestConfig(getAllRequest));
  }
  /**
   * Execute request.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the number of  entities
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<number> {
    return this.build(destination, options)
      .then(request => request.execute())
      .then(response => response.data);
  }
}
