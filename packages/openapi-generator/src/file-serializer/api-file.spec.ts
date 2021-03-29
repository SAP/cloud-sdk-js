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

  it('creates a api File with documentation', () => {
    const api: OpenApiApi = {
      name: 'TestApi',
      operations: [
        {
          operationId: 'getFn',
          method: 'get',
          tags: [],
          pathParameters: [],
          queryParameters: [],
          response: { type: 'any' },
          pathPattern: 'test'
        }
      ]
    };

    expect(apiFile(api, { serviceName: 'TestService' } as any))
      .toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';

      /**
       * Representation of the TestApi API.
       * This API is part of the TestService service.
       * 
       * This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
      */
      export const TestApi = {
        /**
         * Makes a get request to the 'test' endpoint and returns a 'any'
         * 
         * @returns any
        */
        getFn: () => new OpenApiRequestBuilder<any>(
          'get',
          'test'
        )
      };"
    `);
  });
});
