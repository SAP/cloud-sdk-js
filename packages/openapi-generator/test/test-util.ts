import { OpenAPIV3 } from 'openapi-types';
import { createRefs, OpenApiDocumentRefs } from '../src/parser/refs';

export const emptyDocument = {
  openapi: '3.0.0',
  info: { title: 'Spec', version: '1.0.0' },
  paths: {}
} as const;

export function createTestRefs(
  components: OpenAPIV3.ComponentsObject = {}
): Promise<OpenApiDocumentRefs> {
  return createRefs({ ...emptyDocument, components }, { strictNaming: true });
}

export const emptyObjectSchema = {
  additionalProperties: { type: 'any' },
  properties: []
};
