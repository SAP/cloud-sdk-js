import { AxiosRequestConfig } from 'axios';
import { buildAxiosRequestConfig } from '@sap-cloud-sdk/core';
import {
  CalculationApi,
  PriceCalculateResponse
} from './generated/calculation';
import { transaction } from './promotion-data';
import { CalculationApiWrapper } from './generated/calculation/wrapper';
import { CalculationApiRequestBuilder } from './generated/calculation/request-builder';

const token = 'ask the team';

export async function getPromotionV3(): Promise<PriceCalculateResponse> {
  return CalculationApiRequestBuilder.calculateViaRestWithTenant(
    'oppsapihub',
    transaction
  )
    .withCustomHeaders({
      apiKey: token
    })
    .execute({
      destinationName: 'VLAB'
    })
    .then(response => response.data);
}

export async function getPromotionV2(): Promise<PriceCalculateResponse> {
  return CalculationApiWrapper.calculateViaRestWithTenant(
    'oppsapihub',
    transaction
  )
    .execute(
      {
        destinationName: 'VLAB'
      },
      {
        headers: {
          apikey: token
        }
      }
    )
    .then(response => response.data);
}

export async function getPromotion(): Promise<PriceCalculateResponse> {
  const requestConfig: AxiosRequestConfig = await buildAxiosRequestConfig({
    destinationName: 'VLAB'
  });
  const calculationApi = new CalculationApi({
    basePath: requestConfig.baseURL
  });
  return calculationApi
    .calculateViaRestWithTenant('oppsapihub', transaction, {
      // TODO type: any, additional wrapper function or modify the generated file?
      ...requestConfig,
      headers: {
        apikey: token
      }
    })
    .then(response => response.data);
}
