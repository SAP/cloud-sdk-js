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
          `Invalid content-type '${ct}' for property '${propName}' in OpenAPI specification. ` +
            "Content types must follow the format 'type/subtype' (e.g., 'image/png', 'text/plain'). " +
            'Please fix your OpenAPI document.',
          error
        );
      }
    });
}

/**
 * Parse encoding object from a media type, extracting contentType for each property.
 * Also automatically infers content types for properties with binary format.
 * @param mediaTypeObject - The media type object containing encoding and schema.
 * @param refs - Object representing cross references throughout the document.
 * @returns Encoding configuration mapping property names to contentType, or undefined.
 * @internal
 */
function parseEncoding(
  mediaTypeObject: OpenAPIV3.MediaTypeObject | undefined,
  refs: OpenApiDocumentRefs
):
  | Record<
      string,
      {
        contentType: string;
        isImplicit: boolean;
        contentTypeParsed: ParsedMediaType[];
      }
    >
  | undefined {
  const explicitEncoding: Record<
    string,
    {
      contentType: string;
      isImplicit: boolean;
      contentTypeParsed: ParsedMediaType[];
    }
  > = mediaTypeObject?.encoding
    ? Object.fromEntries(
        Object.entries(mediaTypeObject.encoding)
          .filter(([, encodingObj]) => encodingObj.contentType)
          .map(([propName, encodingObj]) => [
            propName,
            {
              contentType: encodingObj.contentType!,
              isImplicit: false,
              contentTypeParsed: parseContentTypes(
                encodingObj.contentType!,
                propName
              )
            }
          ])
      )
    : {};

  // Auto-infer content types based on schema types
  const schema = mediaTypeObject?.schema;
  const autoEncoding: Record<
    string,
    {
      contentType: string;
      isImplicit: boolean;
      contentTypeParsed: ParsedMediaType[];
    }
  > = {};

  if (!schema) {
    const joined = { ...autoEncoding, ...explicitEncoding };
    return Object.keys(joined).length ? joined : undefined;
  }

  // Resolve $ref if present
  const resolvedSchema = refs.resolveObject(schema);

  if ('properties' in resolvedSchema && resolvedSchema.properties) {
    Object.entries(resolvedSchema.properties).forEach(
      ([propName, propSchema]) => {
        // Skip if already has explicit encoding
        if (explicitEncoding[propName]) {
          return;
        }

        if (!propSchema || typeof propSchema !== 'object') {
          return;
        }

        // Resolve $ref for property schema
        const resolvedPropSchema = refs.resolveObject(propSchema);

        const inferContentTypeFromSchema = (
          s: OpenAPIV3.SchemaObject
        ): string | undefined => {
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
        };

        if (!('$ref' in resolvedPropSchema)) {
          const contentType = inferContentTypeFromSchema(resolvedPropSchema);
          if (contentType) {
            const contentTypeParsed = parseContentType(contentType);
            autoEncoding[propName] = {
              contentType,
              isImplicit: true,
              contentTypeParsed: [contentTypeParsed]
            };
          }
        }
      }
    );
  }

  const combined = { ...autoEncoding, ...explicitEncoding };
  return Object.keys(combined).length ? combined : undefined;
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
      encoding?: Record<
        string,
        {
          contentType: string;
          isImplicit: boolean;
          contentTypeParsed: ParsedMediaType[];
        }
      >;
    }
  | undefined {
  if (bodyOrResponseObject) {
    const mediaTypeObject = getMediaTypeObject(
      bodyOrResponseObject,
      allowedMediaTypes
    );

    if (mediaTypeObject) {
      const encoding = mediaTypeObject.mediaType.startsWith('multipart/')
        ? parseEncoding(mediaTypeObject, refs)
        : undefined;

      return {
        schema: parseSchema(
          mediaTypeObject.schema,
          refs,
          options,
          mediaTypeObject.mediaType
        ),
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
      encoding?: Record<
        string,
        {
          contentType: string;
          isImplicit: boolean;
          contentTypeParsed: ParsedMediaType[];
        }
      >;
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
