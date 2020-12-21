import { OpenApiDocument, OpenApiRequestBody } from '../openapi-types';
import { apiFile } from './api-file';

describe('api-file', () => {
  it('creates api file content for operations with parameters and no request bodies', () => {
    const openApiDocument: OpenApiDocument = {
      apiName: 'TestApi',
      operations: [
        {
          operationName: 'getFn',
          method: 'get',
          parameters: [
            {
              in: 'query',
              name: 'limit',
              type: 'number'
            },
            {
              in: 'path',
              name: 'id',
              type: 'string',
              required: true
            }
          ],
          pattern: 'test/{id}'
        },
        {
          operationName: 'deleteFn',
          method: 'delete',
          parameters: [
            {
              in: 'path',
              name: 'id',
              type: 'string',
              required: true
            }
          ],
          pattern: 'test/{id}'
        }
      ]
    };
    expect(apiFile(openApiDocument)).toMatchSnapshot();
  });

  it('creates api file content for operation with request body', () => {
    const openApiDocument: OpenApiDocument = {
      apiName: 'TestApi',
      operations: [
        {
          operationName: 'createFn',
          method: 'post',
          parameters: [],
          requestBody: {
            parameterName: 'body',
            parameterType: {
              isReferenceType: true,
              isArrayType: false,
              innerType: 'TestEntity',
              isInnerTypeReferenceType: true
            },
            required: true
          } as OpenApiRequestBody,
          pattern: 'test'
        },
        {
          operationName: 'updateFn',
          method: 'patch',
          parameters: [
            {
              in: 'path',
              name: 'id',
              type: 'string',
              required: true
            }
          ],
          requestBody: {
            parameterName: 'body',
            parameterType: {
              isReferenceType: false,
              isArrayType: true,
              innerType: 'string',
              isInnerTypeReferenceType: false,
              arrayLevel: 1
            },
            required: true
          } as OpenApiRequestBody,
          pattern: 'test/{id}'
        }
      ]
    };
    expect(apiFile(openApiDocument)).toMatchSnapshot();
  });

  it('creates api file content for operation with no parameters or request body', () => {
    const openApiDocument: OpenApiDocument = {
      apiName: 'TestApi',
      operations: [
        {
          operationName: 'getFn',
          method: 'get',
          parameters: [],
          pattern: 'test'
        }
      ]
    };
    expect(apiFile(openApiDocument)).toMatchSnapshot();
  });

  it('creates api file content for operation with required parameters defined after optional parameters', () => {
    const openApiDocument: OpenApiDocument = {
      apiName: 'TestApi',
      operations: [
        {
          operationName: 'createFn',
          method: 'post',
          parameters: [
            {
              in: 'query',
              name: 'optionalQueryParam',
              type: 'number'
            },
            {
              in: 'query',
              name: 'requiredQueryParam',
              type: 'number',
              required: true
            },
            {
              in: 'path',
              name: 'requiredPathParam',
              type: 'number',
              required: true
            }
          ],
          requestBody: {
            parameterName: 'body',
            parameterType: {
              isReferenceType: true,
              isArrayType: true,
              innerType: 'TestEntity',
              isInnerTypeReferenceType: true,
              arrayLevel: 2
            },
            required: true
          } as OpenApiRequestBody,
          pattern: 'test'
        }
      ]
    };
    expect(apiFile(openApiDocument)).toMatchSnapshot();
  });

  it('creates api file content for operation with only optional parameters', () => {
    const openApiDocument: OpenApiDocument = {
      apiName: 'TestApi',
      operations: [
        {
          operationName: 'getFn',
          method: 'get',
          parameters: [
            {
              in: 'query',
              name: 'optionalQueryParam',
              type: 'number'
            }
          ],
          pattern: 'test'
        }
      ]
    };
    expect(apiFile(openApiDocument)).toMatchSnapshot();
  });
});
