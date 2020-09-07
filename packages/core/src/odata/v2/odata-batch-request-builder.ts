/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { last } from 'rambda';
import { v4 as uuid } from 'uuid';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationOptions,
  toDestinationNameUrl
} from '../../scp-cf';
import {
  Constructable,
  BatchResponse,
  WriteResponse,
  WriteResponses,
  ReadResponse,
  ErrorResponse,
  changesetIdPrefix
} from '../common';
import { MethodRequestBuilderBase } from '../common/request-builder/request-builder-base';
import { ODataBatchRequestConfig } from '../common/request/odata-batch-request-config';
import { EntityV2 } from './entity';
import { deserializeEntityV2 } from './entity-deserializer';
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
  isCollectionResult,
  getCollectionResult,
  getSingleResult
} from './request-builder/response-data-accessor';

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
          partitionBatchResponse(
            response.data,
            this.detectNewLineSymbol(response)
          ),
          this.entityToConstructorMap,
          this.detectNewLineSymbol(response)
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

  public detectNewLineSymbol(response: any): string {
    const body = response.data;
    if (body.includes('\r\n')) {
      return '\r\n';
    }
    if (body.split('\n').length > 1) {
      return '\n';
    }
    throw new Error(`Cannot detect line breaks in the response body: ${body}.`);
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

function asReadResponse(body) {
  return <T extends EntityV2>(constructor: Constructable<T>): Error | T[] => {
    if (body.error) {
      return new Error(body.error);
    }
    if (isCollectionResult(body)) {
      return getCollectionResult(body).map(r =>
        deserializeEntityV2(r, constructor)
      );
    }
    return [deserializeEntityV2(getSingleResult(body), constructor)];
  };
}

function asWriteResponse(body) {
  return <T extends EntityV2>(constructor: Constructable<T>) => {
    const resultData = getSingleResult(body);
    if (!resultData.__metadata) {
      throw Error('The metadata of the response body is undefined.');
    }

    return deserializeEntityV2(resultData, constructor);
  };
}

/*
E.g. response:
--batch_1234
part 1
--batch_1234
part 2
--batch_1234--
 */
export function partitionBatchResponse(
  response: string,
  lineBreak: string
): string[] {
  response = response.trim();
  if (!response) {
    return [];
  }

  const [batchSeparator] = response.split(lineBreak, 1);
  if (!batchSeparator.startsWith('--')) {
    throw new Error(
      "Could not parse batch response. Expected response to start with '--'."
    );
  }

  // E.g., ['', part 1, part 2, '--']
  const parts = response.split(batchSeparator).map(line => line.trim());

  // Consider throwing an error if there are not at least three parts
  // According to the example above, the min. length to be valid is 3, where the 1st and last elements should be removed.
  return parts.length >= 3 ? parts.slice(1, parts.length - 1) : [];
}

export function partitionChangeSetResponse(
  response: string,
  lineBreak: string
): string[] {
  const [firstLine] = response.split(lineBreak, 1);
  if (!firstLine) {
    throw Error('Cannot parse change set.');
  }
  const changeSetId = last(firstLine.split(changesetIdPrefix));
  const parts = response.split(`--${changeSetId}`).map(line => line.trim());
  return parts.length >= 3 ? parts.slice(1, parts.length - 1) : [];
}

/*
Response example:
--454DB24613455B1D7FBA89D16B5D9D610
Content-Type: application/http
Content-Length: 2833
content-transfer-encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 2626
sap-metadata-last-modified: Wed, 04 Sep 2019 14:52:57 GMT
cache-control: no-store, no-cache
dataserviceversion: 2.0

{"d":{"results":["something"]}}
--454DB24613455B1D7FBA89D16B5D9D610

This function actually gets the response body!
 */
export function trimRetrieveHeaders(
  retrieveResponse: string,
  lineBreak: string
): string {
  const lines = retrieveResponse.split(lineBreak);

  // A valid response should contain at least three lines, part id, empty line and response body.
  if (lines.length >= 3) {
    return lines[lines.length - 1];
  }

  throw Error(
    `Cannot parse batch subrequest response body. Expected at least three lines in the response, got ${lines.length}.`
  );
}

function toConstructableFromChangeSetResponse(
  responseBody: any,
  entityToConstructorMap: MapType<Constructable<EntityV2>>
): Constructable<EntityV2> | undefined {
  return entityToConstructorMap[
    getEntityNameFromMetadata(getSingleResult(responseBody).__metadata)
  ];
}

function toConstructableFromRetrieveResponse(
  responseBody: any,
  entityToConstructorMap: MapType<Constructable<EntityV2>>
): Constructable<EntityV2> {
  const entityJson = isCollectionResult(responseBody)
    ? getCollectionResult(responseBody)[0]
    : getSingleResult(responseBody);

  return entityToConstructorMap[
    getEntityNameFromMetadata(entityJson.__metadata)
  ];
}

export function getEntityNameFromMetadata(metadata: MapType<string>): string {
  const entityUri = metadata.uri;
  if (!entityUri) {
    throw new Error(
      `Could not retrieve entity name from metadata. URI was: '${entityUri}'.`
    );
  }
  const [pathBeforeQuery] = entityUri.split('?');
  const [pathBeforeKeys] = pathBeforeQuery.split('(');
  const uriParts = pathBeforeKeys.split('/');

  // Remove another part in case of a trailing slash
  const entityName = uriParts.pop() || uriParts.pop();
  if (!entityName) {
    throw Error(
      `Could not retrieve entity name from metadata. Unknown URI format. URI was: '${entityUri}'.`
    );
  }
  return entityName;
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

function isNoContent(response: string): boolean {
  return !!response.match(/HTTP\/\d\.\d 204 No Content/);
}

function isCreated(response: string): boolean {
  return !!response.match(/HTTP\/\d\.\d 201 Created/);
}

export function toHttpCode(response: string): number {
  const group = response.match(/HTTP\/\d\.\d (\d{3}).*?/);

  if (group) {
    return parseInt(group[1].toString());
  }

  throw new Error('Cannot parse http code of the response.');
}

export function toWriteResponseArray(
  response: string,
  lineBreak: string,
  entityToConstructorMap: MapType<Constructable<EntityV2>>
): WriteResponse[] {
  return partitionChangeSetResponse(response, lineBreak).map(r => {
    if (isNoContent(r)) {
      return { httpCode: 204 };
    }
    if (isCreated(response)) {
      const parsedBody = JSON.parse(trimRetrieveHeaders(r, lineBreak));
      const entityType = toConstructableFromChangeSetResponse(
        parsedBody,
        entityToConstructorMap
      );
      if (!entityType) {
        throw Error(`Cannot find the type from the parsedBody: ${parsedBody}`);
      }
      return {
        httpCode: 201,
        body: parsedBody,
        type: entityType!,
        as: asWriteResponse(parsedBody)
      };
    }
    throw new Error(
      `The request failed because http code of the response: ${r} is not 201/204.`
    );
  });
}

function buildWriteResponses(
  response: string,
  entityToConstructorMap: MapType<Constructable<EntityV2>>,
  lineBreak: string
): WriteResponses {
  const writeResponses = toWriteResponseArray(
    response,
    lineBreak,
    entityToConstructorMap
  );
  return { responses: writeResponses, isSuccess: () => true };
}

function buildRetrieveOrErrorResponse(
  response: string,
  entityToConstructorMap: MapType<Constructable<EntityV2>>,
  lineBreak: string
): ReadResponse | ErrorResponse {
  const parsedBody = JSON.parse(trimRetrieveHeaders(response, lineBreak));
  const httpCode = toHttpCode(response);
  if (httpCode === 200) {
    return {
      httpCode,
      body: parsedBody,
      type: toConstructableFromRetrieveResponse(
        parsedBody,
        entityToConstructorMap
      ),
      as: asReadResponse(parsedBody),
      isSuccess: () => true
    };
  }
  return { httpCode, body: parsedBody, isSuccess: () => false };
}

export { ODataBatchRequestBuilderV2 as ODataBatchRequestBuilder };
