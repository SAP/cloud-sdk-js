/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RestRequestBuilder } from '@sap-cloud-sdk/core';
import { PriceCalculationApi } from './open-api';
import { PriceCalculate } from './open-api/model';
export const PriceCalculationApiRequestBuilder = {
  calculateViaRestWithTenant: (tenantName: string, priceCalculate: PriceCalculate) => new RestRequestBuilder<PriceCalculationApi>(
    PriceCalculationApi,
    'calculateViaRestWithTenant',
    tenantName,
    priceCalculate
  )
};
