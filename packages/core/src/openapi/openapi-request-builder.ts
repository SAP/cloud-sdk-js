/* eslint-disable max-classes-per-file */
import { AxiosResponse } from 'axios';
import { Destination, DestinationNameAndJwt } from '../connectivity/scp-cf';
import { executeHttpRequest, HttpResponse, Method } from '../http-client';

export class OpenApiRequestBuilder {
  private customHeaders: Record<string, string> = {};

  /**
   * Create an instance of `OpenApiRequestBuilder`.
   * @param apiConstructor Constructor of the underlying OpenApi api definition.
   * @param fn Name of the function represented in thie request builder.
   * @param args Arguments to pass to the api function.
   */
  constructor(
    public method: Method,
    private path: string,
    private parameters?: OpenApiRequestParameters
  ) {}

  /**
   * Add custom headers to the request. If a header field with the given name already exists it is overwritten.
   *
   * @param headers Key-value pairs denoting additional custom headers
   * @returns The request builder itself, to facilitate method chaining
   */
  addCustomHeaders(headers: Record<string, string>): this {
    Object.entries(headers).forEach(([key, value]) => {
      this.customHeaders[key.toLowerCase()] = value;
    });
    return this;
  }

  /**
   * Execute request and get a raw AxiosResponse, including all information about the HTTP response.
   * This especially comes in handy, when you need to access the headers or status code of the response.
   * @param destination Destination to execute the request against.
   * @param options Options to employ when fetching destinations.
   * @returns A promise resolving to an AxiosResponse.
   */
  async executeRaw(
    destination: Destination | DestinationNameAndJwt
  ): Promise<HttpResponse> {
    return executeHttpRequest(destination, {
      method: this.method,
      url: this.path,
      headers: this.customHeaders,
      params: this.parameters?.queryParameters,
      data: this.parameters?.body
    });
  }

  /**
   * Execute request and get the response data. Use this to conveniently access the data of a service without technical information about the response.
   * @param destination Destination to execute the request against.
   * @param options Options to employ when fetching destinations.
   * @returns A promise resolving to the requested return type.
   */
  async execute(
    destination: Destination | DestinationNameAndJwt
  ): Promise<any> {
    // TODO: fix return type
    const response = await this.executeRaw(destination);
    if (isAxiosResponse(response)) {
      return response.data;
    }
    throw new Error(
      'Could not access response data. Response was not an axios response.'
    );
  }
}

// TODO: Tighten types
interface OpenApiRequestParameters {
  queryParameters?: Record<string, any>;
  body?: any;
}

function isAxiosResponse(val: any): val is AxiosResponse {
  return 'data' in val;
}
