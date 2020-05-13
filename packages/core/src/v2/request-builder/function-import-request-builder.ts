/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { DestinationOptions } from '../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../scp-cf/destination-service-types';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataFunctionImportRequestConfig } from '../../common/request-builder/request/odata-function-import-request-config';
import { FunctionImportParameters, RequestMethodType } from '../../common';
import { ServiceIdentifiable } from '../../common/service';
import * as uriConversion from './request/uri-conversion';
import { ODataRequest } from './request';

/**
 * Create OData request to execute a function import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class FunctionImportRequestBuilder<ParametersT, ReturnT>
  extends MethodRequestBuilderBase<
    ODataFunctionImportRequestConfig<ParametersT>
  >
  implements ServiceIdentifiable {
  readonly _oDataVersion: 'v2' = 'v2';
  /**
   * Creates an instance of FunctionImportRequestBuilder.
   * @param method - HTTP method to be used for the request
   * @param defaultServicePath - Default path for the service the function belongs to
   * @param functionImportName - The name of the function import.
   * @param responseTransformer - Transformation function for the response
   * @param parameters - Parameters to be set in the function
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    functionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: FunctionImportParameters<ParametersT>
  ) {
    super(
      new ODataFunctionImportRequestConfig(
        method,
        defaultServicePath,
        functionImportName,
        parameters,
        uriConversion
      ),
      ODataRequest
    );
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
    return this.build(destination, options)
      .then(request => request.execute())
      .then(({ data }) => this.responseTransformer(data));
  }
}
