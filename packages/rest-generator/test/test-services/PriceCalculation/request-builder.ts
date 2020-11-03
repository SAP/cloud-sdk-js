/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Destination, DestinationNameAndJwt, RestRequestBuilder } from '@sap-cloud-sdk/core';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PriceCalculationApi, PriceCalculate, PriceCalculateResponse } from './open-api/api';

export class PriceCalculationApiRequestBuilder {
  static calculateViaRestWithTenant(tenantName: string, priceCalculate: PriceCalculate): RestRequestBuilder<
    typeof /restapi/{ tenantName },
'calculateViaRestWithTenant'
  > {
  new RestRequestBuilder(
    /restapi/{ tenantName },
    'calculateViaRestWithTenant',
    tenantName,
    priceCalculate
  );
}
  }
}
