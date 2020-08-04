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
   * @param payload - Object containing the payload passed as the body
   */
  constructor(
    defaultServicePath: string,
    readonly actionImportName: string,
    payload: ActionImportPayload<ParametersT>
  ) {
    super('post', defaultServicePath);
    this.payload = this.buildHttpPayload(payload)
  }

  private buildHttpPayload(payload:ActionImportPayload<ParametersT>):MapType<any> {
    const httpPayload = Object.keys(payload).reduce((all, key) => {
      const payloadElement: ActionImportPayloadElement<ParametersT> =
        payload[key];
      if (typeof payloadElement.value !== 'undefined') {
        all[payloadElement.originalName] = payloadElement.value;
      }
      return all;
    }, {});

    return httpPayload;
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
