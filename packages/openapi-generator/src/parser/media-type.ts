import { createLogger } from '@sap-cloud-sdk/util';
import { parse as parseContentType, type ContentType } from 'content-type';
import { parseMediaTypeString, parseSchema } from './schema';
import type { OpenAPIV3 } from 'openapi-types';
import type {
  OpenApiMediaTypeObject,
  OpenApiRequestBody,
  OpenApiV3xSchema
} from '../openapi-types';
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

type ParsedContentType = Pick<ContentType, 'type' | 'parameters'>;

interface EncodingInfo {
  contentType: string;
  isImplicit: boolean;
  parsedContentTypes: ParsedContentType[];
}

type EncodingMap = Record<string, EncodingInfo>;

/**
 * Parsed schema and wire metadata for one media type.
 * @internal
 */
export type ParsedMediaType = Pick<
  OpenApiRequestBody,
  'schema' | 'mediaType' | 'encoding'
>;

function parseContentTypes(contentType: string): ParsedContentType[] {
  return contentType
    .split(',')
    .map(ct => ct.trim())
    .map(ct => {
      const { type, parameters } = parseContentType(ct);
      return { type, parameters };
    });
}

/**
 * Infer content type based on OpenAPI schema type.
 * @param s - The schema object to infer content type from.
 * @returns The inferred content type, or undefined if cannot be determined.
 */
function inferContentTypeFromSchema(s: OpenApiV3xSchema): string | undefined {
  // Explicit contentMediaType takes priority over inferred defaults.
  if (s.contentMediaType) {
    return s.contentMediaType;
  }
  // Binary format -> application/octet-stream
  if (s.type === 'string' && s.format === 'binary') {
    return 'application/octet-stream';
  }
  // Primitive types -> text/plain
  if (
    s.type === 'string' ||
    s.type === 'number' ||
    s.type === 'integer' ||
    s.type === 'boolean'
  ) {
    return 'text/plain';
  }
  // Arrays -> check item type
  if (
    s.type === 'array' &&
    s.items &&
    typeof s.items === 'object' &&
    !('$ref' in s.items)
  ) {
    return inferContentTypeFromSchema(s.items);
  }
  // Objects and others -> application/json
  return 'application/json';
}

/**
 * Infer content types for multipart form-data properties that don't have explicit encoding metadata.
 * Content types are inferred based on the OpenAPI schema type of each property.
 * @param resolvedEncodings - Explicitly defined encodings that have already been resolved.
 * @param resolvedSchema - The resolved schema object.
 * @param refs - Object representing cross references throughout the document.
 * @returns Encoding map with inferred content types added, or undefined if no encodings.
 * @internal
 */
function inferMultipartFormEncodings(
  resolvedEncodings: string[],
  resolvedSchema: OpenAPIV3.SchemaObject,
  refs: OpenApiDocumentRefs
): EncodingMap | undefined {
  if (!resolvedSchema.properties) {
    return;
  }

  const inferredEncodings = Object.entries(resolvedSchema.properties)
    .map(([propName, propSchema]) => {
      if (resolvedEncodings.includes(propName)) {
        return;
      }
      if (!propSchema || typeof propSchema !== 'object') {
        return;
      }

      // Resolve $ref for property schema
      const resolvedPropSchema = refs.resolveObject(propSchema);
      if ('$ref' in resolvedPropSchema) {
        return;
      }

      const contentType = inferContentTypeFromSchema(resolvedPropSchema);
      if (!contentType) {
        return;
      }

      return [
        propName,
        {
          contentType,
          isImplicit: true,
          parsedContentTypes: parseContentTypes(contentType)
        }
      ];
    })
    .filter(Boolean) as [string, EncodingInfo][];
  return Object.fromEntries(inferredEncodings);
}

/**
 * Parse encoding metadata for multipart/form-data content type.
 * Extracts explicit encoding configurations from the OpenAPI encoding object and automatically
 * infers content types for properties without explicit encoding based on their schema types.
 * @param mediaTypeObject - The media type object containing encoding and schema.
 * @param refs - Object representing cross references throughout the document.
 * @returns Encoding configuration mapping property names to their content types and metadata, or undefined if no encodings.
 * @internal
 */
