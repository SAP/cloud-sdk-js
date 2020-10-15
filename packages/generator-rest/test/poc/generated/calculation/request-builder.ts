import { CalculationApi, PriceCalculate } from './api';
import { AxiosRequestConfig } from 'axios';
import { buildAxiosRequestConfig, Destination, DestinationNameAndJwt, HttpRequestConfig } from '@sap-cloud-sdk/core';

// todo move to core
export abstract class RequestBuilder{
  constructor(public requestConfig: RequestConfig) {
  }

  withCustomHeaders(headers: Record<string, string>): this {
    this.requestConfig.addCustomHeaders(headers);
    return this;
  }
}

// todo move to core
export class RequestConfig{
  public customHeaders: Record<string, string> = {};

  addCustomHeaders(headers: Record<string, string>): void {
    Object.entries(headers).forEach(([key, value]) => {
      this.customHeaders[key.toLowerCase()] = value;
    });
  }
}

export class CalculationApiRequestBuilder{
  static calculateViaRestWithTenant(tenantName: string, priceCalculate: PriceCalculate){
    return new CalculateViaRestWithTenantRequestBuilder(new RequestConfig(), tenantName, priceCalculate);
  }
}

export class CalculateViaRestWithTenantRequestBuilder extends RequestBuilder{
  constructor(public requestConfig: RequestConfig, public tenantName: string, public priceCalculate: PriceCalculate) {
    super(requestConfig);
  }

  async execute(destination: Destination | DestinationNameAndJwt) {
    const requestConfig: AxiosRequestConfig = await buildAxiosRequestConfig(
      destination, {
        headers: this.requestConfig.customHeaders
      }
    );
    return new CalculationApi({
      basePath: requestConfig.baseURL
    }).calculateViaRestWithTenant(this.tenantName,
      this.priceCalculate,
      requestConfig);
  }
}
