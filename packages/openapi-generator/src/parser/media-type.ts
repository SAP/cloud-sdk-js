import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { parse as parseContentType, type ParsedMediaType } from 'content-type';
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

interface EncodingInfo {
  contentType: string;
  isImplicit: boolean;
  parsedContentTypes: ParsedMediaType[];
}

type EncodingMap = Record<string, EncodingInfo>;

/**
 * Parse content types from a comma-separated content type string.
 * @param contentType - Comma-separated content types from encoding object.
 * @param propName - Property name for error messages.
 * @returns Array of parsed content types.
 */
function parseContentTypes(
  contentType: string,
  propName: string
): ParsedMediaType[] {
  return contentType
    .split(',')
    .map(ct => ct.trim())
    .map(ct => {
      try {
        return parseContentType(ct);
      } catch (error: any) {
        throw new ErrorWithCause(
          `Invalid content type '${ct}' for property '${propName}' in OpenAPI specification. ` +
            "Content types must follow the format 'type/subtype' (e.g., 'image/png', 'text/plain'). " +
            'Please fix your OpenAPI document.',
          error
        );
      }
    });
}

/**
 * Infer content type based on OpenAPI schema type.
 * @param s - The schema object to infer content type from.
 * @returns The inferred content type, or undefined if cannot be determined.
 */
function inferContentTypeFromSchema(
  s: OpenAPIV3.SchemaObject
): string | undefined {
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
function inferMultipartEncodings(
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
          parsedContentTypes: parseContentTypes(contentType, propName)
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
function parseMultipartEncodings(
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
              parsedContentTypes: parseContentTypes(
                encodingObj.contentType!,
                propName
              )
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
    inferMultipartEncodings(
      Object.keys(explicitEncodings),
      resolvedSchema,
      refs
    ) || {};

  const allEncodings = { ...implicitEncodings, ...explicitEncodings };
  return Object.keys(allEncodings).length ? allEncodings : undefined;
}
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
):
  | {
      schema: OpenApiSchema;
      mediaType: string;
      encoding?: EncodingMap;
    }
  | undefined {
  if (bodyOrResponseObject) {
    const mediaTypeObject = getMediaTypeObject(
      bodyOrResponseObject,
      allowedMediaTypes
    );

    if (mediaTypeObject) {
      const encoding = mediaTypeObject.mediaType.startsWith('multipart/')
        ? parseMultipartEncodings(mediaTypeObject, refs)
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
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
):
  | {
      schema: OpenApiSchema;
      mediaType: string;
      encoding?: EncodingMap;
    }
  | undefined {
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
