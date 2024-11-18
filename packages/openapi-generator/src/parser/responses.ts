import { parseMediaType } from './media-type';
import type { OpenAPIV3 } from 'openapi-types';
import type { OpenApiSchema } from '../openapi-types';
import type { OpenApiDocumentRefs } from './refs';
import type { ParserOptions } from './options';

/**
 * @internal
 */
export function parseResponses(
  responses: OpenAPIV3.ResponsesObject | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiSchema {
  if (responses) {
    const responseSchemas = Object.entries(responses)
      .filter(([statusCode]) => statusCode.startsWith('2'))
      .map(([, response]) => refs.resolveObject(response))
      .map(response => parseMediaType(response, refs, options))
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

/**
 * @internal
 */
export function parseErrorResponses(
  responses: OpenAPIV3.ResponsesObject | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): Record<string, OpenApiSchema> {
  if (responses) {
    const errorSchemas = Object.entries(responses)
      .filter(
        ([statusCode]) =>
          statusCode.startsWith('4') ||
          statusCode.startsWith('5') ||
          statusCode === 'default'
      )
      .map(([statusCode, response]) => [
        statusCode,
        parseMediaType(refs.resolveObject(response), refs, options)
      ])
      // Undefined responses are filtered
      .filter(([response]) => response) as [string, OpenApiSchema][];
    // Undefined responses are filtered
    return errorSchemas.reduce((acc, [statusCode, response]) => {
      acc[statusCode] = response;
      return acc;
    }, {});
  }
  return {};
}
