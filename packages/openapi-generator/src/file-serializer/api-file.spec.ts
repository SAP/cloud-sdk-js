import { OpenApiApi } from '../openapi-types';
import { apiFile } from './api-file';

describe('apiFile', () => {
  it('apiFile serializes api file with one operation and no references', () => {
    const api: OpenApiApi = {
      name: 'TestApi',
      operations: [
        {
          operationId: 'getFn',
          method: 'get',
          tags: [],
          pathParameters: [
            {
              in: 'path',
              name: 'id',
              originalName: 'id',
              schema: { type: 'string' },
              required: true
            }
          ],
          queryParameters: [],
          response: { type: 'any' },
          pathPattern: 'test/{id}'
        }
      ]
    };
    expect(apiFile(api)).toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';

      export const TestApi = {
        getFn: (id: string) => new OpenApiRequestBuilder<any>(
          'get',
          'test/{id}',
          {
                pathParameters: { id }
              }
        )
      };"
    `);
  });

  it('apiFile serializes api file with multiple operations and references', () => {
    const api: OpenApiApi = {
      name: 'TestApi',
      operations: [
        {
          operationId: 'getFn',
          method: 'get',
          tags: [],
          pathParameters: [],
          queryParameters: [],
          pathPattern: 'test',
          response: { type: 'string' }
        },
        {
          operationId: 'createFn',
          method: 'post',
          tags: [],
          pathParameters: [],
          queryParameters: [],
          requestBody: {
            required: true,
            schema: { $ref: '#/components/schemas/RefType' }
          },
          pathPattern: 'test',
          response: { $ref: '#/components/schemas/ResponseType' }
        }
      ]
    };
    expect(apiFile(api)).toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
      import type { RefType, ResponseType } from './schema';

      export const TestApi = {
        getFn: () => new OpenApiRequestBuilder<string>(
          'get',
          'test'
        ),
        createFn: (body: RefType) => new OpenApiRequestBuilder<ResponseType>(
          'post',
          'test',
          {
                body
              }
        )
      };"
    `);
  });
});
