import {
  Destination,
  DestinationFetchOptions
} from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { MethodRequestBuilder } from '../request-builder-base';
import { ODataBatchRequestConfig, ODataRequest } from '../../request';
import { DefaultDeSerializers, DeSerializers } from '../../de-serializers';
import { EntityApi, EntityBase } from '../../entity-base';
import { GetAllRequestBuilderBase } from '../get-all-request-builder-base';
import { GetByKeyRequestBuilderBase } from '../get-by-key-request-builder-base';
import { BatchChangeSet } from './batch-change-set';
import { BatchSubRequestPathType } from './batch-request-options';
import { serializeBatchRequest } from './batch-request-serializer';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. [[GetAllRequestBuilder | getAll]] and [[GetByKeyRequestBuilder | getByKey]] requests and change sets, which in turn can contain [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] requests.
 * The retrieve and change sets will be executed in order, while the order within a change set can vary.
 * @internal
 */
export class BatchRequestBuilder<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> extends MethodRequestBuilder<ODataBatchRequestConfig> {
  // FIXME: MethodRequestBuilder is too broad here. Should be getAll and getByKey
  readonly deSerializers: DeSerializersT;

  /**
   * Creates an instance of ODataBatchRequestBuilder.
   * @param defaultServicePath - Service path
   * @param requests - An array of retrieve requests or change sets
   * @param entityToConstructorMap - A map that holds the entity type to constructor mapping
   */
  constructor(
    readonly defaultServicePath: string,
    readonly requests: (
      | BatchChangeSet<DeSerializersT>
      | GetAllRequestBuilderBase<EntityBase, DeSerializersT>
      | GetByKeyRequestBuilderBase<EntityBase, DeSerializersT>
    )[] // readonly entityToConstructorMap: Record< //   string, //   EntityApi<EntityBase, DeSerializersT> // >
  ) {
    super(new ODataBatchRequestConfig(defaultServicePath));
    this.deSerializers = Object.values(this.getEntityToApiMap())[0].deSerializers;
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

  protected getEntityToApiMap(): Record<
    string,
    EntityApi<EntityBase, DeSerializersT>
  > {
    return this.requests.reduce(
      (apis, request) => ({
        ...apis,
        ...(request instanceof BatchChangeSet
          ? request.requests.reduce(
              (changeSetApis, changesetReq) => ({
                ...changeSetApis,
                [changesetReq._entityApi.entityConstructor._entityName]:
                  changesetReq._entityApi
              }),
              {}
            )
          : {
              [request._entityApi.entityConstructor._entityName]:
                request._entityApi
            })
      }),
      {}
    );
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
