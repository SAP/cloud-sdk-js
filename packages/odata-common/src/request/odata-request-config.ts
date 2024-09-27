import { mergeIgnoreCase } from '@sap-cloud-sdk/util';
import { oDataTypedClientParameterEncoder } from '@sap-cloud-sdk/http-client/internal';
import type {
  ParameterEncoder,
  HttpMiddleware
} from '@sap-cloud-sdk/http-client/internal';
import type { CustomRequestConfig } from '@sap-cloud-sdk/http-client';

/**
 * Set of possible request methods.
 */
export type RequestMethodType = 'get' | 'post' | 'patch' | 'delete' | 'put';

/**
 * Parent class for all OData request configs like `getAll`, `delete` or `count`.
 */
export abstract class ODataRequestConfig {
  payload: Record<string, any> | string;
  basePath: string;

  readonly defaultHeaders: Record<string, any> = {
    'content-type': 'application/json',
    accept: 'application/json'
  };

  readonly parameterEncoder: ParameterEncoder =
    oDataTypedClientParameterEncoder;

  private _customHeaders: Record<string, string> = {};
  private _customQueryParameters: Record<string, string> = {};
  private _customRequestConfiguration: Record<string, string> = {};
  private _appendedPaths: string[] = [];
  private _fetchCsrfToken = true;
  private _middlewares: HttpMiddleware[] = [];

  /**
   * Creates an instance of ODataRequest.
   * @param method - HTTP method of the request.
   * @param defaultBasePath - Default path of the according service.
   * @param defaultHeaders - The default headers of the given request as an object.
   */
  constructor(
    public method: RequestMethodType,
    readonly defaultBasePath: string,
    defaultHeaders?: Record<string, any>
  ) {
    this.defaultHeaders = mergeIgnoreCase(this.defaultHeaders, defaultHeaders);
  }

  set middlewares(middlewares: HttpMiddleware[]) {
    this._middlewares = middlewares;
  }

  get middlewares(): HttpMiddleware[] {
    return this._middlewares;
  }

  set customHeaders(headers: Record<string, string>) {
    this._customHeaders = {};
    this.addCustomHeaders(headers);
  }

  get customHeaders(): Record<string, string> {
    return this._customHeaders;
  }

  set customQueryParameters(queryParameters: Record<string, string>) {
    this._customQueryParameters = {};
    this.addCustomQueryParameters(queryParameters);
  }

  get customQueryParameters(): Record<string, string> {
    return this._customQueryParameters;
  }

  set customRequestConfiguration(requestConfiguration: CustomRequestConfig) {
    this._customRequestConfiguration = {};
    this.addCustomRequestConfiguration(requestConfiguration);
  }

  get customRequestConfiguration(): Record<string, string> {
    return this._customRequestConfiguration;
  }

  get appendedPaths(): string[] {
    return this._appendedPaths;
  }

  set fetchCsrfToken(fetchCsrfToken: boolean) {
    this._fetchCsrfToken = fetchCsrfToken;
  }

  get fetchCsrfToken(): boolean {
    return this._fetchCsrfToken;
  }

  /**
   * Add custom headers to the request. This is useful in case you want to provide your own authorization headers for example.
   * @param headers - Key-value pairs where the key is the name of a header property and the value is the respective value.
   */
  addCustomHeaders(headers: Record<string, string>): void {
    Object.entries(headers).forEach(([key, value]) => {
      // Enforce lower case as HTTP headers are case-insensitive
      this.customHeaders[key.toLowerCase()] = value;
    });
  }

  /**
   * Add custom query parameters to the request. This is useful in case your OData service allows non-standard query parameters.
   * @param queryParameters - Key-value pairs where the key is the name of a query parameter and the value is the respective value.
   */
  addCustomQueryParameters(queryParameters: Record<string, string>): void {
    Object.entries(queryParameters).forEach(([key, value]) => {
      this.customQueryParameters[key] = value;
    });
  }

  /**
   * Add custom request configuration to the request.
   * @param requestConfiguration - Key-value pairs where the key is the name of a request configuration and the value is the respective value.
   */
  addCustomRequestConfiguration(
    requestConfiguration: Record<string, any>
  ): void {
    Object.entries(requestConfiguration).forEach(([key, value]) => {
      this.customRequestConfiguration[key] = value;
    });
  }

  appendPath(...path: string[]): void {
    this.appendedPaths.push(...path);
  }

  protected prependDollarToQueryParameters(
    params: Record<string, any>
  ): Record<string, any> {
    return Object.entries(params).reduce((newParams, [key, value]) => {
      newParams[`$${key}`] = value;
      return newParams;
    }, {});
  }

  /**
   * @internal
   */
  abstract resourcePath(): string;

  /**
   * @internal
   */
  abstract queryParameters(): Record<string, any>;
}
