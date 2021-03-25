import { resolve, $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';

export const emptyDocument = {
  openapi: '3.0.0',
  info: { title: 'Spec', version: '1.0.0' },
  paths: {}
} as const;

export function createRefs(
  components: OpenAPIV3.ComponentsObject = {}
): Promise<$Refs> {
  return resolve({ ...emptyDocument, components });
}

export const emptyObjectSchema = {
  additionalProperties: { type: 'any' },
  properties: []
};
