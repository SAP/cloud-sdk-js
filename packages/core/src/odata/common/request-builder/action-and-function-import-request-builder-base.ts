/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination-service-types';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataFunctionImportRequestConfig } from '../../common/request/odata-function-import-request-config';
import {
  FunctionImportParameters,
  ODataUri,
  RequestMethodType
} from '../../common';
import { ActionImportParameters } from '../../v4/request/action-import-parameter';

/**
 * Create OData request to execute a action or function import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export abstract class ActionAndFunctionImportRequestBuilderBase<
  // reuse
  ParametersT,
  ReturnT
> extends MethodRequestBuilderBase<
  ODataFunctionImportRequestConfig<ParametersT>
> {
  /**
   * Base class for function  and actions imports
   * @param method - HTTP method to be used for the request
   * @param defaultServicePath - Default path for the service the function belongs to
   * @param actionOrFunctionImportName - The name of the function import.
   * @param responseTransformer - Transformation function for the response
   * @param parameters - Parameters to be set in the function
   * @param oDataUri - Contains the v2/v4 specific URI conversions
   */
  protected constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    actionOrFunctionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters:
      | FunctionImportParameters<ParametersT>
      | ActionImportParameters<ParametersT>,
    oDataUri: ODataUri
  ) {
    super(
      new ODataFunctionImportRequestConfig(
        method,
        defaultServicePath,
        actionOrFunctionImportName,
        parameters,
        oDataUri
      )
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
