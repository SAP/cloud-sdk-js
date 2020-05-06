/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { head, last } from 'rambda';
import { v4 as uuid } from 'uuid';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationOptions,
  toDestinationNameUrl
} from '../scp-cf';
import {
  MethodRequestBuilderBase,
  ODataBatchConfig,
  Constructable,
  http_version
} from '../common';
import {
  BatchResponse,
  ErrorResponse,
  ReadResponse,
  WriteResponse,
  WriteResponses
} from './batch-response';
import { Entity } from './entity';
import { deserializeEntity } from './entity-deserializer';
import {
  ODataBatchChangeSet,
  toBatchChangeSet
} from './odata-batch-change-set';
import { toBatchRetrieveBody } from './odata-batch-retrieve-request';
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  UpdateRequestBuilder,
  ODataRequestConfig
} from './request-builder';

const changesetIdPrefix = 'Content-Type: multipart/mixed; boundary=';

/**
 * The OData batch request builder to build a batch, which consists of an ordered retrieve requests or change sets.
 *
 */
export class ODataBatchRequestBuilder extends MethodRequestBuilderBase<
  ODataBatchConfig
> {
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
      | ODataBatchChangeSet<
          | CreateRequestBuilder<Entity>
          | UpdateRequestBuilder<Entity>
          | DeleteRequestBuilder<Entity>
        >
      | GetAllRequestBuilder<Entity>
      | GetByKeyRequestBuilder<Entity>
    )[],
    readonly entityToConstructorMap: MapType<Constructable<Entity>>
  ) {
    super(new ODataBatchConfig(defaultServicePath, uuid()));
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
          partitionBatchResponse(response.data, this.detectLineBreak(response)),
          this.entityToConstructorMap,
          this.detectLineBreak(response)
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

  private detectLineBreak(response: any): string {
    const body = response.data;
    if (body.split('\r\n').length > 1) {
      return '\r\n';
    } else if (body.split('\n').length > 1) {
      return '\n';
    } else {
      throw new Error(
        `Cannot detect the line break of the response body: ${body}.`
      );
    }
  }
}

/**
 * Convert the given requests to the payload of the batch.
 *
 * @param requests - Requests of the batch.
 * @param requestConfig - The batch request configuration.
 * @returns The generated payload.
 */
function getPayload(
  requests: (
    | ODataBatchChangeSet<
        | CreateRequestBuilder<Entity>
        | UpdateRequestBuilder<Entity>
        | DeleteRequestBuilder<Entity>
      >
    | GetAllRequestBuilder<Entity>
    | GetByKeyRequestBuilder<Entity>
  )[],
  requestConfig: ODataBatchConfig
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
  } else {
    return '';
  }
}

function toRequestBody<
  T extends
    | CreateRequestBuilder<Entity>
    | UpdateRequestBuilder<Entity>
    | DeleteRequestBuilder<Entity>
>(
  request:
    | ODataBatchChangeSet<T>
    | GetAllRequestBuilder<Entity>
    | GetByKeyRequestBuilder<Entity>
): string | undefined {
  if (
    request instanceof GetAllRequestBuilder ||
    request instanceof GetByKeyRequestBuilder
  ) {
    return toBatchRetrieveBody(request);
  } else if (request instanceof ODataBatchChangeSet) {
    return toBatchChangeSet(request);
  } else {
    throw Error(
      `The request: ${JSON.stringify(
        request
      )} is not a valid retrieve request or change set.`
    );
  }
}

function buildResponses(
  responses: string[],
  entityToConstructorMap: MapType<Constructable<Entity>>,
  lineBreak: string
): BatchResponse[] {
  return responses.map(r =>
    buildResponse(r, entityToConstructorMap, lineBreak)
  );
}

function buildResponse(
  response: string,
  entityToConstructorMap: MapType<Constructable<Entity>>,
  lineBreak: string
) {
  if (isChangeSet(response)) {
    return buildWriteResponses(response, entityToConstructorMap, lineBreak);
  } else if (isRetrieveRequestOrError(response)) {
    return buildRetrieveOrErrorResponse(
      response,
      entityToConstructorMap,
      lineBreak
    );
  } else {
    throw Error(
      `The response: ${JSON.stringify(
        response
      )} is not a valid retrieve request or change set, because it does not contain the proper Content-Type.`
    );
  }
}

const asReadResponse = body => <T extends Entity>(
  constructor: Constructable<T>
) => {
  if (body.error) {
    return new Error(body.error);
  } else if (body.d.__metadata) {
    return [deserializeEntity(body.d, constructor)];
  } else {
    return body.d.results.map(r => deserializeEntity(r, constructor));
  }
};

const asWriteResponse = body => <T extends Entity>(
  constructor: Constructable<T>
) => {
  if (!body.d.__metadata) {
    throw Error('The metadata of the response body is undefined.');
  }

  return deserializeEntity(body.d, constructor);
};

/*
E.g. response:
--batch_1234
part 1
--batch_1234
part 2
--batch_1234--
 */
