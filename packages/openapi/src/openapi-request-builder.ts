/* eslint-disable max-classes-per-file */
import { AxiosResponse } from 'axios';
import { isNullish } from '@sap-cloud-sdk/util';
import {
  Destination,
  useOrFetchDestination,
  DestinationOrFetchOptions
} from '@sap-cloud-sdk/connectivity';
import { noDestinationErrorMessage } from '@sap-cloud-sdk/connectivity/internal';
import {
  Method,
  HttpResponse,
  HttpRequestConfigWithOrigin,
  executeHttpRequest
} from '@sap-cloud-sdk/http-client';
import {
  filterCustomRequestConfig,
  OriginOptions,
  encodeTypedClientRequest
} from '@sap-cloud-sdk/http-client/internal';

/**
 * Request builder for OpenAPI requests.
 * @typeParam ResponseT - Type of the response for the request.
 */
export class OpenApiRequestBuilder<ResponseT = any> {
  private static isPlaceholder(pathPart: string): boolean {
    return /^\{.+\}$/.test(pathPart);
  }

  private customHeaders: Record<string, string> = {};
  private customRequestConfiguration: Record<string, string> = {};
  private _fetchCsrfToken = true;
  private _timeout: number | undefined = undefined;

  /**
   * Create an instance of `OpenApiRequestBuilder`.
   * @param method - HTTP method of the request to be built.
   * @param pathPattern - Path for the request containing path parameter references as in the OpenAPI specification.
   * @param parameters - Query parameters and or body to pass to the request.
   */
  constructor(
    public method: Method,
    private pathPattern: string,
    private parameters?: OpenApiRequestParameters
  ) {}

  /**
   * Add custom headers to the request. If a header field with the given name already exists it is overwritten.
   * @param headers - Key-value pairs denoting additional custom headers.
   * @returns The request builder itself, to facilitate method chaining.
   */
  addCustomHeaders(headers: Record<string, string>): this {
    Object.entries(headers).forEach(([key, value]) => {
      this.customHeaders[key.toLowerCase()] = value;
    });
    return this;
  }

  /**
   * Add custom request configuration to the request. Typically, this is used when specifying response type for downloading files.
   * If the custom request configuration contains keys in this list {@link @sap-cloud-sdk/http-client!defaultDisallowedKeys}, they will be removed.
   * @param requestConfiguration - Key-value pairs denoting additional custom request configuration options to be set in the request.
   * @returns The request builder itself, to facilitate method chaining.
   */
  addCustomRequestConfiguration(
    requestConfiguration: Record<string, string>
  ): this {
    Object.entries(requestConfiguration).forEach(([key, value]) => {
      this.customRequestConfiguration[key] = value;
    });
    return this;
  }

  /**
   * Skip fetching csrf token for this request, which is typically useful when the csrf token is not required.
   * @returns The request builder itself, to facilitate method chaining.
   */
  skipCsrfTokenFetching(): this {
    this._fetchCsrfToken = false;
    return this;
  }

  /**
   * Set timeout for requests towards the target system given in the destination.
   * @param timeout - Value is in milliseconds and default value is 10000 (10 seconds).
   * @returns The request builder itself, to facilitate method chaining.
   */
  timeout(timeout: number): this {
    this._timeout = timeout;
    return this;
  }

  /**
   * Execute request and get a raw {@link @sap-cloud-sdk/http-client!HttpResponse}, including all information about the HTTP response.
   * This especially comes in handy, when you need to access the headers or status code of the response.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   */
  async executeRaw(
    destination: DestinationOrFetchOptions
  ): Promise<HttpResponse> {
    const fetchCsrfToken =
      this._fetchCsrfToken &&
      ['post', 'put', 'patch', 'delete'].includes(this.method.toLowerCase());

    const resolvedDestination = await useOrFetchDestination(destination);
    if (isNullish(destination)) {
      throw Error(noDestinationErrorMessage(destination));
    }

    return executeHttpRequest(
      resolvedDestination as Destination,
      await this.requestConfig(),
      { fetchCsrfToken }
    );
  }

  /**
   * Execute request and get the response data. Use this to conveniently access the data of a service without technical information about the response.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to the requested return type.
   */
  async execute(destination: DestinationOrFetchOptions): Promise<ResponseT> {
    const response = await this.executeRaw(destination);
    if (isAxiosResponse(response)) {
      return response.data;
    }
    throw new Error(
      'Could not access response data. Response was not an axios response.'
    );
  }

  /**
   * Get http request config.
   * @returns Promise of http request config with origin.
   */
  private async requestConfig(): Promise<HttpRequestConfigWithOrigin> {
    const defaultConfig = {
      method: this.method,
      url: this.getPath(),
      headers: this.getHeaders(),
      params: this.getParameters(),
      timeout: this._timeout,
      parameterEncoder: encodeTypedClientRequest,
      data: this.parameters?.body
    };
    return {
      ...defaultConfig,
      ...filterCustomRequestConfig(this.customRequestConfiguration)
    };
  }

  private getHeaders(): OriginOptions {
    if (Object.keys(this.customHeaders).length > 0) {
      return { custom: this.customHeaders, requestConfig: {} };
    }
    return { requestConfig: {} };
  }

  private getParameters(): OriginOptions {
    return { requestConfig: this.parameters?.queryParameters || {} };
  }

  private getPath(): string {
    const pathParameters = this.parameters?.pathParameters || {};

    // Get the innermost curly bracket pairs with non-empty and legal content as placeholders.
    const placeholders: string[] = this.pathPattern.match(/{[^/?#{}]+}/g) || [];

    return placeholders.reduce((path, placeholder) => {
      const strippedPlaceholder = placeholder.slice(1, -1);
      const parameterValue = pathParameters[strippedPlaceholder];
      return path.replace(placeholder, encodeURIComponent(parameterValue));
    }, this.pathPattern);
  }
}

// TODO: Tighten types
/**
 * Type of the request parameters to be passed to {@link OpenApiRequestBuilder}.
 */
export interface OpenApiRequestParameters {
  /**
   * Collection of path parameters.
   */
  pathParameters?: Record<string, any>;
  /**
   * Collection of query parameters.
   */
  queryParameters?: Record<string, any>;
  /**
   * Request body typically used with "create" and "update" operations (POST, PUT, PATCH).
   */
  body?: any;
}

function isAxiosResponse(val: any): val is AxiosResponse {
  return 'data' in val;
}
