import { camelCase, createLogger, pascalCase } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import { OpenApiRequestBody } from '../openapi-types';
import { isReferenceObject, parseTypeName, resolveObject } from './refs';

const logger = createLogger('openapi-generator');

/**
 * Parse the request body.
 * @param requestBody Original request body to parse.
 * @param refs List of crossreferences that can occur in the document.
 * @returns The parsed request body.
 */
export function parseRequestBody(
  requestBody:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.RequestBodyObject
    | undefined,
  refs: $Refs
): OpenApiRequestBody | undefined {
  const resolvedRequestBody = resolveObject(requestBody, refs);
  const requestBodyType = parseRequestBodyType(resolvedRequestBody);
  if (requestBodyType && resolvedRequestBody) {
    return {
      ...resolvedRequestBody,
      parameterName: camelCase(requestBodyType),
      parameterType: pascalCase(requestBodyType)
    };
  }
}

/**
 * Parse the type of a resolved request body.
 * @param requestBody The body to parse the type from.
 * @returns The type name of the request body if there is one.
 */
function parseRequestBodyType(
  requestBody: OpenAPIV3.RequestBodyObject | undefined
): string | undefined {
  if (requestBody) {
    const mediaType = getMediaType(requestBody, 'application/json');
    const schema = mediaType?.schema;
    // TODO: What about inline schemas?
    if (isReferenceObject(schema)) {
      return parseTypeName(schema);
    }
    logger.warn(
      'The SAP Cloud SDK OpenApi generator currently does not support inline schemas. This will likely cause issues when using this client.'
    );
  }
}

/**
 * Get the media type for a specific content type from a request body object.
 * @param requestBody Request body to get the media type from.
 * @param contentType Content type to retrieve the media type by.
 * @returns The mediatype for the given content type if available.
 */
function getMediaType(
  requestBody: OpenAPIV3.RequestBodyObject | undefined,
  contentType: string
): OpenAPIV3.MediaTypeObject | undefined {
  if (requestBody?.content) {
    return Object.entries(requestBody.content).find(
      ([key]) => key === contentType
    )?.[1];
  }
}
