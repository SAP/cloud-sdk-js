/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationOptions
} from '../../../scp-cf';
import { BatchResponse } from '../../common';
import { parseBatchResponse } from '../../common/request-builder/batch/batch-response-parser';
import { BatchRequestBuilder } from '../../common/request-builder/batch/batch-request-builder';
import { deserializeBatchResponse } from '../../common/request-builder/batch/batch-response-deserializer';
import { serializeBatchRequest } from '../../common/request-builder/batch/batch-request-serializer';
import { entityDeserializerV2 } from '../entity-deserializer';
import { responseDataAccessorV2 } from './response-data-accessor';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. [[GetAllRequestBuilder | getAll]] and [[GetByKeyRequestBuilder | getByKey]] requests and change sets, which in turn can contain [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] requests.
 * The retrieve and change sets will be excuted in order, while the order within a change set can vary.
 */
export class ODataBatchRequestBuilderV2 extends BatchRequestBuilder {
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
    return this.build(destination, options)
      .then(request => {
        this.requestConfig.payload = serializeBatchRequest(this, {
          ...this.requestConfig.options,
          destination: request.destination!
        });
        return request;
      })
      .then(request => request.execute())
      .then(response => parseBatchResponse(response))
      .then(parsedResponse =>
        deserializeBatchResponse(
          parsedResponse,
          this.entityToConstructorMap,
          responseDataAccessorV2,
          entityDeserializerV2
        )
      )
      .catch(error =>
        Promise.reject(errorWithCause('Batch request failed!', error))
      );
  }
}

export { ODataBatchRequestBuilderV2 as ODataBatchRequestBuilder };
