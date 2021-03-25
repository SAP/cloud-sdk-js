import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import { OpenApiRequestBody } from '../openapi-types';
import { resolveObject } from './refs';
import { parseMediaType } from './media-type';

/**
 * Parse the request body.
 * @param requestBody Original request body to parse.
 * @param refs List of cross references that can occur in the document.
 * @returns The parsed request body schema.
 */
export function parseRequestBody(
  requestBody:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.RequestBodyObject
    | undefined,
  refs: $Refs
): OpenApiRequestBody | undefined {
  const resolvedRequestBody = resolveObject(requestBody, refs);
  const schema = parseMediaType(resolvedRequestBody);
  if (schema && resolvedRequestBody) {
    return {
      required: !!resolvedRequestBody.required,
      schema
    };
  }
}
