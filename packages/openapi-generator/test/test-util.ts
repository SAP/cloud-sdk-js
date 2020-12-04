import { resolve, $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';

export const emptyApiDefinition = {
  openapi: '3.0.0',
  info: { title: 'Spec', version: '1.0.0' },
  paths: {}
} as const;

export function createRefs(
  components: OpenAPIV3.ComponentsObject = {}
): Promise<$Refs> {
  return resolve({ ...emptyApiDefinition, components });
}
