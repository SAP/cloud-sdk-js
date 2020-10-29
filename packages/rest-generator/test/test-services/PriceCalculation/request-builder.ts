/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Destination, DestinationNameAndJwt, RestRequestBuilder } from '@sap-cloud-sdk/core';
import { AxiosRequestConfig } from 'axios';
import { PriceCalculationApi, PriceCalculate } from './open-api/api';

export class PriceCalculationApiRequestBuilder {
  static calculateViaRestWithTenant(tenantName: string, priceCalculate: PriceCalculate): CalculateViaRestWithTenantRequestBuilder {
    return new CalculateViaRestWithTenantRequestBuilder(tenantName, priceCalculate);
  }
}

export class CalculateViaRestWithTenantRequestBuilder extends RestRequestBuilder {
  constructor(public tenantName: string, public priceCalculate: PriceCalculate) {
    super();
  }

  async execute(destination: Destination | DestinationNameAndJwt) {
    const requestConfig: AxiosRequestConfig = await this.buildRequestConfig(destination);
    return new PriceCalculationApi({ basePath: requestConfig.baseURL }).calculateViaRestWithTenant(this.tenantName, this.priceCalculate, requestConfig);
  }
}
