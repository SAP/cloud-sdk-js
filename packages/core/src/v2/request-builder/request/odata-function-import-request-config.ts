/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import {
  ODataRequestConfig,
  RequestMethodType
} from '../../../common/request-builder/request/odata-request-config';
import {
  FunctionImportParameters,
  FunctionImportParameter
} from '../../../common';
import { convertToUriFormat } from './uri-conversion/uri-value-converter';

/**
 * OData function import request configuration for a set of parameters.
 *
 * @typeparam ParametersT - Type of the original parameters object
 */
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
    public parameters: FunctionImportParameters<ParametersT>
  ) {
    super(method, defaultServicePath);
  }

  resourcePath(): string {
    return this.functionImportName;
  }

  queryParameters(): MapType<any> {
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
            queryParams: MapType<any>,
            parameter: FunctionImportParameter<ParametersT>
          ) => {
            queryParams[parameter.originalName] = convertToUriFormat(
              parameter.value,
              parameter.edmType
            );
            return queryParams;
          },
          {}
        ) as MapType<any>)
    };
  }
}
