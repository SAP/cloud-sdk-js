import {
  getMediaTypes,
  parseMediaType,
  parseTopLevelMediaType
} from './media-type';
import { parseMediaTypeString } from './schema';
import type { OpenAPIV3 } from 'openapi-types';
import type { OpenApiRequestBody } from '../openapi-types';
import type { ParsedMediaType } from './media-type';
import type { OpenApiDocumentRefs } from './refs';
import type { ParserOptions } from './options';

/**
 * @internal
 */
export function parseRequestBodies(
  requestBody:
    OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiRequestBody[] {
  const resolvedRequestBody = refs.resolveObject(requestBody);
  if (!resolvedRequestBody) {
    return [];
  }

  const mediaTypes = [
    ...new Set(
      getMediaTypes(resolvedRequestBody)
        .map(parseMediaTypeString)
        .filter((mediaType): mediaType is string => !!mediaType)
    )
  ];
  const parsedMediaTypes = mediaTypes
    .map(mediaType =>
      parseTopLevelMediaType(resolvedRequestBody, refs, options, mediaType)
    )
    .filter((mediaType): mediaType is ParsedMediaType => !!mediaType);

  if (parsedMediaTypes.length) {
    return parsedMediaTypes.map(mediaType => ({
      required: !!resolvedRequestBody.required,
      description: resolvedRequestBody.description,
      ...mediaType
    }));
  }

  const fallback = parseMediaType(resolvedRequestBody, refs, options);
  return fallback
    ? [
        {
          required: !!resolvedRequestBody.required,
          description: resolvedRequestBody.description,
          ...fallback
        }
      ]
    : [];
}
