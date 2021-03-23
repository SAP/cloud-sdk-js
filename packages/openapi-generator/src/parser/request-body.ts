import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import { OpenApiRequestBody } from '../openapi-types';
import { resolveObject } from './refs';
import { parseApplicationJsonMediaType } from './media-type';

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
  const schema = parseApplicationJsonMediaType(resolvedRequestBody);
  if (schema && resolvedRequestBody) {
    return {
      name: 'body',
      required: !!resolvedRequestBody.required,
      schema
    };
  }
}
