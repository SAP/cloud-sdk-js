/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ODataUri } from '../uri-conversion';
import {
  FunctionImportParameter,
  FunctionImportParameters
} from './function-import-parameter';
import { ODataRequestConfig, RequestMethodType } from './odata-request-config';

export class ODataFunctionImportRequestConfig<
  ParametersT
> extends ODataRequestConfig {
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
    readonly functionImportName: string,
    public parameters: FunctionImportParameters<ParametersT>,
    private oDataUri: ODataUri
  ) {
    super(method, defaultServicePath);
  }

  resourcePath(): string {
    return this.functionImportName;
  }

  queryParameters(): Record<string, any> {
    return {
      ...this.prependDollarToQueryParameters({
        format: 'json'
      }),
      ...(Object.values(this.parameters)
        .filter(
          (parameter: FunctionImportParameter<ParametersT>) =>
            typeof parameter.value !== 'undefined'
        )
        .reduce(
          (
            queryParams: Record<string, any>,
            parameter: FunctionImportParameter<ParametersT>
          ) => {
            queryParams[
              parameter.originalName
            ] = this.oDataUri.convertToUriFormat(
              parameter.value,
              parameter.edmType
            );
            return queryParams;
          },
          {}
        ) as Record<string, any>)
    };
  }
}
