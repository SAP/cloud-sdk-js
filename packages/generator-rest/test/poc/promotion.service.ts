import { CalculationApi, Percent } from '../generated/calculation';
import { transaction } from './promotion-data';
import { AxiosRequestConfig } from 'axios';
import { buildAxiosRequestConfig } from '@sap-cloud-sdk/core';

export async function getPromotion(): Promise<Percent> {
  const token = "ask the team";

  const requestConfig: AxiosRequestConfig =  await buildAxiosRequestConfig({destinationName: 'VLAB'}, { method: 'post'});
  const calculationApi = new CalculationApi({ basePath: requestConfig.baseURL});
  return calculationApi
    .calculateViaRestWithTenant('oppsapihub', transaction, {
      // TODO type: any, additional wrapper function or modify the generated file?
      ...requestConfig,
      headers: {
        apikey: token
      }
    })
    .then(response => {
      return response.data.PriceCalculateBody![0].ShoppingBasket
        .LineItem[0].Sale!.RetailPriceModifier![0].Percent!;
    });
}
