/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { ODataUri } from '../../common/uri-conversion';
import { ActionImportParameters } from '../../v4';
import { ODataRequestConfig } from '../../common/request/odata-request-config';

export class ODataActionImportRequestConfig<
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataActionImportRequestConfig.
   *
   * @param defaultServicePath - Default path of the service
   * @param actionImportName - The name of the action import.
   * @param parameters - Object containing the parameters passed as the body
   */
  constructor(
    defaultServicePath: string,
    readonly actionImportName: string,
    parameters: ActionImportParameters<ParametersT>,
    private oDataUri: ODataUri
  ) {
    super('post', defaultServicePath);
    this.payload = parameters
  }

  resourcePath(): string {
    return this.actionImportName;
  }

  queryParameters(): MapType<any> {
    return {};
  }
}
