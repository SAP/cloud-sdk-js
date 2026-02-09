import { createLogger } from '@sap-cloud-sdk/util';
import { parseSchema } from './schema';
import type { OpenAPIV3 } from 'openapi-types';
import type { OpenApiMediaTypeObject, OpenApiSchema } from '../openapi-types';
import type { OpenApiDocumentRefs } from './refs';
import type { ParserOptions } from './options';

const logger = createLogger('openapi-generator');
const allowedMediaTypes = [
  'application/json',
  'application/merge-patch+json',
  'application/octet-stream',
  'text/plain',
  'multipart/form-data',
  '*/*'
];
/**
 * Parse the type of a resolved request body or response object.
 * @param bodyOrResponseObject - The request body or response object to parse the type from.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @returns The type name of the request body if there is one.
 * @internal
 */
export function parseTopLevelMediaType(
  bodyOrResponseObject:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): { schema: OpenApiSchema; mediaType: string } | undefined {
  if (bodyOrResponseObject) {
    const mediaTypeObject = getMediaTypeObject(
      bodyOrResponseObject,
      allowedMediaTypes
    );

    if (mediaTypeObject) {
      return {
        schema: parseSchema(mediaTypeObject.schema, refs, options),
        mediaType: mediaTypeObject.mediaType
      };
    }
  }
}

/**
 * @internal
 */
export function parseMediaType(
  bodyOrResponseObject:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): { schema: OpenApiSchema; mediaType: string } | undefined {
  const allMediaTypes = getMediaTypes(bodyOrResponseObject);
  if (allMediaTypes.length) {
    const parsedSchema = parseTopLevelMediaType(
      bodyOrResponseObject,
      refs,
      options
    );

    if (!parsedSchema) {
      logger.warn(
        `Could not parse '${allMediaTypes}', because it is not supported. Generation will continue with 'any'. This might lead to errors at runtime.`
      );
      return { schema: { type: 'any' }, mediaType: 'application/json' };
    }

    // There is only one media type
    if (allMediaTypes.length === 1) {
      return parsedSchema;
    }

    return allMediaTypes.every(type => allowedMediaTypes.includes(type))
      ? parsedSchema
      : {
          schema: { anyOf: [parsedSchema.schema, { type: 'any' }] },
          mediaType: parsedSchema.mediaType
        };
  }
}

/**
 * @internal
 */
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
 * @param bodyOrResponseObject - Request body or response object to get the media type from.
 * @param contentType - Content type to retrieve the media type by.
 * @returns The media type for the given content type if available.
 */
function getMediaTypeObject(
  bodyOrResponseObject:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined,
  contentType: string[]
): OpenApiMediaTypeObject | undefined {
  if (bodyOrResponseObject?.content) {
    const mediaTypeEntry = Object.entries(bodyOrResponseObject.content).find(
      ([key]) => contentType.includes(key.split(';')[0])
    );
    if (mediaTypeEntry) {
      return {
        ...mediaTypeEntry[1],
        mediaType: mediaTypeEntry[0].split(';')[0]
      };
    }
  }
  return undefined;
}
