import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { MethodRequestBuilder } from './request-builder-base';
import {ODataRequestConfig} from "../request/odata-request-config";

/**
 * Create OData request to execute a action or function import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export abstract class ActionFunctionImportRequestBuilder<
  ParametersT,
  ReturnT,
  RequestConfigT extends ODataRequestConfig
> extends MethodRequestBuilder<RequestConfigT
  // | ODataFunctionImportRequestConfig<ParametersT>
  // | ODataActionImportRequestConfig<ParametersT> use one more generic
> {
  /**
   * Base class for function  and actions imports
   * @param responseTransformer - Transformation function for the response.
   * @param requestConfig - Request config for a action or function import.
   */
  protected constructor(
    readonly responseTransformer: (data: any) => ReturnT,
    requestConfig: RequestConfigT
      // | ODataFunctionImportRequestConfig<ParametersT>
      // | ODataActionImportRequestConfig<ParametersT>
  ) {
    super(requestConfig);
  }

  /**
   * Execute request
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the requested return type
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<ReturnT> {
    return this.executeRaw(destination, options).then(response =>
      this.responseTransformer(response.data)
    );
  }

  /**
   * Execute request and return an [[HttpResponse]].
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to an [[HttpResponse]].
   */
  async executeRaw(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<HttpResponse> {
    return this.build(destination, options).then(request => request.execute());
  }
}

export { ActionFunctionImportRequestBuilder as ActionFunctionImportRequestBuilderBase };
