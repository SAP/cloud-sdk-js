import { OpenAPIV3 } from 'openapi-types';
import { OpenApiSchema } from '../openapi-types';
import { parseSchema } from './schema';

/**
 * Parse the type of a resolved request body.
 * @param bodyOrResponseObject The request body body or response object to parse the type from.
 * @returns The type name of the request body if there is one.
 */
export function parseApplicationJsonMediaType(
  bodyOrResponseObject:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined
): OpenApiSchema | undefined {
  if (bodyOrResponseObject) {
    const mediaType = getMediaType(bodyOrResponseObject, 'application/json');
    const schema = mediaType?.schema;
    if (schema) {
      return parseSchema(schema);
    }
  }
}

/**
 * Get the media type for a specific content type from a request body object.
 * @param bodyOrResponseObject Request body or response object to get the media type from.
 * @param contentType Content type to retrieve the media type by.
 * @returns The media type for the given content type if available.
 */
function getMediaType(
  bodyOrResponseObject:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined,
  contentType: string
): OpenAPIV3.MediaTypeObject | undefined {
  if (bodyOrResponseObject?.content) {
    return Object.entries(bodyOrResponseObject.content).find(
      ([key]) => key === contentType
    )?.[1];
  }
}
