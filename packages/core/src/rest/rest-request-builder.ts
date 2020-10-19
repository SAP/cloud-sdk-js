import { AxiosRequestConfig } from 'axios';
import { Destination, DestinationNameAndJwt } from '../scp-cf';
import { buildAxiosRequestConfig } from '../http-client';
import { RestRequestConfig } from './rest-request-config';

export abstract class RestRequestBuilder{
  constructor(public requestConfig: RestRequestConfig) {
  }

  withCustomHeaders(headers: Record<string, string>): this {
    this.requestConfig.addCustomHeaders(headers);
    return this;
  }

  buildRequestConfig(destination: Destination | DestinationNameAndJwt): Promise<AxiosRequestConfig>{
    return buildAxiosRequestConfig(
      destination, {
        headers: this.requestConfig.customHeaders
      }
    );
  }
}
