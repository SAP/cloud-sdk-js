import { OpenAPIV3 } from 'openapi-types';
import { OpenApiSchema } from '../openapi-types';
import { OpenApiDocumentRefs } from './refs';
import { parseMediaType } from './media-type';
import { ParserOptions } from './options';

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
