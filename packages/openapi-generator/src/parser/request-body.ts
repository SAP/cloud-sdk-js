import { camelCase, createLogger } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import { OpenApiRequestBody } from '../openapi-types';
import { isReferenceObject, parseTypeName, resolveObject } from './refs';
import { getType } from './type-mapping';
import { isArraySchemaObject, isNonArraySchemaObject } from './schema';

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
  const requestBodyType = parseRequestBodyType(resolvedRequestBody);
  if (requestBodyType && resolvedRequestBody) {
    return {
      ...resolvedRequestBody,
      parameterName: camelCase(requestBodyType),
      parameterType: requestBodyType
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
    return parseType(schema);
  }
}

function parseType(
  schema?:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.ArraySchemaObject
    | OpenAPIV3.NonArraySchemaObject
): string | undefined {
  if (isReferenceObject(schema)) {
    return parseTypeName(schema);
  }
  if (isArraySchemaObject(schema)) {
    return `Array<${parseGenericTypeFromArray(schema)}>`;
  }
  if (isNonArraySchemaObject(schema)) {
    return getType(schema.type);
  }
}

function parseGenericTypeFromArray(
  arrayObject: OpenAPIV3.ArraySchemaObject
): string | undefined {
  return parseType(arrayObject.items);
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
