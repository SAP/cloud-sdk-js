import {
  createLogger,
  mergeIgnoreCase,
  VALUE_IS_UNDEFINED
} from '@sap-cloud-sdk/util';
export type RequestMethodType = 'get' | 'post' | 'patch' | 'delete' | 'put';

const logger = createLogger({
  package: 'odata-common',
  messageContext: 'odata-request-config'
});

export abstract class ODataRequestConfig {
  payload: Record<string, any> | string;
  customServicePath: string;

  readonly defaultHeaders: Record<string, any> = {
    'content-type': 'application/json',
    accept: 'application/json'
  };

  private _customHeaders: Record<string, string> = {};
  private _customQueryParameters: Record<string, string> = {};
  private _customRequestConfiguration: Record<string, string> = {};
  private _appendedPaths: string[] = [];
  private _fetchCsrfToken = true;

  /**
   * @deprecated Since v1.30.0. Use [[defaultHeaders]] instead.
   */
  get contentType(): any {
    return this.defaultHeaders['content-type'];
  }

  /**
   * @deprecated Since v1.30.0.
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    contentType: string
  );
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    defaultHeaders?: Record<string, any>
  );
  /**
   * Creates an instance of ODataRequest.
   * @param method - HTTP method of the request
   * @param defaultServicePath - default path of the according service
   * @param defaultHeadersOrContentType - The default headers of the given request as an object. When passing a string only set the content type header will be set. Setting the content type only is deprecated since v1.30.0.
   */
  constructor(
    public method: RequestMethodType,
    readonly defaultServicePath: string,
    defaultHeadersOrContentType?: Record<string, any> | string
  ) {
    if (defaultServicePath === VALUE_IS_UNDEFINED) {
      logger.warn('The service path is undefined in "_defaultServicePath".');
    }
    if (typeof defaultHeadersOrContentType === 'string') {
      this.defaultHeaders['content-type'] = defaultHeadersOrContentType;
    } else {
      this.defaultHeaders = mergeIgnoreCase(
        this.defaultHeaders,
        defaultHeadersOrContentType
      );
    }
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

  set customRequestConfiguration(requestConfiguration: Record<string, string>) {
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
   * @param headers - Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  addCustomHeaders(headers: Record<string, string>): void {
    Object.entries(headers).forEach(([key, value]) => {
      // Enforce lower case as HTTP headers are case-insensitive
      this.customHeaders[key.toLowerCase()] = value;
    });
  }

  /**
   * Add custom query parameters to the request. This is useful in case your OData service allows non-standard query parameters.
   * @param queryParameters - Key-value pairs where the key is the name of a query parameter and the value is the respective value
   */
  addCustomQueryParameters(queryParameters: Record<string, string>): void {
    Object.entries(queryParameters).forEach(([key, value]) => {
      this.customQueryParameters[key] = value;
    });
  }

  /**
   * Add custom request configuration to the request.
   * @param requestConfiguration - Key-value pairs where the key is the name of a request configuration and the value is the respective value
   */
  addCustomRequestConfiguration(
    requestConfiguration: Record<string, string>
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
