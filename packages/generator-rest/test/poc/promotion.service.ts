import {
  PriceCalculateResponse, CalculationApi
} from './generated-v3/PriceCalculation';
import { transaction } from './promotion-data';
// import { PriceCalculationApiRequestBuilder } from './generated-v3/PriceCalculation/request-builder';
import { buildAxiosRequestConfig } from '@sap-cloud-sdk/core';
import { AxiosRequestConfig } from 'axios';
import { PriceCalculationApiRequestBuilder } from './generated-v3/PriceCalculation/request-builder';

const token = 'ask the team';

export async function getPromotionV3(): Promise<PriceCalculateResponse> {
  return PriceCalculationApiRequestBuilder.calculateViaRestWithTenant(
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

// export async function getPromotionV2(): Promise<PriceCalculateResponse> {
//   return (
//     CalculationApiWrapper.calculateViaRestWithTenant('oppsapihub', transaction)
//       // TODO more flexible api is needed instead of execute function only
//       .execute(
//         {
//           destinationName: 'VLAB'
//         },
//         {
//           headers: {
//             apikey: token
//           }
//         }
//       )
//       .then(response => response.data)
//   );
// }
//
// export async function getPromotion(): Promise<PriceCalculateResponse> {
//   const requestConfig: AxiosRequestConfig = await buildAxiosRequestConfig({
//     destinationName: 'VLAB'
//   });
//   const calculationApi = new CalculationApi({
//     basePath: requestConfig.baseURL
//   });
//   return calculationApi
//     .calculateViaRestWithTenant('oppsapihub', transaction, {
//       // TODO type: any, additional wrapper function or modify the generated file?
//       ...requestConfig,
//       headers: {
//         apikey: token
//       }
//     })
//     .then(response => response.data);
// }
