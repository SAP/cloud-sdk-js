import { parseMediaType } from './media-type';
import type { OpenAPIV3 } from 'openapi-types';
import type { OpenApiRequestBody } from '../openapi-types';
import type { OpenApiDocumentRefs } from './refs';
import type { ParserOptions } from './options';

/**
 * @internal
 */
export function parseRequestBody(
  requestBody:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.RequestBodyObject
    | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiRequestBody | undefined {
  const resolvedRequestBody = refs.resolveObject(requestBody);
  const schema = parseMediaType(resolvedRequestBody, refs, options);
  if (schema && resolvedRequestBody) {
    return {
      required: !!resolvedRequestBody.required,
      description: resolvedRequestBody.description,
      schema
    };
  }
}
