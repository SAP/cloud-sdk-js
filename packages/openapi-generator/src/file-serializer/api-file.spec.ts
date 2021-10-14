import { OpenApiApi, OpenApiReferenceSchema } from '../openapi-types';
import { apiDocumentation, apiFile } from './api-file';

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
              required: true,
              schemaProperties: {}
            }
          ],
          queryParameters: [],
          response: { type: 'any' },
          responses: { 200: { description: 'some response description' } },
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
         * @param id - Path parameter.
         * @returns The request builder, use the \`execute()\` method to trigger the request.
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
          responses: { 200: { description: 'some response description' } },
          tags: [],
          pathParameters: [
            {
              in: 'path',
              name: 'id',
              originalName: 'id',
              schema: {
                $ref: '#/components/schemas/PathParameterType',
                schemaName: 'PathParameterType'
              } as OpenApiReferenceSchema,
              required: true,
              schemaProperties: {}
            }
          ],
          queryParameters: [
            {
              in: 'query',
              name: 'queryParam',
              originalName: 'queryParam',
              schema: {
                $ref: '#/components/schemas/QueryParameterType',
                schemaName: 'QueryParameterType'
              } as OpenApiReferenceSchema,
              required: true,
              schemaProperties: {}
            }
          ],
          pathPattern: 'test/{id}',
          response: { type: 'string' }
        },
        {
          operationId: 'createFn',
          method: 'post',
          responses: { 201: { description: 'some response description' } },
          tags: [],
          pathParameters: [],
          queryParameters: [],
          requestBody: {
            required: true,
            schema: {
              $ref: '#/components/schemas/RefType',
              schemaName: 'RefType'
            } as OpenApiReferenceSchema
          },
          pathPattern: 'test',
          response: {
            $ref: '#/components/schemas/ResponseType',
            schemaName: 'ResponseType'
          } as OpenApiReferenceSchema
        }
      ]
    };
    expect(apiFile(api, 'MyserviceName')).toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
      import type { QueryParameterType, RefType, ResponseType } from './schema';
      /**
       * Representation of the 'TestApi'.
       * This API is part of the 'MyserviceName' service.
       */
      export const TestApi = {
        /**
         * Create a request builder for execution of get requests to the 'test/{id}' endpoint.
         * @param id - Path parameter.
         * @param queryParameters - Object containing the following keys: queryParam.
         * @returns The request builder, use the \`execute()\` method to trigger the request.
         */
        getFn: (id: string, queryParameters: {'queryParam': QueryParameterType}) => new OpenApiRequestBuilder<string>(
          'get',
          'test/{id}',
          {
                pathParameters: { id },
                queryParameters
              }
        ),
        /**
         * Create a request builder for execution of post requests to the 'test' endpoint.
         * @param body - Request body.
         * @returns The request builder, use the \`execute()\` method to trigger the request.
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
          responses: { 200: { description: 'some response description' } },
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
         * @returns The request builder, use the \`execute()\` method to trigger the request.
         */
        getFn: () => new OpenApiRequestBuilder<any>(
          'get',
          'test'
        )
      };"
    `);
  });

  it('creates documentation for the api', () => {
    expect(apiDocumentation({ name: 'TestApi' } as any, 'TestService'))
      .toMatchInlineSnapshot(`
      "/**
       * Representation of the 'TestApi'.
       * This API is part of the 'TestService' service.
       */"
    `);
  });
});
