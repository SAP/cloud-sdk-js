import { createLogger } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiSchema } from '../openapi-types';
import { OpenApiDocumentRefs } from './refs';
import { parseSchema } from './schema';
import { ParserOptions } from './options';

const logger = createLogger('openapi-generator');
/**
 * Parse the type of a resolved request body or response object.
 * @param bodyOrResponseObject The request body or response object to parse the type from.
 * @param refs Object representing cross references throughout the document.
 * @param options Options that were set for service generation.
 * @returns The type name of the request body if there is one.
 */
export function parseApplicationJsonMediaType(
  bodyOrResponseObject:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiSchema | undefined {
  if (bodyOrResponseObject) {
    const mediaType = getMediaTypeObject(
      bodyOrResponseObject,
      'application/json'
    );
    const schema = mediaType?.schema;
    if (schema) {
      return parseSchema(schema, refs, options);
    }
  }
}

export function parseMediaType(
  bodyOrResponseObject:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiSchema | undefined {
  const allMediaTypes = getMediaTypes(bodyOrResponseObject);
  if (allMediaTypes.length) {
    const jsonMediaType = parseApplicationJsonMediaType(
      bodyOrResponseObject,
      refs,
      options
    );

    if (!jsonMediaType) {
      logger.warn(
        "Could not parse media type, because it is not 'application/json'. Generation will continue with 'any'. This might lead to errors at runtime."
      );
      return { type: 'any' };
    }

    // There is only the application/json media type
    if (allMediaTypes.length === 1) {
      return jsonMediaType;
    }

    return {
      anyOf: [jsonMediaType, { type: 'any' }]
    };
  }
}

export function getMediaTypes(
  bodyOrResponseObject:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined
): string[] {
  return Object.keys(bodyOrResponseObject?.content || {});
}

/**
 * Get the media type for a specific content type from a request body or response object.
 * @param bodyOrResponseObject Request body or response object to get the media type from.
 * @param contentType Content type to retrieve the media type by.
 * @returns The media type for the given content type if available.
 */
function getMediaTypeObject(
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
