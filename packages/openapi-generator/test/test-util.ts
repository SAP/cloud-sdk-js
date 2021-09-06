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
  serviceName: 'dummy',
  serviceOptions: {
    packageName: '@sap/dummy-package',
    directoryName: 'dummy-package'
  },
  apis: [
    {
      name: 'DummyApi',
      operations: [
        {
          operationId: 'DummyFunction',
          pathParameters: [
            {
              name: 'dummyId'
            }
          ],
          requestBody: {
            required: false
          },
          queryParameters: [
            {
              name: 'query_1',
              required: true
            },
            {
              name: 'query_2',
              required: false
            }
          ]
        }
      ]
    },
    {
      name: 'ResourceApi',
      operations: [
        {
          operationId: 'ResourceFunction',
          pathParameters: [
            {
              name: 'resourceId'
            }
          ],
          requestBody: {
            required: false
          },
          queryParameters: [
            {
              name: 'query_1',
              required: true
            },
            {
              name: 'query_2',
              required: false
            }
          ]
        }
      ]
    }
  ]
} as OpenApiDocument;
