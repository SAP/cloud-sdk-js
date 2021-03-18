import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import {
  OpenApiRequestBody,
  OpenApiSchema,
  SchemaMetadata
} from '../openapi-types';
import { isReferenceObject, parseTypeName } from '../model';
import { resolveObject } from './refs';
import { getType } from './type-mapping';
import { isArraySchemaObject, parseSchema } from './schema';

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
  const parameterType = parseRequestBodyType(resolvedRequestBody);
  if (parameterType && resolvedRequestBody) {
    return {
      ...resolvedRequestBody,
      parameterName: 'body',
      parameterType
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
): OpenApiSchema | undefined {
  if (requestBody) {
    const mediaType = getMediaType(requestBody, 'application/json');
    const schema = mediaType?.schema;
    if (schema) {
      return parseSchema(schema);
    }
  }
}

export function parseSchemaMetadata(
  schema?:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.ArraySchemaObject
    | OpenAPIV3.NonArraySchemaObject
): SchemaMetadata | undefined {
  if (isReferenceObject(schema)) {
    return parseReferenceObject(schema);
  }
  if (isArraySchemaObject(schema)) {
    return parseArrayObject(schema);
  }
  if (schema !== undefined) {
    return parseNonArrayObject(schema);
  }
}

function parseReferenceObject(
  schema: OpenAPIV3.ReferenceObject
): SchemaMetadata {
  return {
    isArrayType: false,
    innerType: parseTypeName(schema),
    isInnerTypeReferenceType: true
  };
}

function parseNonArrayObject(
  schema: OpenAPIV3.NonArraySchemaObject
): SchemaMetadata {
  return {
    isArrayType: false,
    innerType: getType(schema.type),
    isInnerTypeReferenceType: false
  };
}

function parseArrayObject(
  schema: OpenAPIV3.ArraySchemaObject
): SchemaMetadata | undefined {
  const internalSchema = parseSchemaMetadata(schema.items);
  return internalSchema
    ? {
        isArrayType: true,
        innerType: internalSchema.innerType,
        isInnerTypeReferenceType: internalSchema.isInnerTypeReferenceType,
        arrayLevel: internalSchema.arrayLevel
          ? internalSchema.arrayLevel + 1
          : 1
      }
    : undefined;
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
