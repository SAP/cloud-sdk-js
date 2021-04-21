import { OpenAPIV3 } from 'openapi-types';
import { OpenApiRequestBody } from '../openapi-types';
import { OpenApiDocumentRefs } from './refs';
import { parseMediaType } from './media-type';

export function parseRequestBody(
  requestBody:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.RequestBodyObject
    | undefined,
  refs: OpenApiDocumentRefs
): OpenApiRequestBody | undefined {
  const resolvedRequestBody = refs.resolveObject(requestBody);
  const schema = parseMediaType(resolvedRequestBody, refs);
  if (schema && resolvedRequestBody) {
    return {
      required: !!resolvedRequestBody.required,
      description: resolvedRequestBody.description,
      schema
    };
  }
}
