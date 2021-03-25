import {
  ErrorWithCause,
  mergeIgnoreCase,
  pickIgnoreCase,
  pickNonNullish,
  pickValueIgnoreCase,
  propertyExists
} from '@sap-cloud-sdk/util';
import {
  Destination,
  sanitizeDestination,
  buildHeadersForDestination,
  buildCsrfHeaders
} from '../../connectivity';
import {
  removeLeadingSlashes,
  removeSlashes,
  removeTrailingSlashes
} from '../remove-slashes';
import { HttpResponse, executeHttpRequest } from '../../http-client';
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
   * Constructs an absolute URL for the given request.
   * @returns The absolute URL for the request
   */
  url(): string {
    return `${removeTrailingSlashes(this.resourceUrl())}${this.query()}`;
  }

  /**
   * Constructs a URL relative to the destination.
   * @param includeServicePath Whether or not to include the service path in the URL.
   * @returns The relative URL for the request.
   */
  relativeUrl(includeServicePath = true): string {
    return `${removeTrailingSlashes(
      this.relativeResourceUrl(includeServicePath)
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
   * Returns the service URL relative to the url of the destination for a given OData request.
   * @returns The relative URL of the service the given entity belongs to.
   */
  relativeServiceUrl(): string {
    const servicePath =
      typeof this.config.customServicePath === 'undefined'
        ? this.config.defaultServicePath
        : this.config.customServicePath;
    return `${removeSlashes(servicePath)}`;
  }

  /**
   * Returns the URL to a specific OData .resource, i.e. the entity collection.
   * @returns The URL of the resource
   */
  resourceUrl(): string {
    return `${removeTrailingSlashes(
      this.serviceUrl()
    )}/${this.config.resourcePath()}`;
  }

  /**
   * Returns the relative URL to a specific OData resource.
   * @param includeServicePath Whether or not to include the service path in the URL.
   * @returns The relative URL of the resource.
   */
  relativeResourceUrl(includeServicePath = true): string {
    const baseUrl = includeServicePath
      ? removeTrailingSlashes(this.relativeServiceUrl())
      : '';
    const url = `${baseUrl}/${this.config.resourcePath()}`;
    return removeLeadingSlashes(url);
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
        ...this.defaultHeaders(),
        ...this.eTagHeaders(),
        ...this.customHeaders()
      };
    } catch (error) {
      throw new ErrorWithCause(
        'Constructing headers for OData request failed!',
        error
      );
    }
  }

  /**
   * Get all custom headers.
   * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  customHeaders(): Record<string, any> {
    return this.config.customHeaders;
  }

  /**
   * Get all default headers. If custom headers are set, those take precedence.
   * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  defaultHeaders(): Record<string, any> {
    const customDefaultHeaders = pickIgnoreCase(
      this.customHeaders(),
      ...Object.keys(this.config.defaultHeaders)
    );

    return mergeIgnoreCase(
      pickNonNullish(this.config.defaultHeaders),
      customDefaultHeaders
    );
  }

  /**
   * Get the eTag related headers, e. g. `if-match`.
   * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  eTagHeaders(): Record<string, any> {
    if (pickValueIgnoreCase(this.customHeaders(), 'if-match')) {
      return pickIgnoreCase(this.customHeaders(), 'if-match');
    }
    const eTag = isWithETag(this.config)
      ? this.config.versionIdentifierIgnored
        ? '*'
        : this.config.eTag
      : undefined;
    return pickNonNullish({ 'if-match': eTag });
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
    }).catch(error => {
      throw constructError(error, this.config.method, this.serviceUrl());
    });
  }

  private async getCsrfHeaders(
    destinationRelatedHeaders: Record<string, string>
  ): Promise<Record<string, any>> {
    const customCsrfHeaders = pickIgnoreCase(
      this.config.customHeaders,
      'x-csrf-token'
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

    return new ErrorWithCause(message, error);
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
