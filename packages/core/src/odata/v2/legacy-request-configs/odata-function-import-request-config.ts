/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { odataUriV2 } from '../uri-conversion';
import { FunctionImportParameters } from '../../common/request/function-import-parameter';
import { ODataFunctionImportRequestConfig as Base } from '../../common/request/odata-function-import-request-config';
import { RequestMethodType } from '../../common';

/**
 * @deprecated Since v1.21.0. Use superclass instead.
 * OData function import request configuration for a set of parameters.
 *
 * @typeparam ParametersT - Type of the original parameters object
 */
export class ODataFunctionImportRequestConfig<ParametersT> extends Base<
  ParametersT
> {
  /**
   * Creates an instance of ODataFunctionImportRequestConfig.
   *
   * @param method - HTTP method for the request
   * @param defaultServicePath - Default path of the service
   * @param functionImportName - The name of the function import.
   * @param parameters - Object containing the parameters with a value and additional meta information
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    functionImportName: string,
    parameters: FunctionImportParameters<ParametersT>
  ) {
    super(
      method,
      defaultServicePath,
      functionImportName,
      parameters,
      odataUriV2
    );
  }
}