function partitionBatchResponse(response: string, lineBreak: string): string[] {
  response = response.trim();
  if (!response) {
    return [];
  }

  // E.g., --batch_1234
  const partSeparator = head(response.split(lineBreak, 1));
  if (!partSeparator) {
    throw Error(`Failed to get part separator of the response: ${response}`);
  }

  // E.g., ['', part 1, part 2, '--']
  const parts = response.split(partSeparator).map(line => line.trim());

  // According to the example above, the min. length to be valid is 3, where the 1st and last elements should be removed.
  return parts.length >= 3 ? parts.slice(1, parts.length - 1) : [];
}

function partitionChangeSetResponse(
  responseOfSingleRetrieveRequest: string,
  lineBreak: string
): string[] {
  const firstLine = head(responseOfSingleRetrieveRequest.split(lineBreak, 1));
  if (!firstLine) {
    throw Error(
      `Failed to get the first line of ${responseOfSingleRetrieveRequest}.`
    );
  }
  const changeSetId = last(firstLine.split(changesetIdPrefix));
  const parts = responseOfSingleRetrieveRequest
    .split(`--${changeSetId}`)
    .map(line => line.trim());
  return parts.length >= 3 ? parts.slice(1, parts.length - 1) : [];
}

/*
Response example:
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
 */
function trimRetrieveHeaders(
  retrieveResponse: string,
  lineBreak: string
): string {
  const lines = retrieveResponse.split(lineBreak);

  // A valid response should contain at least the line with the data and the line with the part id.
  if (lines.length <= 2) {
    throw Error(
      `The retrieve response is ${retrieveResponse}, which is not valid.`
    );
  }

  // Then the line with the data is returned.
  return lines[lines.length - 1];
}

function toConstructableFromChangeSetResponse(
  responseBody: any,
  entityToConstructorMap: MapType<Constructable<Entity>>
): Constructable<Entity> | undefined {
  return entityToConstructorMap[
    getEntityNameFromMetadata(responseBody.d.__metadata)
  ];
}

function toConstructableFromRetrieveResponse(
  responseBody: any,
  entityToConstructorMap: MapType<Constructable<Entity>>
): Constructable<Entity> {
  let entityJson;
  const data = responseBody.d;

  if (data.results && data.results.length) {
    // GetAll
    entityJson = data.results[0];
  } else if (data.results && !data.results.length) {
    // GetByKey C4C (!)
    entityJson = data.results;
  } else {
    // GetByKey
    entityJson = data;
  }

  return entityToConstructorMap[
    getEntityNameFromMetadata(entityJson.__metadata)
  ];
}

function getEntityNameFromMetadata(metadata: MapType<string>): string {
  const entityUri = metadata.uri;
  const [pathBeforeQuery] = entityUri.split('?');
  const [pathBeforeKeys] = pathBeforeQuery.split('(');
  const uriParts = pathBeforeKeys.split('/');

  // Remove another part in case of a trailing slash
  const entityName = uriParts.pop() || uriParts.pop();
  if (!entityName) {
    throw Error(
      `The uri of the response metadata cannot be parsed. URI: ${metadata.uri}`
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

function getMethod(
  requestBuilder: MethodRequestBuilderBase<ODataRequestConfig>
) {
  return requestBuilder.requestConfig.method;
}

function getUrl(requestBuilder: MethodRequestBuilderBase<ODataRequestConfig>) {
  return `/${requestBuilder.relativeUrl()}`;
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

function toHttpCode(response: string): number {
  const group = response.match(/HTTP\/\d\.\d (\d{3}).*?/);

  if (!group) {
    throw new Error(
      `The response: ${response} is not valid, because the http code cannot be retrieved.`
    );
  }
  return parseInt(group[1].toString());
}

function toWriteResponseArray(
  response: string,
  lineBreak: string,
  entityToConstructorMap: MapType<Constructable<Entity>>
): WriteResponse[] {
  return partitionChangeSetResponse(response, lineBreak).map(r => {
    if (isNoContent(r)) {
      return { httpCode: 204 };
    } else if (isCreated(response)) {
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
    } else {
      throw new Error(
        `The request failed because http code of the response: ${r} is not 201/204.`
      );
    }
  });
}

function buildWriteResponses(
  response: string,
  entityToConstructorMap: MapType<Constructable<Entity>>,
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
  entityToConstructorMap: MapType<Constructable<Entity>>,
  lineBreak: string
): ReadResponse | ErrorResponse {
  const parsedBody = JSON.parse(trimRetrieveHeaders(response, lineBreak));
  const httpCode = toHttpCode(response);
  if (httpCode === 200) {
    return {
      httpCode: 200,
      body: parsedBody,
      type: toConstructableFromRetrieveResponse(
        parsedBody,
        entityToConstructorMap
      ),
      as: asReadResponse(parsedBody),
      isSuccess: () => true
    };
  } else {
    return { httpCode, body: parsedBody, isSuccess: () => false };
  }
}

/**
 * Generate the request line, containing method, url and http version from the request builder, e.g.:
 * GET /sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerAddress?$format=json&$top=1 HTTP/1.1
 * @param requestBuilder - Reqeust builder holds the request information.
 * @returns the generated request line.
 */
export function getRequestLine(
  requestBuilder: MethodRequestBuilderBase<ODataRequestConfig>
): string {
  return `${getMethod(requestBuilder).toUpperCase()} ${getUrl(
    requestBuilder
  )} ${http_version}`;
}
