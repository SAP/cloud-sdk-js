import { OpenAPIV3 } from 'openapi-types';
import { OpenApiRequestBody } from '../openapi-types';
import { OpenApiDocumentRefs } from './refs';
import { parseMediaType } from './media-type';
import { ParserOptions } from './options';

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