function parseMultipartFormEncodings(
  mediaTypeObject: OpenAPIV3.MediaTypeObject | undefined,
  refs: OpenApiDocumentRefs
): EncodingMap | undefined {
  const explicitEncodings: EncodingMap = mediaTypeObject?.encoding
    ? Object.fromEntries(
        Object.entries(mediaTypeObject.encoding)
          .filter(([, encodingObj]) => encodingObj.contentType)
          .map(([propName, encodingObj]) => [
            propName,
            {
              contentType: encodingObj.contentType!,
              isImplicit: false,
              parsedContentTypes: parseContentTypes(encodingObj.contentType!)
            }
          ])
      )
    : {};

  const schema = mediaTypeObject?.schema;

  if (!schema) {
    return Object.keys(explicitEncodings).length
      ? explicitEncodings
      : undefined;
  }

  // Resolve $ref if present
  const resolvedSchema = refs.resolveObject(schema);

  // Auto-infer missing content types based on schema types
  const implicitEncodings =
    inferMultipartFormEncodings(
      Object.keys(explicitEncodings),
      resolvedSchema,
      refs
    ) || {};

  const allEncodings = { ...implicitEncodings, ...explicitEncodings };
  return Object.keys(allEncodings).length ? allEncodings : undefined;
}
/**
 * Parse one selected or preferred media type from a request body or response.
 * @param bodyOrResponseObject - The request body or response object to parse.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @param requestedMediaType - Optional media type to select from the content map.
 * @returns Parsed schema, normalized media type, and optional encoding metadata.
 * @internal
 */
export function parseTopLevelMediaType(
  bodyOrResponseObject:
    OpenAPIV3.RequestBodyObject | OpenAPIV3.ResponseObject | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions,
  requestedMediaType?: string
): ParsedMediaType | undefined {
  const normalizedRequestedMediaType = requestedMediaType
    ? parseMediaTypeString(requestedMediaType)
    : undefined;
  if (
    bodyOrResponseObject &&
    (!requestedMediaType ||
      (normalizedRequestedMediaType &&
        allowedMediaTypes.includes(normalizedRequestedMediaType)))
  ) {
    const mediaTypeObject = getMediaTypeObject(
      bodyOrResponseObject,
      normalizedRequestedMediaType
        ? [normalizedRequestedMediaType]
        : allowedMediaTypes
    );

    if (mediaTypeObject) {
      const encoding = mediaTypeObject.mediaType.startsWith('multipart/')
        ? parseMultipartFormEncodings(mediaTypeObject, refs)
        : undefined;

      return {
        schema: parseSchema(mediaTypeObject.schema, refs, options),
        mediaType: mediaTypeObject.mediaType,
        encoding
      };
    }
  }
}

/**
 * @internal
 */
export function parseMediaType(
  bodyOrResponseObject:
    OpenAPIV3.RequestBodyObject | OpenAPIV3.ResponseObject | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): ParsedMediaType | undefined {
  const allMediaTypes = getMediaTypes(bodyOrResponseObject);
  const normalizedMediaTypes = allMediaTypes.map(parseMediaTypeString);
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

    const allMediaTypesSupported = normalizedMediaTypes.every(
      (type): type is string => !!type && allowedMediaTypes.includes(type)
    );
    return allMediaTypesSupported
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
    OpenAPIV3.RequestBodyObject | OpenAPIV3.ResponseObject | undefined
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
    OpenAPIV3.RequestBodyObject | OpenAPIV3.ResponseObject | undefined,
  contentType: string[]
): OpenApiMediaTypeObject | undefined {
  if (bodyOrResponseObject?.content) {
    const mediaTypeEntry = Object.entries(bodyOrResponseObject.content).find(
      ([key]) => {
        const normalizedMediaType = parseMediaTypeString(key);
        return (
          !!normalizedMediaType && contentType.includes(normalizedMediaType)
        );
      }
    );
    if (mediaTypeEntry) {
      const normalizedMediaType = parseMediaTypeString(mediaTypeEntry[0]);
      return {
        ...mediaTypeEntry[1],
        mediaType: normalizedMediaType || mediaTypeEntry[0]
      };
    }
  }
  return undefined;
}
