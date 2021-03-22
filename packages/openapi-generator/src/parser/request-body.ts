import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import { OpenApiRequestBody, OpenApiSchema } from '../openapi-types';
import { resolveObject } from './refs';
import { parseSchema } from './schema';

/**
 * Parse the request body.
 * @param requestBody Original request body to parse.
 * @param refs List of cross references that can occur in the document.
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
  const schema = parseRequestBodySchema(resolvedRequestBody);
  if (schema && resolvedRequestBody) {
    return {
      name: 'body',
      required: !!resolvedRequestBody.required,
      schema
    };
  }
}

/**
 * Parse the type of a resolved request body.
 * @param requestBody The body to parse the type from.
 * @returns The type name of the request body if there is one.
 */
function parseRequestBodySchema(
  requestBody: OpenAPIV3.RequestBodyObject | undefined
): OpenApiSchema | undefined {
  if (requestBody) {
    const mediaType = getMediaType(requestBody, 'application/json');
    const schema = mediaType?.schema;
    if (schema) {
      return parseSchema(schema);
    }
  }
}

/**
 * Get the media type for a specific content type from a request body object.
 * @param requestBody Request body to get the media type from.
 * @param contentType Content type to retrieve the media type by.
 * @returns The media type for the given content type if available.
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
