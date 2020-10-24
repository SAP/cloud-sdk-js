import { PriceCalculateResponse } from '../poc/generated/PriceCalculation';
import { PriceCalculationApiRequestBuilder } from '../poc/generated/PriceCalculation/request-builder';
import { transaction } from './price-calculate-payload';

export async function getPriceCalculateV3(): Promise<PriceCalculateResponse> {
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

// export async function getPriceCalculateV2(): Promise<PriceCalculateResponse> {
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
// export async function getPriceCalculateV1(): Promise<PriceCalculateResponse> {
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
