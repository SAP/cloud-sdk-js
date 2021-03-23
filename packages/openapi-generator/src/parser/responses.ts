import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import { OpenApiSchema } from '../openapi-types';
import { resolveObject } from './refs';
import { parseMediaType } from './media-type';

export function parseResponses(
  responses: OpenAPIV3.ResponsesObject | undefined,
  refs: $Refs
): OpenApiSchema {
  if (responses) {
    const responseSchemas = Object.entries(responses)
      .filter(([statusCode]) => statusCode.startsWith('2'))
      .map(([, response]) => resolveObject(response, refs))
      .map(response => parseMediaType(response))
      // Undefined responses are filtered
      .filter(response => response) as OpenApiSchema[];
    if (responseSchemas.length) {
      if (responseSchemas.length === 1) {
        return responseSchemas[0];
      }
      return {
        anyOf: responseSchemas
      };
    }
  }
  return {
    type: 'any'
  };
}
