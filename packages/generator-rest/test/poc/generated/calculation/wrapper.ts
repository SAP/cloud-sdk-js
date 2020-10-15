import { CalculationApi, PriceCalculate } from './api';
import { AxiosRequestConfig } from 'axios';
import { buildAxiosRequestConfig, Destination, DestinationNameAndJwt } from '@sap-cloud-sdk/core';

const calculateViaRestWithTenant = (tenantName: string, priceCalculate: PriceCalculate, options?: any) => {
    return {
      execute: async (destination: Destination | DestinationNameAndJwt, customRequestConfig?) => {
        // merge default config and custom config and info from destination
        const requestConfig: AxiosRequestConfig = await buildAxiosRequestConfig(
          destination, customRequestConfig
        );
        return new CalculationApi({
          basePath: requestConfig.baseURL
        })
          .calculateViaRestWithTenant(tenantName,
          priceCalculate,
            {...requestConfig, ...options});
      }
    }
  }

export const CalculationApiWrapper = {
  calculateViaRestWithTenant
};
