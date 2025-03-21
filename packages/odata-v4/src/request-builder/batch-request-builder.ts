import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  parseBatchResponse,
  BatchRequestBuilder,
  deserializeBatchResponse
} from '@sap-cloud-sdk/odata-common/internal';
import { entityDeserializer } from '../de-serializers';
import { responseDataAccessor } from './response-data-accessor';
import type { HttpDestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import type { DefaultDeSerializers, DeSerializers } from '../de-serializers';
import type { BatchResponse } from '../batch-response';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i.e. {@link GetAllRequestBuilder | getAll} and {@link GetByKeyRequestBuilder | getByKey} requests and change sets, which in turn can contain {@link CreateRequestBuilder | create}, {@link UpdateRequestBuilder | update} or {@link DeleteRequestBuilder | delete} requests.
 * The retrieve and change sets will be executed in order, while the order within a change set can vary.
 */
export class ODataBatchRequestBuilder<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> extends BatchRequestBuilder<DeSerializersT> {
  /**
   * Execute the given request and return the according promise. Please notice: The sub-requests may fail even the main request is successful.
   * @param destination - Targeted destination or DestinationFetchOptions on which the request is performed.
   * @returns Promise resolving to the requested data.
   */
  async execute(
    destination: HttpDestinationOrFetchOptions
  ): Promise<BatchResponse<DeSerializersT>[]> {
    return this.executeRaw(destination)
      .then(response => parseBatchResponse(response))
      .then(parsedResponse =>
        deserializeBatchResponse(
          parsedResponse,
          this.getEntityToApiMap(),
          responseDataAccessor,
          entityDeserializer(this.deSerializers!)
        )
      )
      .catch(error => {
        throw new ErrorWithCause('Batch request failed!', error);
      });
  }
}
