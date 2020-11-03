import { AxiosRequestConfig } from 'axios';
import { buildAxiosRequestConfig } from '@sap-cloud-sdk/core';
import { CalculationApi } from '../test-services/PriceCalculation/open-api/api';
import { PriceCalculateResponse } from '../test-services/PriceCalculation';
import { PriceCalculationApiRequestBuilder } from '../test-services/PriceCalculation/request-builder';
import { transaction } from './price-calculate-payload';

export async function getPriceCalculate(): Promise<PriceCalculateResponse> {
  return PriceCalculationApiRequestBuilder.calculateViaRestWithTenant(
    'oppsapihub',
    transaction
  )
    .withCustomHeaders({
      apiKey: process.env.SANDBOX_TOKEN as string
    })
    .execute({
      destinationName: 'VLAB'
    })
    .then(response => response.data);
}

export async function getPriceCalculateWithVanillaOpenApi(): Promise<
  PriceCalculateResponse
> {
  const requestConfig: AxiosRequestConfig = await buildAxiosRequestConfig({
    destinationName: 'VLAB'
  });
  const calculationApi = new CalculationApi(requestConfig);
  return calculationApi
    .calculateViaRestWithTenant('oppsapihub', transaction, {
      ...requestConfig,
      headers: {
        apikey: process.env.SANDBOX_TOKEN
      }
    })
    .then(response => response.data);
}
