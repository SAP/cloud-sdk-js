import { first } from '@sap-cloud-sdk/util';
import { ODataBatchRequestConfig } from '../../request';
import { MethodRequestBuilder } from '../request-builder-base';
import { BatchChangeSet } from './batch-change-set';
import { serializeBatchRequest } from './batch-request-serializer';
import type { HttpDestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import type { HttpResponse } from '@sap-cloud-sdk/http-client';
import type { DefaultDeSerializers, DeSerializers } from '../../de-serializers';
import type { EntityApi } from '../../entity-api';
import type { EntityBase } from '../../entity-base';
import type { ODataRequestConfig, ODataRequest } from '../../request';
import type { OperationRequestBuilderBase } from '../operation-request-builder-base';
import type { GetAllRequestBuilderBase } from '../get-all-request-builder-base';
import type { GetByKeyRequestBuilderBase } from '../get-by-key-request-builder-base';
import type { ChangesetBuilderTypes } from './batch-change-set';
import type { BatchSubRequestPathType } from './batch-request-options';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. {@link GetAllRequestBuilder | getAll} and {@link GetByKeyRequestBuilder | getByKey} requests and change sets, which in turn can contain {@link CreateRequestBuilder | create}, {@link UpdateRequestBuilder | update} or {@link DeleteRequestBuilder | delete} requests.
 * The retrieve and change sets will be executed in order, while the order within a change set can vary.
 * @internal
 */
export class BatchRequestBuilder<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> extends MethodRequestBuilder<ODataBatchRequestConfig> {
  // FIXME: MethodRequestBuilder is too broad here. Should be getAll and getByKey
  readonly deSerializers: DeSerializersT | undefined;

  /**
   * Creates an instance of ODataBatchRequestBuilder.
   * @param defaultBasePath - Base path.
   * @param requests - An array of retrieve requests or change sets.
   */
  constructor(
    readonly defaultBasePath: string,
    readonly requests: (
      | BatchChangeSet<DeSerializersT>
      | GetAllRequestBuilderBase<EntityBase, DeSerializersT>
      | GetByKeyRequestBuilderBase<EntityBase, DeSerializersT>
      | Omit<
          OperationRequestBuilderBase<
            DeSerializersT,
            unknown,
            ODataRequestConfig
          >,
          'execute'
        >
    )[]
  ) {
    super(new ODataBatchRequestConfig(defaultBasePath));

    const entityApi = first(Object.values(this.getEntityToApiMap()));
    this.deSerializers =
      entityApi?.deSerializers || this.getOperationDeserializers(requests);
  }

  withSubRequestPathType(subRequestPathType: BatchSubRequestPathType): this {
    this.requestConfig.withSubRequestPathType(subRequestPathType);
    return this;
  }

  build(): ODataRequest<ODataBatchRequestConfig>;
  build(
    destination: HttpDestinationOrFetchOptions
  ): Promise<ODataRequest<ODataBatchRequestConfig>>;
  build(
    destination?: HttpDestinationOrFetchOptions
  ):
    | ODataRequest<ODataBatchRequestConfig>
    | Promise<ODataRequest<ODataBatchRequestConfig>> {
    return destination
      ? super.build(destination!).then(request => this.setPayload(request))
      : this.setPayload(super.build());
  }

  /**
   * Execute request and return an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   */
  async executeRaw(
    destination: HttpDestinationOrFetchOptions
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
          ? buildMapEntries<DeSerializersT>(request)
          : buildMapEntry<DeSerializersT>(request))
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

  private getOperationDeserializers(
    requests: (
      | BatchChangeSet<DeSerializersT>
      | GetAllRequestBuilderBase<EntityBase, DeSerializersT>
      | GetByKeyRequestBuilderBase<EntityBase, DeSerializersT>
      | Omit<
          OperationRequestBuilderBase<
            DeSerializersT,
            unknown,
            ODataRequestConfig
          >,
          'execute'
        >
    )[]
  ) {
    const outerRequest = first(requests);
    if (outerRequest instanceof BatchChangeSet) {
      const innerRequest = first(outerRequest.requests);
      if (innerRequest && isActionOrFunctionImport(innerRequest)) {
        return innerRequest._deSerializers;
      }
    }
  }
}

type AllBuilderTypes<DeSerializersT extends DeSerializers> =
  | ChangesetBuilderTypes<DeSerializersT>
  | GetAllRequestBuilderBase<EntityBase, DeSerializersT>
  | GetByKeyRequestBuilderBase<EntityBase, DeSerializersT>;

function isActionOrFunctionImport<DeSerializersT extends DeSerializers>(
  req: AllBuilderTypes<DeSerializersT>
): req is Omit<OperationRequestBuilderBase<any, any, any>, 'execute'> {
  return !!(
    req.requestConfig['functionName'] ?? req.requestConfig['actionName']
  );
}

function buildMapEntries<DeSerializersT extends DeSerializers>(
  changeSet: BatchChangeSet<DeSerializersT>
): Record<string, EntityApi<EntityBase, DeSerializersT>> {
  return changeSet.requests.reduce(
    (changeSetApis, changesetReq) =>
      isActionOrFunctionImport(changesetReq)
        ? changeSetApis
        : { ...changeSetApis, ...buildMapEntry(changesetReq) },
    {}
  );
}

function buildMapEntry<DeSerializersT extends DeSerializers>(
  request: AllBuilderTypes<DeSerializersT>
): Record<string, EntityApi<EntityBase, DeSerializersT>> {
  return isActionOrFunctionImport(request)
    ? {}
    : {
        [request._entityApi.entityConstructor._entityName]: request._entityApi
      };
}
