/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { last, MapType, createLogger } from '@sap-cloud-sdk/util';
import { HttpReponse } from '../../http-client';
import { getHeaderValue } from '../../header-builder';
import {
  getSingleResult,
  isCollectionResult,
  getCollectionResult
} from '../v2/request-builder/response-data-accessor';
import {
  Constructable,
  ErrorResponse,
  ReadResponse,
  WriteResponses,
  WriteResponse
} from '../common';
import { EntityV2 } from './entity';
import { deserializeEntityV2 } from './entity-deserializer';

const logger = createLogger({
  package: 'core',
  messageContext: 'batch-response-parser'
});

export function detectNewLineSymbol(response: string): string {
  if (response.includes('\r\n')) {
    return '\r\n';
  }
  if (response.includes('\n')) {
    return '\n';
  }
  throw new Error(
    `Cannot detect line breaks in the response body: ${response}.`
  );
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
export function getResponseBody(
  retrieveResponse: string,
  newLineSymbol: string
): string {
  const lines = retrieveResponse.split(newLineSymbol);

  // A valid response should contain at least three lines, part id, empty line and response body.
  if (lines.length >= 3) {
    return lines[lines.length - 1];
  }

  throw Error(
    `Cannot parse batch subrequest response body. Expected at least three lines in the response, got ${lines.length}.`
  );
}

function parseHeaders(headersStr: string): Record<string, string> {
  const newLineSymbol = detectNewLineSymbol(headersStr);
  return headersStr.split(newLineSymbol).reduce((headers, line) => {
    const [key, value] = line.split(':');
    return { ...headers, [key]: value };
  }, {});
}

function getBoundary(contentType: string | undefined): string | undefined {
  if (contentType) {
    return last(contentType.split('boundary='));
  }
}

export function partitionBatchResponse(response: HttpReponse): string[] {
  const body = response.data.trim();
  if (!body) {
    return [];
  }

  const boundary = getBoundary(
    getHeaderValue('content-type', response.headers)
  );

  if (!boundary) {
    throw new Error(
      'Could not parse batch response. Expected multipart response with boundary.'
    );
  }

  return partitionResponseBody(body, boundary);
}

/*
E.g. response:
--batch_1234
part 1
--batch_1234
part 2
--batch_1234--
 */
export function partitionResponseBody(
  responseBody: string,
  boundary: string
): string[] {
  // E.g., ['', part 1, part 2, '--']
  const parts = responseBody.split(`--${boundary}`).map(part => part.trim());

  // Slice the first and last element
  if (parts.length >= 3) {
    return parts.slice(1, parts.length - 1);
  }

  throw new Error(
    'Could not parse batch response body. Expected at least two response boundaries.'
  );
}

export function partitionChangeSetResponse(
  changeSetResponse: string
): string[] {
  const [changeSetResponseHeader] = changeSetResponse.split('--');

  const headers = parseHeaders(changeSetResponseHeader);
  const boundary = getBoundary(getHeaderValue('content-type', headers));

  if (!boundary) {
    throw Error('Cannot parse change set.');
  }

  return partitionResponseBody(changeSetResponse, boundary);
}

export function getEntityNameFromMetadataUri(uri: string | undefined): string {
  if (!uri) {
    throw new Error(
      `Could not retrieve entity name from metadata. URI was: '${uri}'.`
    );
  }
  const [pathBeforeQuery] = uri.split('?');
  const [pathBeforeKeys] = pathBeforeQuery.split('(');
  const uriParts = pathBeforeKeys.split('/');

  // Remove another part in case of a trailing slash
  const entityName = uriParts.pop() || uriParts.pop();
  if (!entityName) {
    throw Error(
      `Could not retrieve entity name from metadata. Unknown URI format. URI was: '${uri}'.`
    );
  }
  return entityName;
}

// version specific
export function getConstructor(
  responseBody: Record<string, any>,
  entityToConstructorMap: MapType<Constructable<EntityV2>>
): Constructable<EntityV2> | undefined {
  const entityJson = isCollectionResult(responseBody)
    ? getCollectionResult(responseBody)[0]
    : getSingleResult(responseBody);

  const entityUri = entityJson?.__metadata?.uri;
  if (entityUri) {
    return entityToConstructorMap[getEntityNameFromMetadataUri(entityUri)];
  }

  logger.warn('Could not parse constructor from response body.');
}

export function toConstructableFromChangeSetResponse(
  responseBody: any,
  entityToConstructorMap: MapType<Constructable<EntityV2>>
): Constructable<EntityV2> | undefined {
  return entityToConstructorMap[
    getEntityNameFromMetadataUri(getSingleResult(responseBody).__metadata?.uri)
  ];
}

export function toConstructableFromRetrieveResponse(
  responseBody: any,
  entityToConstructorMap: MapType<Constructable<EntityV2>>
): Constructable<EntityV2> {
  const entityJson = isCollectionResult(responseBody)
    ? getCollectionResult(responseBody)[0]
    : getSingleResult(responseBody);

  return entityToConstructorMap[
    getEntityNameFromMetadataUri(entityJson.__metadata?.uri)
  ];
}

export function parseHttpCode(response: string): number {
  const group = response.match(/HTTP\/\d\.\d (\d{3}).*?/);

  if (group) {
    return parseInt(group[1].toString());
  }

  throw new Error('Cannot parse http code of the response.');
}

export function buildRetrieveOrErrorResponse(
  response: string,
  entityToConstructorMap: MapType<Constructable<EntityV2>>,
  lineBreak: string
): ReadResponse | ErrorResponse {
  const parsedBody = JSON.parse(getResponseBody(response, lineBreak));
  const httpCode = parseHttpCode(response);
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

function isNoContent(response: string): boolean {
  return !!response.match(/HTTP\/\d\.\d 204 No Content/);
}

function isCreated(response: string): boolean {
  return !!response.match(/HTTP\/\d\.\d 201 Created/);
}

function toWriteResponseArray(
  response: string,
  lineBreak: string,
  entityToConstructorMap: MapType<Constructable<EntityV2>>
): WriteResponse[] {
  return partitionChangeSetResponse(response).map(r =>
    toWriteResponse(r, lineBreak, entityToConstructorMap)
  );
}

function parseResponseBody(
  response: string,
  lineBreak: string
): Record<string, any> {
  const responseBody = getResponseBody(response, lineBreak);
  if (responseBody) {
    try {
      return JSON.parse(getResponseBody(response, lineBreak));
    } catch (err) {
      logger.error(
        `Could not parse response body. Invalid JSON. Original Error: ${err}`
      );
    }
  }
  return {};
}

export function toWriteResponse(
  response: string,
  lineBreak: string,
  entityToConstructorMap: MapType<Constructable<EntityV2>>
): WriteResponse {
  const httpCode = parseHttpCode(response);
  if (httpCode !== 201 && httpCode !== 204) {
    logger.warn(
      'Unexpected http code for changeset sub response. Parsed response might be incorrect.'
    );
  }

  const body = parseResponseBody(response, lineBreak);

  return {
    httpCode,
    body,
    type: getConstructor(body, entityToConstructorMap),
    as: asWriteResponse(body)
  };
}

export function buildWriteResponses(
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

function asWriteResponse(body) {
  return <T extends EntityV2>(constructor: Constructable<T>) =>
    deserializeEntityV2(getSingleResult(body), constructor);
}
