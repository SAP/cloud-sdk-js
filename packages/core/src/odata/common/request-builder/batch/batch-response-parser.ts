/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { last, createLogger, errorWithCause } from '@sap-cloud-sdk/util';
import { getHeaderValue } from '../../../../header-builder';
import { HttpResponse } from '../../../../http-client';
import {
  ErrorResponse,
  ReadResponse,
  WriteResponse,
  WriteResponses
} from '../../batch-response';
import { Constructable, EntityBase } from '../../entity';
import { EntityDeserializer } from '../../entity-deserializer';
import { ResponseDataAccessor } from '../../response-data-accessor';
const logger = createLogger({
  package: 'core',
  messageContext: 'batch-response-parser'
});

/**
 * Detects the system dependent line break in a string.
 * @param str The string to check for line breaks. Should have at least two lines, otherwise an error will be thrown.
 * @returns The system dependent line break
 */
export function detectNewLineSymbol(str: string): string {
  if (str.includes('\r\n')) {
    return '\r\n';
  }
  if (str.includes('\n')) {
    return '\n';
  }
  throw new Error('Cannot detect line breaks in the batch response body.');
}

/**
 * Get the response body from the string representation of a response.
 * @param response String representation of a response.
 * @returns The response body as a one line string.
 */
export function getResponseBody(response: string): string {
  const newLineSymbol = detectNewLineSymbol(response);
  const lines = response.split(newLineSymbol);

  // A valid response should contain at least three lines, part id, empty line and response body.
  if (lines.length >= 3) {
    return lines[lines.length - 1];
  }

  throw Error(
    `Cannot parse batch subrequest response body. Expected at least three lines in the response, got ${lines.length}.`
  );
}

/**
 * Parse the headers in the string representation of a response headers into an object. This will only look at the highest level of headers.
 * @param response String representation of a response
 * @returns The headers as an object.
 */
function parseHeaders(response: string): Record<string, any> {
  const newLineSymbol = detectNewLineSymbol(response);
  // split on the first empty line
  const [responseHeaders] = response.split(newLineSymbol + newLineSymbol);
  return responseHeaders.split(newLineSymbol).reduce((headers, line) => {
    const [key, value] = line.split(':');
    return { ...headers, [key]: value?.trim() };
  }, {});
}

/**
 * Get the boundary from the content type header value. Throws an error if no boundary can be found.
 * @param contentType Value of the content type header
 * @returns The boundary.
 */
function getBoundary(contentType: string | undefined): string {
  const boundary = contentType?.match(/.*boundary=.+/)
    ? last(contentType.split('boundary='))
    : undefined;

  if (!boundary) {
    throw new Error('No boundary found.');
  }

  return boundary;
}

/**
 * Split a batch response into an array of sub responses for the retrieve requests and changesets.
 * @param response The raw HTTP response.
 * @returns A list of sub responses represented as strings.
 */
export function splitBatchResponse(response: HttpResponse): string[] {
  const body = response.data.trim();
  if (!body) {
    return [];
  }

  try {
    const boundary = getBoundary(
      getHeaderValue('content-type', response.headers)
    );
    return splitResponse(body, boundary);
  } catch (err) {
    throw errorWithCause('Could not parse batch response.', err);
  }
}

/**
 * Split a changeset (sub) response into an array of sub responses.
 * @param changeSetResponse The string representation of a change set response.
 * @returns A list of sub responses represented as strings.
 */
export function splitChangeSetResponse(changeSetResponse: string): string[] {
  const headers = parseHeaders(changeSetResponse);

  try {
    const boundary = getBoundary(getHeaderValue('content-type', headers));
    return splitResponse(changeSetResponse, boundary);
  } catch (err) {
    throw errorWithCause('Could not parse change set response.', err);
  }
}

/**
 * Split a string representation of a response into sub responses given its boundary.
 * @param response The string representation of the response to split.
 * @param boundary The boundary to split by.
 * @returns A list of sub responses represented as strings.
 */
export function splitResponse(response: string, boundary: string): string[] {
  const parts = response.split(`--${boundary}`).map(part => part.trim());

  if (parts.length >= 3) {
    return parts.slice(1, parts.length - 1);
  }

  throw new Error(
    'Could not parse batch response body. Expected at least two response boundaries.'
  );
}

/**
 * Parse the entity name from the metadata uri. This should be the `__metadata` property of a single entity in the response.
 * @param uri The URI to parse the entity name from
 * @returns The entity name.
 */
