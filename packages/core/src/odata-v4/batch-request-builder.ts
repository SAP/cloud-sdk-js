/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationOptions
} from '../connectivity/scp-cf';
import { BatchResponse } from '../odata-common';
import { parseBatchResponse } from '../odata-common/request-builder/batch/batch-response-parser';
import { BatchRequestBuilder } from '../odata-common/request-builder/batch/batch-request-builder';
import { deserializeBatchResponse } from '../odata-common/request-builder/batch/batch-response-deserializer';
import { responseDataAccessor } from './request-builder/response-data-accessor';
import { entityDeserializer } from './entity-deserializer';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. [[GetAllRequestBuilder | getAll]] and [[GetByKeyRequestBuilder | getByKey]] requests and change sets, which in turn can contain [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] requests.
 * The retrieve and change sets will be excuted in order, while the order within a change set can vary.
 */
export class ODataBatchRequestBuilder extends BatchRequestBuilder {
  /**
   * Execute the given request and return the according promise. Please notice: The sub-requests may fail even the main request is successful.
   *
   * @param destination - Targeted destination on which the request is performed.
   * @param options - Options to employ when fetching destinations.
   * @returns Promise resolving to the requested data.
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<BatchResponse[]> {
    return this.executeRaw(destination, options)
      .then((response) => parseBatchResponse(response))
      .then(parsedResponse =>
        deserializeBatchResponse(
          parsedResponse,
          this.entityToConstructorMap,
          responseDataAccessor,
          entityDeserializer
        )
      )
      .catch(error => {
        throw new ErrorWithCause('Batch request failed!', error);
      });
  }
}

export { ODataBatchRequestBuilder as ODataBatchRequestBuilderV4 };
