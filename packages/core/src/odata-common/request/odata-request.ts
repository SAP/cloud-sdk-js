import {
  unixEOL,
  ErrorWithCause,
  mergeIgnoreCase,
  pickIgnoreCase,
  pickNonNullish,
  propertyExists
} from '@sap-cloud-sdk/util';
import {
  Destination,
  sanitizeDestination,
  buildHeadersForDestination
} from '../../connectivity';
import {
  removeLeadingSlashes,
  removeSlashes,
  removeTrailingSlashes
} from '../remove-slashes';
import {
  HttpResponse,
  executeHttpRequest,
  filterCustomRequestConfig
} from '../../http-client';
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
    return `${removeTrailingSlashes(
      this.resourceUrl()
    )}${this.config.appendedPaths.join('')}${this.query()}`;
  }

  /**
   * Constructs a URL relative to the destination.
   * @param includeServicePath Whether or not to include the service path in the URL.
   * @param includeQueryParameters Whether or not to include the query parameters in the URL.
   * @returns The relative URL for the request.
   */
  relativeUrl(
    includeServicePath = true,
    includeQueryParameters = true
  ): string {
    const query = includeQueryParameters ? this.query() : '';
    return `${removeTrailingSlashes(
      this.relativeResourceUrl(includeServicePath)
    )}${this.config.appendedPaths.join('')}${query}`;
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
    const query = Object.entries(this.queryParameters())
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

      return {
        ...destinationRelatedHeaders,
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
    const additionalHeaders = this.getAdditionalHeadersForKeys(
      ...Object.keys(this.config.defaultHeaders)
    );

    return mergeIgnoreCase(
      pickNonNullish(this.config.defaultHeaders),
      additionalHeaders
    );
  }

  /**
   * Get the eTag related headers, e. g. `if-match`.
   * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  eTagHeaders(): Record<string, any> {
    const additionalIfMatchHeader =
      this.getAdditionalHeadersForKeys('if-match');
    if (Object.keys(additionalIfMatchHeader).length) {
      return additionalIfMatchHeader;
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

    return executeHttpRequest(
      destination,
      {
        ...filterCustomRequestConfig(this.config.customRequestConfiguration),
        headers: await this.headers(),
        params: this.queryParameters(),
        url: this.relativeUrl(true, false),
        method: this.config.method,
        data: this.config.payload
      },
      { fetchCsrfToken: this.config.fetchCsrfToken }
    ).catch(error => {
      throw constructError(error, this.config.method, this.serviceUrl());
    });
  }

  private getAdditionalHeadersForKeys(...keys: string[]): Record<string, any> {
    const destinationHeaders = pickIgnoreCase(
      this.destination?.headers,
      ...keys
    );
    const customHeaders = pickIgnoreCase(this.customHeaders(), ...keys);
    return mergeIgnoreCase(destinationHeaders, customHeaders);
  }

  private queryParameters(): Record<string, any> {
    return {
      ...this.config.queryParameters(),
      ...this.destination?.queryParameters,
      ...this.config.customQueryParameters
    };
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
  }${unixEOL}${JSON.stringify(error.response.data.error)}`;
}
