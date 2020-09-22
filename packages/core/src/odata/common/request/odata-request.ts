/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause, propertyExists } from '@sap-cloud-sdk/util';
import { Destination, sanitizeDestination } from '../../../scp-cf';
import {
  removeSlashes,
  removeTrailingSlashes
} from '../../../util/remove-slashes';
import { HttpResponse, executeHttpRequest } from '../../../http-client';
import {
  filterNullishValues,
  getHeader,
  replaceDuplicateKeys
} from '../../../header-builder';
// TODO: The buildCsrfHeaders import cannot be combined with the rest of the other headers due to circular dependencies
import { buildCsrfHeaders } from '../../../header-builder/csrf-token-header';
// TODO: The buildHeadersForDestination import cannot be combined with the rest of the other headers due to circular dependencies
import { buildHeadersForDestination } from '../../../header-builder/header-builder-for-destination';
import { ODataRequestConfig } from './odata-request-config';
import { isWithETag } from './odata-request-traits';

/**
 * OData request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataRequest<RequestConfigT extends ODataRequestConfig> {
  /**
   * Creates an instance of ODataRequest.
   *
   * @param config - Configuration of the request
   * @param _destination - Destination to setup the request against
   * @memberof ODataRequest
   */
  constructor(
    public config: RequestConfigT,
    private _destination?: Destination | undefined
  ) {}

  set destination(dest: Destination | undefined) {
    this._destination = dest && sanitizeDestination(dest);
  }

  get destination(): Destination | undefined {
    return this._destination;
  }

  /**
   * Constructs the url for the request at hand.
   *
   * @returns The url for the request
   */
  url(): string {
    return `${removeTrailingSlashes(this.resourceUrl())}${this.query()}`;
  }

  /**
   * Constructs the relative url for the batch request.
   *
   * @returns The relative url for the batch request
   */
  relativeUrl(): string {
    return `${removeTrailingSlashes(
      this.relativeResourceUrl()
    )}${this.query()}`;
  }

  /**
   * Specifies whether the destination needs a specific authentication or not.
   *
   * @returns A boolean value that specifies whether the destination needs authentication or not
   * @memberof ODataRequest
   */
  needsAuthentication(): boolean {
    return (
      !!this.destination &&
      this.destination.authentication !== 'NoAuthentication'
    );
  }

  /**
   * Returns the service URL for a given OData request.
   *
   * @returns The URL of the service the given entity belongs to
   */
  serviceUrl(): string {
    if (!this.destination) {
      throw Error('The destination is undefined.');
    }
    const systemUrl = this.destination.url;
    const servicePath =
      typeof this.config.customServicePath === 'undefined'
        ? this.config.defaultServicePath
        : this.config.customServicePath;
    return `${removeTrailingSlashes(systemUrl)}/${removeSlashes(servicePath)}`;
  }

  /**
   * Returns the relative service URL for a given OData request.
   *
   * @returns The relative URL of the service the given entity belongs to
   */
  relativeServiceUrl(): string {
    const servicePath =
      typeof this.config.customServicePath === 'undefined'
        ? this.config.defaultServicePath
        : this.config.customServicePath;
    return `${removeSlashes(servicePath)}`;
  }

  /**
   * Returns the URL to a specific OData resource, i.e. the entity collection.
   *
   * @returns The URL of the resource
   */
  resourceUrl(): string {
    return `${removeTrailingSlashes(
      this.serviceUrl()
    )}/${this.config.resourcePath()}`;
  }

  /**
   * Returns the relative URL to a specific OData resource.
   *
   * @returns The relative URL of the resource
   */
  relativeResourceUrl(): string {
    return `${removeTrailingSlashes(
      this.relativeServiceUrl()
    )}/${this.config.resourcePath()}`;
  }

  /**
   * Get query parameters as string. Leads with `?` if  there are parameters to return.
   *
   * @returns Query parameter string
   */
  query(): string {
    const queryParameters = {
      ...this.config.queryParameters(),
      ...this.config.customQueryParameters
    };

    const query = Object.entries(queryParameters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return query.length ? `?${query}` : '';
  }

  /**
   * Create object containing all headers, including custom headers for the given request.
   *
   * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  async headers(): Promise<Record<string, any>> {
    try {
      if (!this.destination) {
        throw Error('The destination is undefined.');
      }

      const destinationRelatedHeaders = await buildHeadersForDestination(
        this.destination,
        this.config.customHeaders
      );

      const csrfHeaders =
        this.config.method === 'get'
          ? {}
          : await this.getCsrfHeaders(destinationRelatedHeaders);

      return {
        ...destinationRelatedHeaders,
        ...csrfHeaders,
        ...this.basicHeaders()
      };
    } catch (error) {
      return Promise.reject(
        errorWithCause('Constructing headers for OData request failed!', error)
      );
    }
  }

  /**
   * Create object containing all basic headers for the given request, including custom headers, but excluding destination related and csrf headers.
   *
   * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  basicHeaders(): Record<string, any> {
    const defaultHeaders = replaceDuplicateKeys(
      filterNullishValues({
        accept: 'application/json',
        'content-type': this.config.contentType,
        ...this.getETagHeader()
      }),
      this.config.customHeaders
    );

    return {
      ...defaultHeaders,
      ...this.config.customHeaders
    };
  }

  /**
   * Execute the given request and return the according promise.
   *
   * @returns Promise resolving to the requested data
   */
  async execute(): Promise<HttpResponse> {
    const destination = this.destination;
    if (!destination) {
      throw Error('The destination cannot be undefined.');
    }

    return executeHttpRequest(destination, {
      headers: await this.headers(),
      url: this.relativeUrl(),
      method: this.config.method,
      data: this.config.payload
    }).catch(error =>
      Promise.reject(
        constructError(error, this.config.method, this.serviceUrl())
      )
    );
  }

  private getETagHeader(): Record<string, string> {
    const eTag = isWithETag(this.config)
      ? this.config.versionIdentifierIgnored
        ? '*'
        : this.config.eTag
      : undefined;
    return filterNullishValues({ 'if-match': eTag });
  }

  private async getCsrfHeaders(
    destinationRelatedHeaders: Record<string, string>
  ): Promise<Record<string, string>> {
    const customCsrfHeaders = getHeader(
      'x-csrf-token',
      this.config.customHeaders
    );
    return Object.keys(customCsrfHeaders).length
      ? customCsrfHeaders
      : buildCsrfHeaders(this.destination!, {
          headers: destinationRelatedHeaders,
          url: this.relativeServiceUrl()
        });
  }
}

function constructError(error, requestMethod: string, url: string): Error {
  if (error.isAxiosError) {
    const defaultMessage = `${requestMethod} request to ${url} failed!`;
    const s4SpecificMessage = propertyExists(error, 'response', 'data', 'error')
      ? messageFromS4ErrorResponse(error)
      : '';
    const message = [defaultMessage, s4SpecificMessage].join(' ');

    return errorWithCause(message, error);
  }
  return error;
}

function messageFromS4ErrorResponse(error): string {
  return `${
    propertyExists(error.response.data.error, 'message', 'value')
      ? error.response.data.error.message.value
      : ''
  }\n${JSON.stringify(error.response.data.error)}`;
}
