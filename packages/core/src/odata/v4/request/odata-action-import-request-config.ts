/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { ODataRequestConfig } from '../../common/request/odata-request-config';
import {
  ActionImportParameters,
  ActionImportParameter
} from './action-import-parameter';

export class ODataActionImportRequestConfig<
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataActionImportRequestConfig.
   *
   * @param defaultServicePath - Default path of the service
   * @param actionImportName - The name of the action import.
   * @param parameters - Parameters of the action imports
   */
  constructor(
    defaultServicePath: string,
    readonly actionImportName: string,
    parameters: ActionImportParameters<ParametersT>
  ) {
    super('post', defaultServicePath);
    this.payload = this.buildHttpPayload(parameters);
  }

  resourcePath(): string {
    return this.actionImportName;
  }

  queryParameters(): MapType<any> {
    return {
      ...this.prependDollarToQueryParameters({
        format: 'json'
      })
    };
  }

  private buildHttpPayload(
    parameters: ActionImportParameters<ParametersT>
  ): MapType<any> {
    const payload = Object.keys(parameters).reduce((all, key) => {
      const payloadElement: ActionImportParameter<ParametersT> =
        parameters[key];
      if (typeof payloadElement.value !== 'undefined') {
        all[payloadElement.originalName] = payloadElement.value;
      }
      return all;
    }, {});

    return payload;
  }
}
