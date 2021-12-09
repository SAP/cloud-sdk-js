import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationFetchOptions
} from '@sap-cloud-sdk/connectivity';
import {
  deserializeBatchResponse,
  BatchResponse,
  parseBatchResponse,
  BatchRequestBuilder,
  entityDeserializer
} from '@sap-cloud-sdk/odata-common/internal';
import { extractODataEtag } from '../extract-odata-etag';
import { DeSerializers } from '../de-serializers/de-serializers';
import {
  getLinkedCollectionResult,
  responseDataAccessor
} from './response-data-accessor';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. [[GetAllRequestBuilder | getAll]] and [[GetByKeyRequestBuilder | getByKey]] requests and change sets, which in turn can contain [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] requests.
 * The retrieve and change sets will be executed in order, while the order within a change set can vary.
 */
export class ODataBatchRequestBuilder<
  DeSerializersT extends DeSerializers
> extends BatchRequestBuilder<DeSerializersT> {
  private deSerializers: DeSerializersT;

  /**
   * Execute the given request and return the according promise. Please notice: The sub-requests may fail even the main request is successful.
   * @param destination - Targeted destination or DestinationFetchOptions on which the request is performed.
   * @param options - Options to employ when fetching destinations.
   * @returns Promise resolving to the requested data.
   */
  async execute(
    destination: Destination | DestinationFetchOptions
  ): Promise<BatchResponse<DeSerializersT>[]> {
    return this.executeRaw(destination)
      .then(response => parseBatchResponse(response))
      .then(parsedResponse =>
        deserializeBatchResponse(
          parsedResponse,
          this.getEntityToApiMap(),
          responseDataAccessor,
          entityDeserializer(
            this.deSerializers,
            extractODataEtag,
            getLinkedCollectionResult
          )
        )
      )
      .catch(error => {
        throw new ErrorWithCause('Batch request failed!', error);
      });
  }
}
