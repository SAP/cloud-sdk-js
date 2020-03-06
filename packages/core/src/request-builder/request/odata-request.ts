/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { errorWithCause, MapType, propertyExists } from '@sap-cloud-sdk/util';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAxiosConfigWithDefaults } from '../../http-client';
import { Destination, sanitizeDestination } from '../../scp-cf';
import { removeSlashes, removeTrailingSlashes } from '../../util/remove-slashes';
import { buildHeaders } from '../header-builder/header-builder';
import { getAgentConfig } from '../http-agent';
import { ODataRequestConfig } from './odata-request-config';

/**
 * OData request configuration for an entity type.
 *
 * @typeparam EntityT Type of the entity to setup a request for
 */
export class ODataRequest<RequestConfigT extends ODataRequestConfig> {
  /**
   * Creates an instance of ODataRequest.
   *
   * @param config Configuration of the request
   * @param _destination Destination to setup the request against
   * @memberof ODataRequest
   */

  constructor(public config: RequestConfigT, private _destination?: Destination | undefined) {}

  set destination(dest: Destination | undefined) {
    this._destination = dest && sanitizeDestination(dest);
  }

  get destination(): Destination | undefined {
    return this._destination;
  }

  /**
   * Constructs the url for the request at hand.
   *
   * @returns {string} The url for the request
   */
  url(): string {
    return `${removeTrailingSlashes(this.resourceUrl())}${this.query()}`;
  }

  /**
   * Constructs the relative url for the batch request.
   *
   * @returns {string} The relative url for the batch request
   */
  relativeUrl(): string {
    return `${removeTrailingSlashes(this.relativeResourceUrl())}${this.query()}`;
  }

  /**
   * Specifies whether the destination needs a specific authentication or not.
   *
   * @returns {boolean} A boolean value that specifies whether the destination needs authentication or not
   * @memberof ODataRequest
   */
  needsAuthentication(): boolean {
    return !!this.destination && this.destination.authentication !== 'NoAuthentication';
  }

  /**
   * Returns the service URL for a given OData request.
   *
   * @returns {string} The URL of the service the given entity belongs to
   */
  serviceUrl(): string {
    if (!this.destination) {
      throw Error('The destination is undefined.');
    }
    const systemUrl = this.destination.url;
    const servicePath = typeof this.config.customServicePath === 'undefined' ? this.config.defaultServicePath : this.config.customServicePath;
    return `${removeTrailingSlashes(systemUrl)}/${removeSlashes(servicePath)}`;
  }

  /**
   * Returns the relative service URL for a given OData request.
   *
   * @returns {string} The relative URL of the service the given entity belongs to
   */
  relativeServiceUrl(): string {
    const servicePath = typeof this.config.customServicePath === 'undefined' ? this.config.defaultServicePath : this.config.customServicePath;
    return `${removeSlashes(servicePath)}`;
  }

  /**
   * Returns the URL to a specific OData resource, i.e. the entity collection.
   *
   * @returns {string} The URL of the resource
   */
  resourceUrl(): string {
    return `${removeTrailingSlashes(this.serviceUrl())}/${this.config.resourcePath()}`;
  }

  /**
   * Returns the relative URL to a specific OData resource.
   *
   * @returns {string} The relative URL of the resource
   */
  relativeResourceUrl(): string {
    return `${removeTrailingSlashes(this.relativeServiceUrl())}/${this.config.resourcePath()}`;
  }

  /**
   * Get query parameters as string. Leads with `?` if  there are parameters to return.
   *
   * @returns {string} Query parameter string
   */
  query(): string {
    const queryParameters = this.config.queryParameters();

    const query = Object.entries(queryParameters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return query.length ? `?${query}` : '';
  }

  /**
   * Create object containing all headers, including custom headers for the given request.
   *
   * @returns {Promise<MapType<string>>} Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  async headers(): Promise<MapType<string>> {
    return buildHeaders(this).catch(error => Promise.reject(errorWithCause('Constructing headers for OData request failed!', error)));
  }

  /**
   * Execute the given request and return the according promise.
   *
   * @returns {Promise<any>} Promise resolving to the requested data
   */
  async execute(): Promise<AxiosResponse> {
    if (!this._destination) {
      throw Error('The destination cannot be undefined.');
    }
    const requestDataWithAxiosKeys = {
      url: this.url(),
      method: this.config.method,
      data: this.config.payload,
      ...getAgentConfig(this._destination)
    };

    return this.headers()
      .then((headers): AxiosRequestConfig => ({ headers, ...getAxiosConfigWithDefaults(), ...requestDataWithAxiosKeys }))
      .then(requestConfig => axios.request(requestConfig))
      .catch(error => Promise.reject(constructError(error, this.config.method, this.serviceUrl())));
  }
}

function constructError(error, requestMethod: string, url: string): Error {
  const defaultMessage = `${requestMethod} request to ${url} failed!`;
  const s4SpecificMessage = propertyExists(error, 'response', 'data', 'error') ? messageFromS4ErrorResponse(error) : '';
  const message = [defaultMessage, s4SpecificMessage].join(' ');

  return errorWithCause(message, error);
}

function messageFromS4ErrorResponse(error): string {
  return `${propertyExists(error.response.data.error, 'message', 'value') ? error.response.data.error.message.value : ''}\n${JSON.stringify(
    error.response.data.error
  )}`;
}
