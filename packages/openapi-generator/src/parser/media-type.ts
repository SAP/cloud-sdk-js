import { createLogger } from '@sap-cloud-sdk/util';
import { parseSchema } from './schema';
import type { OpenAPIV3 } from 'openapi-types';
import type { OpenApiSchema } from '../openapi-types';
import type { OpenApiDocumentRefs } from './refs';
import type { ParserOptions } from './options';

const logger = createLogger('openapi-generator');
const allowedMediaTypes = [
  'application/json',
  'application/merge-patch+json',
  'application/octet-stream',
  'text/plain',
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
): OpenApiSchema | undefined {
  if (bodyOrResponseObject) {
    const mediaType = getMediaTypeObject(
      bodyOrResponseObject,
      allowedMediaTypes
    );
    const schema = mediaType?.schema;
    if (schema) {
      return parseSchema(schema, refs, options);
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
): OpenApiSchema | undefined {
  const allMediaTypes = getMediaTypes(bodyOrResponseObject);
  if (allMediaTypes.length) {
    const parsedMediaType = parseTopLevelMediaType(
      bodyOrResponseObject,
      refs,
      options
    );

    if (!parsedMediaType) {
      logger.warn(
        `Could not parse '${allMediaTypes}', because it is not supported. Generation will continue with 'any'. This might lead to errors at runtime.`
      );
      return { type: 'any' };
    }

    // There is only one media type
    if (allMediaTypes.length === 1) {
      return parsedMediaType;
    }

    return allMediaTypes.every(type => allowedMediaTypes.includes(type))
      ? parsedMediaType
      : { anyOf: [parsedMediaType, { type: 'any' }] };
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
): OpenAPIV3.MediaTypeObject | undefined {
  if (bodyOrResponseObject?.content) {
    return Object.entries(bodyOrResponseObject.content).find(([key]) =>
      contentType.includes(key.split(';')[0])
    )?.[1];
  }
  return undefined;
}
