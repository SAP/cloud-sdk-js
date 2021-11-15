import {
  Destination,
  DestinationFetchOptions
} from '@sap-cloud-sdk/connectivity';
// eslint-disable-next-line import/no-internal-modules
import { HttpResponse } from '@sap-cloud-sdk/http-client/internal';
import { MethodRequestBuilder } from '../request-builder-base';
import { ODataBatchRequestConfig } from '../../request/odata-batch-request-config';
import { Constructable, EntityBase } from '../../entity-base';
import { ODataRequest } from '../../request/odata-request';
import { BatchChangeSet } from './batch-change-set';
import { BatchSubRequestPathType } from './batch-request-options';
import { serializeBatchRequest } from './batch-request-serializer';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. [[GetAllRequestBuilder | getAll]] and [[GetByKeyRequestBuilder | getByKey]] requests and change sets, which in turn can contain [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] requests.
 * The retrieve and change sets will be executed in order, while the order within a change set can vary.
 */
export class BatchRequestBuilder extends MethodRequestBuilder<ODataBatchRequestConfig> {
  // FIXME: MethodRequestBuilder is too broad here. Should be getAll and getByKey
  /**
   * Creates an instance of ODataBatchRequestBuilder.
   * @param defaultServicePath - Service path
   * @param requests - An array of retrieve requests or change sets
   * @param entityToConstructorMap - A map that holds the entity type to constructor mapping
   */
  constructor(
    readonly defaultServicePath: string,
    readonly requests: (BatchChangeSet | MethodRequestBuilder)[],
    readonly entityToConstructorMap: Record<string, Constructable<EntityBase>>
  ) {
    super(new ODataBatchRequestConfig(defaultServicePath));
  }

  withSubRequestPathType(subRequestPathType: BatchSubRequestPathType): this {
    this.requestConfig.withSubRequestPathType(subRequestPathType);
    return this;
  }

  build(): ODataRequest<ODataBatchRequestConfig>;
  build(
    destination: Destination | DestinationFetchOptions
  ): Promise<ODataRequest<ODataBatchRequestConfig>>;
  build(
    destination?: Destination | DestinationFetchOptions
  ):
    | ODataRequest<ODataBatchRequestConfig>
    | Promise<ODataRequest<ODataBatchRequestConfig>> {
    return destination
      ? super.build(destination!).then(request => this.setPayload(request))
      : this.setPayload(super.build());
  }

  /**
   * Execute request and return an [[HttpResponse]].
   * @param destination - Destination or DestinationFetchOptions to execute the request against
   * @returns A promise resolving to an [[HttpResponse]].
   */
  async executeRaw(
    destination: Destination | DestinationFetchOptions
  ): Promise<HttpResponse> {
    return this.build(destination).then(request => request.execute());
  }

  private setPayload(
    request: ODataRequest<ODataBatchRequestConfig>
  ): ODataRequest<ODataBatchRequestConfig> {
    request.config.payload = serializeBatchRequest(this, {
      subRequestPathType: request.config.subRequestPathType,
      destination: request.destination!
    });
    return request;
  }
}
