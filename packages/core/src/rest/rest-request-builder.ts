import { AxiosRequestConfig } from 'axios';
import { Destination, DestinationNameAndJwt } from '../scp-cf';
import { buildAxiosRequestConfig } from '../http-client';

export abstract class RestRequestBuilder {
  public customHeaders: Record<string, string> = {};

  withCustomHeaders(headers: Record<string, string>): this {
    Object.entries(headers).forEach(([key, value]) => {
      this.customHeaders[key.toLowerCase()] = value;
    });
    return this;
  }

  buildRequestConfig(
    destination: Destination | DestinationNameAndJwt
  ): Promise<AxiosRequestConfig> {
    return buildAxiosRequestConfig(destination, {
      headers: this.customHeaders
    });
  }
}
