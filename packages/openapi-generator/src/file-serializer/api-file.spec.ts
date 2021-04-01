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
    expect(apiFile(api, 'MyserviceName')).toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
      /**
       * Representation of the 'TestApi'.
       * This API is part of the 'MyserviceName' service.
       */
        export const TestApi = {
          /**
           * Create a request builder for execution of get requests to the 'test/{id}' endpoint.
           * @param id Path parameter.
           * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
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
    expect(apiFile(api, 'MyserviceName')).toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
      import type { RefType, ResponseType } from './schema';
      /**
       * Representation of the 'TestApi'.
       * This API is part of the 'MyserviceName' service.
       */
        export const TestApi = {
          /**
           * Create a request builder for execution of get requests to the 'test' endpoint.
           * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
           */
          getFn: () => new OpenApiRequestBuilder<string>(
            'get',
            'test'
          ),
          /**
           * Create a request builder for execution of post requests to the 'test' endpoint.
           * @param body Request body.
           * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
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

    expect(apiFile(api, 'TestService')).toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
      /**
       * Representation of the 'TestApi'.
       * This API is part of the 'TestService' service.
       */
        export const TestApi = {
          /**
           * Create a request builder for execution of get requests to the 'test' endpoint.
           * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
           */
          getFn: () => new OpenApiRequestBuilder<any>(
            'get',
            'test'
          )
        };"
    `);
  });
});
