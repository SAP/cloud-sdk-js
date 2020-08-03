/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { ODataRequestConfig } from '../../common/request/odata-request-config';
import {
  ActionImportPayload,
  ActionImportPayloadElement
} from './action-import-payload';

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
    parameters: ActionImportPayload<ParametersT>
  ) {
    super('post', defaultServicePath);
    this.payload = Object.keys(parameters).reduce((all, key) => {
      const payloadElement: ActionImportPayloadElement<ParametersT> =
        parameters[key];
      if (payloadElement) {
        all[payloadElement.originalName] = payloadElement.value;
      }
      return all;
    }, {});
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
}
