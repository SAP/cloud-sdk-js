/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { ODataUri } from '../../common/uri-conversion';
import { FunctionImportParameters } from '../../common/request/function-import-parameter';
import { ODataRequestConfig } from '../../common/request/odata-request-config';

export class ODataActionImportRequestConfig<
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataActionImportRequestConfig.
   *
   * @param defaultServicePath - Default path of the service
   * @param actionImportName - The name of the action import.
   * @param parameters - Object containing the parameters with a value and additional meta information
   */
  constructor(
    defaultServicePath: string,
    readonly actionImportName: string,
    public parameters: FunctionImportParameters<ParametersT>,
    private oDataUri: ODataUri
  ) {
    super('post', defaultServicePath);
  }

  resourcePath(): string {
    return this.actionImportName;
  }

  queryParameters(): MapType<any> {
    return {};
  }
}
