/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger, MapType, VALUE_IS_UNDEFINED } from '@sap-cloud-sdk/util';

export type RequestMethodType = 'get' | 'post' | 'patch' | 'delete' | 'put';

const logger = createLogger({
  package: '@sap-cloud-sdk/core',
  messageContext: 'odata-request-config'
});

/**
 * @hidden
 */
export abstract class ODataRequestConfig {
  payload: MapType<any> | string;
  customServicePath: string;

  private _customHeaders: MapType<string> = {};

  /**
   * Creates an instance of ODataRequest.
   *
   * @param method - HTTP method of the request
   * @param defaultServicePath - default path of the according service
   * @param contentType - The content type of the request
   */
  constructor(
    public method: RequestMethodType,
    readonly defaultServicePath: string,
    readonly contentType = 'application/json'
  ) {
    if (defaultServicePath === VALUE_IS_UNDEFINED) {
      logger.warn('The service path is undefined in "_defaultServicePath".');
    }
  }

  set customHeaders(headers: MapType<string>) {
    this._customHeaders = {};
    this.addCustomHeaders(headers);
  }

  get customHeaders(): MapType<string> {
    return this._customHeaders;
  }

  /**
   * Add custom headers to the request. This is useful in case you want to provide your own authorization headers for example.
   *
   * @param headers - Key-value pairs where the key is the name of a header property and the value is the respective value
   */
  addCustomHeaders(headers: MapType<string>): void {
    Object.entries(headers).forEach(([key, value]) => {
      // Enforce lower case as HTTP headers are case-insensitive
      this.customHeaders[key.toLowerCase()] = value;
    });
  }

  protected prependDollarToQueryParameters(params: MapType<any>): MapType<any> {
    return Object.entries(params).reduce((newParams, [key, value]) => {
      newParams[`$${key}`] = value;
      return newParams;
    }, {});
  }

  /**
   * @hidden
   */
  abstract resourcePath(): string;

  /**
   * @hidden
   */
  abstract queryParameters(): MapType<any>;
}
