/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { MapType } from '@sap-cloud-sdk/util';
import { ODataRequestConfig } from './index';

export class ODataBatchConfig extends ODataRequestConfig {
  static readonly content_type_prefix = 'multipart/mixed; boundary=batch_';

  /**
   * Creates an instance of ODataBatchConfig.
   *
   * @param defaultServicePath - The default OData service path
   * @param batchId - The batch id for building the header and the payload.
   */
  constructor(readonly defaultServicePath: string, readonly batchId: string) {
    super('post', defaultServicePath, `${ODataBatchConfig.content_type_prefix}${batchId}`);
  }

  resourcePath(): string {
    return '$batch';
  }

  queryParameters(): MapType<any> {
    return {};
  }
}
