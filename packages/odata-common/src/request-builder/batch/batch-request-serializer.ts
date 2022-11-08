import { unixEOL } from '@sap-cloud-sdk/util';
import voca from 'voca';
import { ODataRequest } from '../../request/odata-request';
import { ODataRequestConfig } from '../../request/odata-request-config';
import { MethodRequestBuilder } from '../request-builder-base';
import { DeSerializers } from '../../de-serializers';
import { UpdateRequestBuilderBase } from '../update-request-builder-base';
import { EntityBase } from '../../entity-base';
import { GetByKeyRequestBuilderBase } from '../get-by-key-request-builder-base';
import { CreateRequestBuilderBase } from '../create-request-builder-base';
import { DeleteRequestBuilderBase } from '../delete-request-builder-base';
import type { BatchRequestBuilder } from './batch-request-builder';
import {
  BatchRequestSerializationOptions,
  BatchSubRequestPathType
} from './batch-request-options';
import { BatchChangeSet } from './batch-change-set';

/**
 * Serialize change set to string.
 * @param changeSet - Change set containing a collection of write operations.
 * @param options - Request serialization options.
 * @returns The serialized string representation of a change set.
 * @internal
 */
export function serializeChangeSet<DeSerializersT extends DeSerializers>(
  changeSet: BatchChangeSet<DeSerializersT>,
  options: BatchRequestSerializationOptions = {}
): string | undefined {
  if (changeSet.requests.length) {
    return [
      `Content-Type: multipart/mixed; boundary=${changeSet.boundary}`,
      '',
      `--${changeSet.boundary}`,
      changeSet.requests
        .map(request => serializeRequest(request, options))
        .join(`${unixEOL}--${changeSet.boundary}${unixEOL}`),
      `--${changeSet.boundary}--`
    ].join(unixEOL);
  }
}

/**
 * Serialize a multipart request to string.
 * @param request - One of {@link GetAllRequestBuilder | getAll}, {@link GetByKeyRequestBuilder | getByKey}, {@link CreateRequestBuilder | create}, {@link UpdateRequestBuilder | update} or {@link DeleteRequestBuilder | delete} request builder.
 * @param options - Request serialization options.
 * @returns The serialized string representation of a multipart request, including the multipart headers.
 * @internal
 */
export function serializeRequest<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  request: AllBuilderTypes<EntityT, DeSerializersT>,
  options: BatchRequestSerializationOptions = {}
): string {
  const odataRequest = new ODataRequest(
    request.requestConfig,
    options.destination
  );
  const headers = {
    ...odataRequest.defaultHeaders(),
    ...odataRequest.eTagHeaders(),
    ...odataRequest.customHeaders()
  };
  const requestHeaders = Object.entries(headers).map(
    ([key, value]) => `${voca.titleCase(key)}: ${value}`
  );

  const method = request.requestConfig.method.toUpperCase();

  return [
    'Content-Type: application/http',
    'Content-Transfer-Encoding: binary',
    ...(method !== 'GET' && hasGetBatchReference(request)
      ? [`Content-Id: ${request.getBatchReference().id}`]
      : []),
    '',
    `${method} ${getUrl(odataRequest, options.subRequestPathType)} HTTP/1.1`,
    ...(requestHeaders.length ? requestHeaders : ['']),
    '',
    ...getPayload(request),
    ''
  ].join(unixEOL);
}

type AllBuilderTypes<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> =
  | Omit<MethodRequestBuilder, 'execute'>
  | CreateRequestBuilderBase<EntityT, DeSerializersT>
  | DeleteRequestBuilderBase<EntityT, DeSerializersT>
  | GetByKeyRequestBuilderBase<EntityT, DeSerializersT>
  | UpdateRequestBuilderBase<EntityT, DeSerializersT>;

type ExcludeMethodRequestBuilderType<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilderBase<EntityT, DeSerializersT>
  | DeleteRequestBuilderBase<EntityT, DeSerializersT>
  | GetByKeyRequestBuilderBase<EntityT, DeSerializersT>
  | UpdateRequestBuilderBase<EntityT, DeSerializersT>;

function hasGetBatchReference<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  request: AllBuilderTypes<EntityT, DeSerializersT>
): request is ExcludeMethodRequestBuilderType<EntityT, DeSerializersT> {
  return !!(request as ExcludeMethodRequestBuilderType<EntityT, DeSerializersT>)
    .getBatchReference;
}

function getUrl<ConfigT extends ODataRequestConfig>(
  request: ODataRequest<ConfigT>,
  subRequestPathType?: BatchSubRequestPathType
): string {
  switch (subRequestPathType) {
    case 'absolute':
      return request.url();
    case 'relativeToEntity':
      return `/${request.relativeUrl(false)}`;
    default:
      return `/${request.relativeUrl()}`;
  }
}

function getPayload(request: Omit<MethodRequestBuilder, 'execute'>): string[] {
  return request.requestConfig.method !== 'get'
    ? [JSON.stringify(request.requestConfig.payload)]
    : [];
}

function validateOptions(options: BatchRequestSerializationOptions): void {
  // This should never happen. Can only occur if requestbuilder.build() was called which will be removed.
  if (options.subRequestPathType === 'absolute' && !options.destination?.url) {
    throw new Error(
      "Cannot serialize batch request. Invalid destination provided for sub request path type 'absolute'"
    );
  }
}

/**
 * Serialize a batch request to string. This is used for the batch request payload when executing the request.
 * @param request - Batch request to serialize.
 * @param options - Request serialization options.
 * @returns String representation of the batch request.
 * @internal
 */
export function serializeBatchRequest<DeSerializersT extends DeSerializers>(
  request: BatchRequestBuilder<DeSerializersT>,
  options: BatchRequestSerializationOptions = {}
): string {
  validateOptions(options);
  const serializedSubRequests = request.requests
    .map(subRequest =>
      subRequest instanceof BatchChangeSet
        ? serializeChangeSet(subRequest, options)
        : serializeRequest(subRequest, options)
    )
    .filter(validRequest => !!validRequest)
    .join(`${unixEOL}--${request.requestConfig.boundary}${unixEOL}`);

  const serializedBatchRequest = serializedSubRequests
    ? [
        `--${request.requestConfig.boundary}`,
        serializedSubRequests,
        `--${request.requestConfig.boundary}--`,
        ''
      ].join(unixEOL)
    : serializedSubRequests;

  // The batch standard expects CRLF line endings for batch requests
  return serializedBatchRequest.replace(/\n/g, '\r\n');
}
