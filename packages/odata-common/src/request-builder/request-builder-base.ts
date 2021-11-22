import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationFetchOptions,
  noDestinationErrorMessage,
  useOrFetchDestination
} from '@sap-cloud-sdk/connectivity';
import { ODataRequest } from '../request/odata-request';
import { ODataRequestConfig } from '../request/odata-request-config';

/**
 * Base class for all request builders.
 * @typeparam EntityT - Type of the entity to create a request for.
 * @internal
 */
export abstract class MethodRequestBuilder<
  RequestConfigT extends ODataRequestConfig = any
> {
  /**
   * Creates an instance of MethodRequestBuilder.
   * @param requestConfig - Request configuration to initialize with.
   */
  constructor(public requestConfig: RequestConfigT) {}

  /**
   * Create the URL based on configuration of the given builder.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns Promise resolving to the URL for the request
   */
  async url(
    destination: Destination | DestinationFetchOptions
  ): Promise<string> {
    const request = await this.build(destination);
    return request.url();
  }

  /**
   * Create the relative URL based on configuration of the given builder.
   * @returns The relative URL for the request
   */
  relativeUrl(): string {
    return this.build().relativeUrl();
  }

  /**
   * Add custom headers to the request. Existing headers will be overwritten.
   * @param headers - Key-value pairs denoting additional custom headers.
   * @returns The request builder itself, to facilitate method chaining.
   */
  addCustomHeaders(headers: Record<string, string>): this {
    this.requestConfig.addCustomHeaders(headers);
    return this;
  }

  /**
   * @deprecated Since version 1.34.0 Use [[addCustomQueryParameters]] instead.
   * Add custom query parameters to the request.
   * @param queryParameters - Key-value pairs denoting additional custom query parameters to be set in the request.
   * @returns The request builder itself, to facilitate method chaining.
   */
  withCustomQueryParameters(queryParameters: Record<string, string>): this {
    this.requestConfig.addCustomQueryParameters(queryParameters);
    return this;
  }

  /**
   * Add custom query parameters to the request. If a query parameter with the given name already exists it is overwritten.
   * @param queryParameters - Key-value pairs denoting additional custom query parameters to be set in the request.
   * @returns The request builder itself, to facilitate method chaining
   */
  addCustomQueryParameters(queryParameters: Record<string, string>): this {
    this.requestConfig.addCustomQueryParameters(queryParameters);
    return this;
  }

  /**
   * @deprecated Since version 1.34.0 Use [[setCustomServicePath]] instead.
   * Replace the default service path with the given custom path.
   * In case of the SAP S/4HANA APIs the servicePath defaults to `/sap/opu/odata/sap/<SERVICE_NAME>` and can be overwritten here.
   * @param servicePath - Path to override the default with.
   * @returns The request builder itself, to facilitate method chaining.
   */
  withCustomServicePath(servicePath: string): this {
    this.requestConfig.customServicePath = servicePath;
    return this;
  }

  /**
   * Replace the default service path with the given custom path.
   * In case of the SAP S/4HANA APIs the servicePath defaults to `/sap/opu/odata/sap/<SERVICE_NAME>` and can be overwritten here.
   * @param servicePath - Path to override the default with
   * @returns The request builder itself, to facilitate method chaining
   */
  setCustomServicePath(servicePath: string): this {
    this.requestConfig.customServicePath = servicePath;
    return this;
  }

  /**
   * Add a custom request configuration to the request. Typically, this is used when specifying a response type for downloading files.
   * If the custom request configuration contains [[defaultDisallowedKeys | disallowed keys]], those will be ignored.
   * @param requestConfiguration - Key-value pairs denoting additional custom request configuration options to be set in the request.
   * @returns The request builder itself, to facilitate method chaining.
   */
  addCustomRequestConfiguration(
    requestConfiguration: Record<string, string>
  ): this {
    this.requestConfig.addCustomRequestConfiguration(requestConfiguration);
    return this;
  }

  /**
   * Append the given path to the URL.
   * This can be used for querying navigation properties of an entity.
   * To execute a request with an appended path use `executeRaw` to avoid errors during deserialization. When using this, the `execute` method is omitted from the return type.
   * @param path - Path to be appended.
   * @returns The request builder itself without "execute" function, to facilitate method chaining.
   */
  appendPath(...path: string[]): Omit<this, 'execute'> {
    this.requestConfig.appendPath(...path);
    return this;
  }

  /**
   * Skip fetching csrf token for this request, which is typically useful when the csrf token is not required.
   * @returns The request builder itself, to facilitate method chaining.
   */
  skipCsrfTokenFetching(): this {
    this.requestConfig.fetchCsrfToken = false;
    return this;
  }

  build(): ODataRequest<RequestConfigT>;
  build(
    destination: Destination | DestinationFetchOptions
  ): Promise<ODataRequest<RequestConfigT>>;
  /**
   * Build an ODataRequest that holds essential configuration for the service request and executes it.
   * @deprecated Since v1.30.0. This method will be protected and should not be used externally.
   * @param destination - Targeted destination or DestionationFetchOptions on which the request is performed.
   * @returns The OData request executor including the destination configuration, if one was given.
   */
  build(
    destination?: Destination | DestinationFetchOptions
  ): ODataRequest<RequestConfigT> | Promise<ODataRequest<RequestConfigT>> {
    if (destination) {
      return useOrFetchDestination(destination)
        .then(dest => {
          if (!dest) {
            throw Error(noDestinationErrorMessage(destination));
          }
          return new ODataRequest(this.requestConfig, dest);
        })
        .catch(error => {
          throw new ErrorWithCause(
            noDestinationErrorMessage(destination),
            error
          );
        });
    }
    return new ODataRequest(this.requestConfig);
  }
}
