import { OpenAPIV3 } from 'openapi-types';
import { createRefs, OpenApiDocumentRefs } from '../src/parser/refs';
import { OpenApiDocument } from '../src/openapi-types';

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

export const dummyOpenApiDocument: OpenApiDocument = {
  serviceOptions: {
    packageName: '@sap/dummy-package',
    directoryName: 'dummy-package'
  },
  apis: [
    {
      name: 'DummyApi',
      operations: [
        {
          operationId: 'DummyFunction'
        }
      ]
    }
  ]
} as OpenApiDocument;