export function parseEntityNameFromMetadataUri(
  uri: string | undefined
): string {
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

/**
 * Retrieve the constructor for a specific single response body.
 * @param responseBody The body of a single response as an object.
 * @param entityToConstructorMap Mapping between entity names and their respective constructors.
 * @param responseDataAccessor Response data access module.
 * @returns The constructor if found in the mapping, undefined otherwise.
 */
export function getConstructor(
  responseBody: Record<string, any>,
  entityToConstructorMap: Record<string, Constructable<EntityBase>>,
  responseDataAccessor: ResponseDataAccessor
): Constructable<EntityBase> | undefined {
  const entityJson = responseDataAccessor.isCollectionResult(responseBody)
    ? responseDataAccessor.getCollectionResult(responseBody)[0]
    : responseDataAccessor.getSingleResult(responseBody);

  const entityUri = entityJson?.__metadata?.uri;
  if (entityUri) {
    return entityToConstructorMap[parseEntityNameFromMetadataUri(entityUri)];
  }

  logger.warn('Could not parse constructor from response body.');
}

/**
 * Parse the HTTP code of response.
 * @param response String representation of the response.
 * @returns The HTTP code.
 */
export function parseHttpCode(response: string): number {
  const group = response.match(/HTTP\/\d\.\d (\d{3}).*?/);

  if (group) {
    return parseInt(group[1].toString());
  }

  throw new Error('Cannot parse http code of the response.');
}

/**
 * Create a function to transform the parsed response body to a list of entities of the given type or an error.
 * @param body The parsed JSON reponse body.
 * @param responseDataAccessor Response data access module.
 * @param deserializer Entity deserializer.
 * @returns A function to be used for transformation of the read response.
 */
function asReadResponse(
  body: any,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
) {
  return <EntityT extends EntityBase>(
    constructor: Constructable<EntityT>
  ): Error | EntityT[] => {
    if (body.error) {
      return new Error(body.error);
    }
    if (responseDataAccessor.isCollectionResult(body)) {
      return responseDataAccessor
        .getCollectionResult(body)
        .map(r => deserializer.deserializeEntity(r, constructor));
    }
    return [
      deserializer.deserializeEntity(
        responseDataAccessor.getSingleResult(body),
        constructor
      )
    ];
  };
}

/**
 * Create a function to transform the parsed response body to an entity of the given type.
 * @param body The parsed JSON reponse body.
 * @param responseDataAccessor Response data access module.
 * @param deserializer Entity deserializer.
 * @returns A function to be used for transformation of the write response.
 */
function asWriteResponse(
  body: any,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
) {
  return <EntityT extends EntityBase>(constructor: Constructable<EntityT>) =>
    deserializer.deserializeEntity(
      responseDataAccessor.getSingleResult(body),
      constructor
    );
}

/**
 * Get the body from the given response and parse it to JSON.
 * @param response The string representation of a single response.
 * @returns The parsed JSON representation of the response body.
 */
function parseResponseBody(response: string): Record<string, any> {
  const responseBody = getResponseBody(response);
  if (responseBody) {
    try {
      return JSON.parse(responseBody);
    } catch (err) {
      logger.error(
        `Could not parse response body. Invalid JSON. Original Error: ${err}`
      );
    }
  }
  return {};
}

/**
 * Parse a single response to the according response object type.
 * @param response The string representation of a single response.
 * @param entityToConstructorMap A map that holds the entity type to constructor mapping.
 * @param responseDataAccessor Response data access module.
 * @param deserializer Entity deserializer.
 * @returns The parsed response in the according response object representation.
 */
export function parseResponse(
  response: string,
  entityToConstructorMap: Record<string, Constructable<EntityBase>>,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
): WriteResponse | ReadResponse | ErrorResponse {
  const responseData = {
    body: parseResponseBody(response),
    httpCode: parseHttpCode(response)
  };

  // retrieve response
  if (responseData.httpCode === 200) {
    return {
      ...responseData,
      type: getConstructor(
        responseData.body,
        entityToConstructorMap,
        responseDataAccessor
      ),
      as: asReadResponse(responseData.body, responseDataAccessor, deserializer),
      isSuccess: () => true
    };
  }

  // change set sub response
  if (responseData.httpCode === 201 || responseData.httpCode === 204) {
    return {
      ...responseData,
      type: getConstructor(
        responseData.body,
        entityToConstructorMap,
        responseDataAccessor
      ),
      as: asWriteResponse(responseData.body, responseDataAccessor, deserializer)
    };
  }

  // error response
  return { ...responseData, isSuccess: () => false };
}

/**
 * Parse the complete batch HTTP response.
 * @param batchResponse HTTP response.
 * @param entityToConstructorMap A map that holds the entity type to constructor mapping.
 * @param responseDataAccessor Response data access module.
 * @param deserializer Entity deserializer.
 * @returns An array of parsed sub responses of the batch response.
 */
export function parseBatchResponse(
  batchResponse: HttpResponse,
  entityToConstructorMap: Record<string, Constructable<EntityBase>>,
  responseDataAccessor: ResponseDataAccessor,
  deserializer: EntityDeserializer
): (ErrorResponse | ReadResponse | WriteResponses)[] {
  return splitBatchResponse(batchResponse).map(response => {
    const contentType = getHeaderValue('content-type', parseHeaders(response));

    // is change set response
    if (isMultipartContentType(contentType)) {
      return {
        responses: splitChangeSetResponse(response).map(
          subResponse =>
            parseResponse(
              subResponse,
              entityToConstructorMap,
              responseDataAccessor,
              deserializer
            ) as WriteResponse
        ),
        isSuccess: () => true
      };
    }

    // is read or error response
    if (isHttpContentType(contentType)) {
      return parseResponse(
        response,
        entityToConstructorMap,
        responseDataAccessor,
        deserializer
      ) as ReadResponse | ErrorResponse;
    }

    throw Error(
      `Cannot parse batch response. Unknown subresponse 'Content-Type' header '${contentType}'.`
    );
  });
}

function isMultipartContentType(contentType: string): boolean {
  return contentType?.trim().startsWith('multipart/mixed');
}

function isHttpContentType(contentType: string): boolean {
  return contentType?.trim().startsWith('application/http');
}
