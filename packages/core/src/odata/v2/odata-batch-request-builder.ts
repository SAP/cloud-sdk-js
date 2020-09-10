/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { v4 as uuid } from 'uuid';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationOptions,
  toDestinationNameUrl
} from '../../scp-cf';
import { Constructable, BatchResponse } from '../common';
import { MethodRequestBuilderBase } from '../common/request-builder/request-builder-base';
import { ODataBatchRequestConfig } from '../common/request/odata-batch-request-config';
import { EntityV2 } from './entity';
import {
  toBatchChangeSetV2,
  ODataBatchChangeSetV2
} from './odata-batch-change-set';
import { toBatchRetrieveBodyV2 } from './odata-batch-retrieve-request';
import {
  CreateRequestBuilderV2,
  DeleteRequestBuilderV2,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  UpdateRequestBuilderV2
} from './request-builder';
import {
  detectNewLineSymbol,
  partitionBatchResponse,
  buildRetrieveOrErrorResponse,
  buildWriteResponses
} from './batch-response-parser';

/**
 * The OData batch request builder to build a batch, which consists of an ordered retrieve requests or change sets.
 */
export class ODataBatchRequestBuilderV2 extends MethodRequestBuilderBase<
  ODataBatchRequestConfig
> {
  typedRequestProperty;

  /**
   * Creates an instance of ODataBatchRequestBuilder.
   *
   * @param defaultServicePath - Service path
   * @param requests - An array of retrieve requests or change sets
   * @param entityToConstructorMap - A map that holds the entity type to constructor mapping
   */
  constructor(
    readonly defaultServicePath: string,
    readonly requests: (
      | ODataBatchChangeSetV2<
          | CreateRequestBuilderV2<EntityV2>
          | UpdateRequestBuilderV2<EntityV2>
          | DeleteRequestBuilderV2<EntityV2>
        >
      | GetAllRequestBuilderV2<EntityV2>
      | GetByKeyRequestBuilderV2<EntityV2>
    )[],
    readonly entityToConstructorMap: MapType<Constructable<EntityV2>>
  ) {
    super(new ODataBatchRequestConfig(defaultServicePath, uuid()));

    this.requestConfig.payload = getPayload(requests, this.requestConfig);
  }

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
      .then(request => request.execute())
      .then(response =>
        buildResponses(
          partitionBatchResponse(response),
          this.entityToConstructorMap,
          detectNewLineSymbol(response.data)
        )
      )
      .catch(error =>
        Promise.reject(
          errorWithCause(
            `The batch request failed! The destination provided: ${toDestinationNameUrl(
              destination
            )} and the options: ${options}.`,
            error
          )
        )
      );
  }
}

/**
 * Convert the given requests to the payload of the batch.
 *
 * @param requests - Requests of the batch.
 * @param requestConfig - The batch request configuration.
 * @returns The generated payload.
 */
export function getPayload(
  requests: (
    | ODataBatchChangeSetV2<
        | CreateRequestBuilderV2<EntityV2>
        | UpdateRequestBuilderV2<EntityV2>
        | DeleteRequestBuilderV2<EntityV2>
      >
    | GetAllRequestBuilderV2<EntityV2>
    | GetByKeyRequestBuilderV2<EntityV2>
  )[],
  requestConfig: ODataBatchRequestConfig
): string {
  const payloads = requests.map(toRequestBody).filter(b => !!b);
  if (payloads.length > 0) {
    return (
      payloads
        .map(
          part =>
            getBatchRequestStartWithLineBreak(requestConfig.batchId) + part
        )
        .join('\n') +
      '\n' +
      getEndBatchWithLineBreak(requestConfig.batchId)
    );
  }
  return '';
}

function toRequestBody<
  T extends
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
>(
  request:
    | ODataBatchChangeSetV2<T>
    | GetAllRequestBuilderV2<EntityV2>
    | GetByKeyRequestBuilderV2<EntityV2>
): string | undefined {
  if (
    request instanceof GetAllRequestBuilderV2 ||
    request instanceof GetByKeyRequestBuilderV2
  ) {
    return toBatchRetrieveBodyV2(request);
  }
  if (request instanceof ODataBatchChangeSetV2) {
    return toBatchChangeSetV2(request);
  }
  throw Error(
    'The given request is not a valid retrieve request or change set.'
  );
}

function buildResponses(
  responses: string[],
  entityToConstructorMap: MapType<Constructable<EntityV2>>,
  lineBreak: string
): BatchResponse[] {
  return responses.map(r =>
    buildResponse(r, entityToConstructorMap, lineBreak)
  );
}

function buildResponse(
  response: string,
  entityToConstructorMap: MapType<Constructable<EntityV2>>,
  lineBreak: string
) {
  if (isChangeSet(response)) {
    return buildWriteResponses(response, entityToConstructorMap, lineBreak);
  }
  if (isRetrieveRequestOrError(response)) {
    return buildRetrieveOrErrorResponse(
      response,
      entityToConstructorMap,
      lineBreak
    );
  }
  throw Error(
    `The response: ${JSON.stringify(
      response
    )} is not a valid retrieve request or change set, because it does not contain the proper Content-Type.`
  );
}

function getBatchRequestStartWithLineBreak(batchId: string) {
  return `--batch_${batchId}\n`;
}

function getEndBatchWithLineBreak(batchId: string) {
  return `--batch_${batchId}--\n`;
}

function isChangeSet(response: string): boolean {
  return !!response.match(/Content-Type: multipart\/mixed;/);
}

function isRetrieveRequestOrError(response: string): boolean {
  return !!response.match(/Content-Type: application\/http/);
}

export { ODataBatchRequestBuilderV2 as ODataBatchRequestBuilder };
