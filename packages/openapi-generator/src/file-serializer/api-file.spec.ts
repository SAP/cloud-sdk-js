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
        /**
         * Makes a get request to the 'test/{id}' endpoint and returns a 'any'
         * 
         * @param id Path parameter with the original name id
         * @returns any
         */
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
        /**
         * Makes a get request to the 'test' endpoint and returns a 'string'
         * 
         * @returns string
         */
        getFn: () => new OpenApiRequestBuilder<string>(
          'get',
          'test'
        ),
        /**
         * Makes a post request to the 'test' endpoint and returns a 'ResponseType'
         * 
         * @param body Request body
         * @returns ResponseType
         */
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
       * Representation of the 'TestApi'.
       * This API is part of the 'TestService' service.
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
