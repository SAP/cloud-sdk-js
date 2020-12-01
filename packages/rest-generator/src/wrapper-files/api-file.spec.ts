import { OpenApiDocument, OpenApiRequestBody } from '../openapi-types';
import { apiFile } from './api-file';

describe('api-file', () => {
  it('creates api file content for operations with parameters and no request bodies', () => {
    const openApiDocument: OpenApiDocument = {
      apiName: 'TestServiceApi',
      operations: [
        {
          operationName: 'getEntity',
          method: 'get',
          parameters: [
            {
              in: 'path',
              name: 'id',
              type: 'string'
            },
            {
              in: 'query',
              name: 'limit',
              type: 'number'
            }
          ],
          pattern: 'test/{id}'
        },
        {
          operationName: 'deleteEntity',
          method: 'delete',
          parameters: [
            {
              in: 'path',
              name: 'id',
              type: 'string'
            }
          ],
          pattern: 'test/{id}'
        }
      ],
      serviceDirName: 'test-service'
    };
    expect(apiFile(openApiDocument)).toMatchSnapshot();
  });

  it('creates api file content for operation with request body', () => {
    const openApiDocument: OpenApiDocument = {
      apiName: 'TestServiceApi',
      operations: [
        {
          operationName: 'createEntity',
          method: 'post',
          parameters: [],
          requestBody: {
            parameterName: 'body',
            parameterType: 'Body'
          } as OpenApiRequestBody,
          pattern: 'test'
        },
        {
          operationName: 'updateEntity',
          method: 'patch',
          parameters: [
            {
              in: 'path',
              name: 'id',
              type: 'string'
            }
          ],
          requestBody: {
            parameterName: 'body',
            parameterType: 'Body'
          } as OpenApiRequestBody,
          pattern: 'test/{id}'
        }
      ],
      serviceDirName: 'test-service'
    };
    expect(apiFile(openApiDocument)).toMatchSnapshot();
  });

  it('creates api file content for operation with no parameters or request body', () => {
    const openApiDocument: OpenApiDocument = {
      apiName: 'TestServiceApi',
      operations: [
        {
          operationName: 'getEntity',
          method: 'get',
          parameters: [],
          pattern: 'test'
        }
      ],
      serviceDirName: 'test-service'
    };
    expect(apiFile(openApiDocument)).toMatchSnapshot();
  });
});
