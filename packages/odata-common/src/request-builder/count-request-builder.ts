import { DestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { EntityBase } from '../entity-base';
import { ODataCountRequestConfig } from '../request/odata-count-request-config';
import { DeSerializers } from '../de-serializers/de-serializers';
import { MethodRequestBuilder } from './request-builder-base';
import type { GetAllRequestBuilderBase } from './get-all-request-builder-base';

/**
 * Create an OData request to count entities based on the configuration of the request.
 * A `CountRequestBuilder` allows only for execution of the request.
 * If you want to apply query parameters like filter, skip or top do it on the {@link GetAllRequestBuilderBase | GetAllRequestBuilder} the count is created from.
 * @typeParam EntityT - Type of the entity to be requested
 */
export class CountRequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> extends MethodRequestBuilder<
  ODataCountRequestConfig<EntityT, DeSerializersT>
> {
  /**
   * Creates an instance of CountRequestBuilder.
   * @param getAllRequest - Get all request builder to count result for.
   */
  constructor(
    readonly getAllRequest: GetAllRequestBuilderBase<EntityT, DeSerializersT>
  ) {
    super(new ODataCountRequestConfig(getAllRequest));
  }
  /**
   * Execute request.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to the number of entities.
   */
  async execute(destination: DestinationOrFetchOptions): Promise<number> {
    return this.executeRaw(destination).then(response => {
      if (typeof response.data !== 'number') {
        throw new Error('Count request did not return a bare number.');
      }
      return response.data;
    });
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
}
