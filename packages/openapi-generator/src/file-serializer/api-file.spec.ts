import { readPrettierConfig } from '@sap-cloud-sdk/generator-common/internal';
import { apiDocumentation, apiFile } from './api-file';
import type { OpenApiApi, OpenApiReferenceSchema } from '../openapi-types';

const singleOperationApi: OpenApiApi = {
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
      headerParameters: [],
      response: { type: 'any' },
      responses: { 200: { description: 'some response description' } },
      pathPattern: 'test/{id}'
    }
  ]
};

const multipleOperationApi: OpenApiApi = {
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
      headerParameters: [
        {
          in: 'header',
          name: 'headerParam',
          originalName: 'headerParam',
          schema: { type: 'string' },
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
      headerParameters: [],
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

const docsApi: OpenApiApi = {
  name: 'TestApi',
  operations: [
    {
      operationId: 'getFn',
      method: 'get',
      responses: { 200: { description: 'some response description' } },
      tags: [],
      pathParameters: [],
      queryParameters: [],
      headerParameters: [],
      response: { type: 'any' },
      pathPattern: 'test'
    }
  ]
};

describe('api-file', () => {
  it('serializes api file with one operation and no references', () => {
    expect(apiFile(singleOperationApi, 'MyServiceName')).toMatchSnapshot();
  });

  it('serializes api file with multiple operations and references', async () => {
    expect(apiFile(multipleOperationApi, 'MyServiceName')).toMatchSnapshot();
  });

  it('creates an api file with documentation', () => {
    expect(apiFile(docsApi, 'TestService')).toMatchSnapshot();
  });

  it('creates an api file following the esm pattern', async () => {
    const createFileOptions = {
      generateESM: true,
      overwrite: false,
      prettierOptions: await readPrettierConfig(undefined)
    };
    expect(
      apiFile(multipleOperationApi, 'MyServiceName', createFileOptions)
    ).toMatchSnapshot();
  });

  it('creates documentation for the api', () => {
    expect(
      apiDocumentation({ name: 'TestApi' } as any, 'TestService')
    ).toMatchSnapshot();
  });
});
