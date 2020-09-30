import { errorWithCause, first, last } from '@sap-cloud-sdk/util';
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
  ErrorResponse
} from '../common';
import { MethodRequestBuilderBase } from '../common/request-builder/request-builder-base';
import { ODataBatchRequestConfig } from '../common/request/odata-batch-request-config';
import { EntityV4 } from './entity';
import { deserializeEntityV4 } from './entity-deserializer';
import {
  toBatchChangeSetV4,
  ODataBatchChangeSetV4
} from './odata-batch-change-set';
import { toBatchRetrieveBodyV4 } from './odata-batch-retrieve-request';
import {
  CreateRequestBuilderV4,
  DeleteRequestBuilderV4,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  UpdateRequestBuilderV4
} from './request-builder';
import {
  isCollectionResult,
  getCollectionResult,
  getSingleResult
} from './request-builder/response-data-accessor';

const changesetIdPrefix = 'Content-Type: multipart/mixed; boundary=';

/**
 * The OData batch request builder to build a batch, which consists of an ordered retrieve requests or change sets.
 *
 */
export class ODataBatchRequestBuilderV4 extends MethodRequestBuilderBase<
  ODataBatchRequestConfig
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
      | ODataBatchChangeSetV4<
          | CreateRequestBuilderV4<EntityV4>
          | UpdateRequestBuilderV4<EntityV4>
          | DeleteRequestBuilderV4<EntityV4>
        >
      | GetAllRequestBuilderV4<EntityV4>
      | GetByKeyRequestBuilderV4<EntityV4>
    )[],
    readonly entityToConstructorMap: Record<string, Constructable<EntityV4>>
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
    }
    if (body.split('\n').length > 1) {
      return '\n';
    }
    throw new Error(
      `Cannot detect the line break of the response body: ${body}.`
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
function getPayload(
  requests: (
    | ODataBatchChangeSetV4<
        | CreateRequestBuilderV4<EntityV4>
        | UpdateRequestBuilderV4<EntityV4>
        | DeleteRequestBuilderV4<EntityV4>
      >
    | GetAllRequestBuilderV4<EntityV4>
    | GetByKeyRequestBuilderV4<EntityV4>
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
    | CreateRequestBuilderV4<EntityV4>
    | UpdateRequestBuilderV4<EntityV4>
    | DeleteRequestBuilderV4<EntityV4>
>(
  request:
    | ODataBatchChangeSetV4<T>
    | GetAllRequestBuilderV4<EntityV4>
    | GetByKeyRequestBuilderV4<EntityV4>
): string | undefined {
  if (
    request instanceof GetAllRequestBuilderV4 ||
    request instanceof GetByKeyRequestBuilderV4
  ) {
    return toBatchRetrieveBodyV4(request);
  }
  if (request instanceof ODataBatchChangeSetV4) {
    return toBatchChangeSetV4(request);
  }
  throw Error(
    `The request: ${JSON.stringify(
      request
    )} is not a valid retrieve request or change set.`
  );
}

function buildResponses(
  responses: string[],
  entityToConstructorMap: Record<string, Constructable<EntityV4>>,
  lineBreak: string
): BatchResponse[] {
  return responses.map(r =>
    buildResponse(r, entityToConstructorMap, lineBreak)
  );
}

function buildResponse(
  response: string,
  entityToConstructorMap: Record<string, Constructable<EntityV4>>,
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

const asReadResponse = body => <T extends EntityV4>(
  constructor: Constructable<T>
): Error | T[] => {
  if (body.error) {
    return new Error(body.error);
  }
  if (isCollectionResult(body)) {
    return getCollectionResult(body).map(r =>
      deserializeEntityV4(r, constructor)
    );
  }
  return [deserializeEntityV4(getSingleResult(body), constructor)];
};

const asWriteResponse = body => <T extends EntityV4>(
  constructor: Constructable<T>
) => {
  const resultData = getSingleResult(body);
  if (!resultData.__metadata) {
    throw Error('The metadata of the response body is undefined.');
  }

  return deserializeEntityV4(resultData, constructor);
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
  const partSeparator = response.split(lineBreak, 1)[0];
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
  const firstLine = responseOfSingleRetrieveRequest.split(lineBreak, 1)[0];
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
  entityToConstructorMap: Record<string, Constructable<EntityV4>>
): Constructable<EntityV4> | undefined {
  return entityToConstructorMap[
    getEntityNameFromMetadata(getSingleResult(responseBody).__metadata)
  ];
}

function toConstructableFromRetrieveResponse(
  responseBody: any,
  entityToConstructorMap: Record<string, Constructable<EntityV4>>
): Constructable<EntityV4> {
  const entityJson = isCollectionResult(responseBody)
    ? first(getCollectionResult(responseBody))
    : getSingleResult(responseBody);

  return entityToConstructorMap[
    getEntityNameFromMetadata(entityJson.__metadata)
  ];
}

function getEntityNameFromMetadata(metadata: Record<string, string>): string {
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
  entityToConstructorMap: Record<string, Constructable<EntityV4>>
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
  entityToConstructorMap: Record<string, Constructable<EntityV4>>,
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
  entityToConstructorMap: Record<string, Constructable<EntityV4>>,
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
