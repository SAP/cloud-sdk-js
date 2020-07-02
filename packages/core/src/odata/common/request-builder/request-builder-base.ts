/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { useOrFetchDestination } from '../../../scp-cf/destination-accessor';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationRetrievalOptions,
  isDestinationNameAndJwt
} from '../../../scp-cf/destination-service-types';
import { ODataRequest } from '../request/odata-request';
import { ODataRequestConfig } from '../request/odata-request-config';

/**
 * Base class for all request builders.
 *
 * @typeparam EntityT - Type of the entity to create a request for
 */
export abstract class MethodRequestBuilderBase<
  RequestConfigT extends ODataRequestConfig
> {
  /**
   * Creates an instance of MethodRequestBuilderBase.
   *
   * @param requestConfig - Request configuration to initialize with
   */
  constructor(public requestConfig: RequestConfigT) {}

  /**
   * Create the url based on configuration of the given builder.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations.
   * @returns Promise resolving to the url for the request
   */
  async url(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationRetrievalOptions
  ): Promise<string> {
    const request = await this.build(destination, options);
    return request.url();
  }

  /**
   * Create the relative url based on configuration of the given builder.
   *
   * @returns The relative url for the request
   */
  relativeUrl(): string {
    return new ODataRequest(this.requestConfig).relativeUrl();
  }

  /**
   * Add custom headers to the request.
   *
   * @param headers - Key-value pairs denoting additional custom headers
   * @returns The request builder itself, to facilitate method chaining
   */
  withCustomHeaders(headers: MapType<string>): this {
    this.requestConfig.addCustomHeaders(headers);
    return this;
  }

  /**
   * Add custom query parameters to the request.
   *
   * @param queryParameters - Key-value pairs denoting additional custom query parameters to be set in the request
   * @returns The request builder itself, to facilitate method chaining
   */
  withCustomQueryParameters(queryParameters: MapType<string>): this {
    this.requestConfig.addCustomQueryParameters(queryParameters);
    return this;
  }

  /**
   * Replace the default service path with the given custom path.
   * In case of the S/4HANA apis the servicePath defaults to '/sap/opu/odata/sap/<SERVICE_NAME>' and can be overwritten here.
   *
   * @param servicePath - Path to override the default with
   * @returns The request builder itself, to facilitate method chaining
   */
  withCustomServicePath(servicePath: string): this {
    this.requestConfig.customServicePath = servicePath;
    return this;
  }

  /**
   * Build an ODataRequest that holds essential configuration for the service request and executes it.
   *
   * @param destination - Targeted destination on which the request is performed.
   * @param options - Options to employ when fetching destinations.
   * @returns The OData request executor including the destination configuration.
   */
  build(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationRetrievalOptions
  ): Promise<ODataRequest<RequestConfigT>> {
    return useOrFetchDestination(destination, options)
      .then(dest => {
        if (!dest) {
          throw Error(noDestinationErrorMessage(destination));
        }
        return new ODataRequest(this.requestConfig, dest);
      })
      .catch(error =>
        Promise.reject(
          errorWithCause(noDestinationErrorMessage(destination), error)
        )
      );
  }
}

function noDestinationErrorMessage(
  destination: Destination | DestinationNameAndJwt
): string {
  return isDestinationNameAndJwt(destination)
    ? `Could not find a destination with name "${destination.destinationName}"! Unable to execute request.`
    : 'Could not find a destination to execute request against and no destination name has been provided (this should never happen)!';
}

