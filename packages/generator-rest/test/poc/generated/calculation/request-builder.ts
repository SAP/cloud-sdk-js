import { CalculationApi, PriceCalculate } from './api';
import { AxiosRequestConfig } from 'axios';
import { Destination, DestinationNameAndJwt, RestRequestBuilder, RestRequestConfig } from '@sap-cloud-sdk/core';

export class CalculationApiRequestBuilder{
  static calculateViaRestWithTenant(tenantName: string, priceCalculate: PriceCalculate){
    return new CalculateViaRestWithTenantRequestBuilder(new RestRequestConfig(), tenantName, priceCalculate);
  }
}

export class CalculateViaRestWithTenantRequestBuilder extends RestRequestBuilder{
  constructor(public requestConfig: RestRequestConfig, public tenantName: string, public priceCalculate: PriceCalculate) {
    super(requestConfig);
  }

  async execute(destination: Destination | DestinationNameAndJwt) {
    const requestConfig: AxiosRequestConfig = await this.buildRequestConfig(destination);
    return new CalculationApi({
      basePath: requestConfig.baseURL
    }).calculateViaRestWithTenant(this.tenantName,
      this.priceCalculate,
      requestConfig);
  }
}
