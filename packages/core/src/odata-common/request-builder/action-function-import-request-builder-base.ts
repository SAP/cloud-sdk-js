import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '../../connectivity/scp-cf';
import { MethodRequestBuilder } from '../request-builder/request-builder-base';
import { ODataFunctionImportRequestConfig } from '../request/odata-function-import-request-config';
import { ODataActionImportRequestConfig } from '../../odata-v4';
import { HttpResponse } from '../../http-client';

/**
 * Create OData request to execute a action or function import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export abstract class ActionFunctionImportRequestBuilder<
  ParametersT,
  ReturnT
> extends MethodRequestBuilder<
  | ODataFunctionImportRequestConfig<ParametersT>
  | ODataActionImportRequestConfig<ParametersT>
> {
  /**
   * Base class for function  and actions imports
   * @param responseTransformer - Transformation function for the response
   * @param requestConfig - Request config for a action or funciton import
   */
  protected constructor(
    readonly responseTransformer: (data: any) => ReturnT,
    requestConfig:
      | ODataFunctionImportRequestConfig<ParametersT>
      | ODataActionImportRequestConfig<ParametersT>
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
   *
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
