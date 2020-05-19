/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ODataBatchRequestConfig } from '../../common/request/odata-batch-request-config';

export class ODataBatchConfig extends ODataBatchRequestConfig {
  /**
   * @deprecated Since v1.21.0. Use superclass instead.
   * Creates an instance of ODataBatchConfig.
   *
   * @param defaultServicePath - The default OData service path
   * @param batchId - The batch id for building the header and the payload.
   */
  constructor(defaultServicePath: string, batchId: string) {
    super(defaultServicePath, batchId);
  }
}
