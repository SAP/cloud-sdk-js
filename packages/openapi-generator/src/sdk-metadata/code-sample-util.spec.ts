import { getLevenshteinClosest } from '@sap-cloud-sdk/generator-common';
import {
  OpenApiApi,
  OpenApiOperation,
  OpenApiParameter
} from '../openapi-types';
import {
  getGetAllOperation,
  getGetOperation,
  getMainApi,
  getMainOperation,
  getOperationParamCode
} from './code-sample-util';

describe('code-sample-util api', () => {
  const pathParam1 = { name: 'path-Param1' };
  const pathParam2 = { name: 'Path-Param2' };

  const queryParam1 = { name: 'query-Param1', required: true };
  const queryParam2 = { name: 'query-Param2', required: false };
  const queryParam3 = { name: 'query-Param3', required: true };

  const api_1: OpenApiApi = {
    name: 'DummyApi',
    operations: [
      {
        operationId: 'DummyFunction',
        method: 'get',
        responses: { 200: { description: 'some response description' } },
        tags: [],
        pathParameters: [],
        queryParameters: [],
        response: { type: 'any' },
        pathPattern: ''
      }
    ]
  };

  const api_2: OpenApiApi = {
    name: 'TestApi',
    operations: [
      {
        operationId: 'getAll',
        method: 'get',
        responses: { 200: { description: 'some response description' } },
        tags: [],
        pathParameters: [],
        queryParameters: [],
        response: { type: 'any' },
        pathPattern: ''
      },
      {
        operationId: 'Test',
        method: 'get',
        responses: { 200: { description: 'some response description' } },
        tags: [],
        pathParameters: [],
        queryParameters: [],
        response: { type: 'any' },
        pathPattern: ''
      }
    ]
  };

  it('gets main api based on levenshtein algo', () => {
    expect(getMainApi('dummy', [api_1, api_2])).toEqual(
      expect.objectContaining({
        name: 'DummyApi'
      })
    );
  });

  it('gets main api with getAll operation', () => {
    expect(getMainApi('resource', [api_1, api_2])).toEqual(
      expect.objectContaining({
        operations: [
          {
            operationId: 'getAll',
            method: 'get',
            tags: [],
            pathParameters: [],
            queryParameters: [],
            response: { type: 'any' },
            pathPattern: '',
            responses: {
              200: {
                description: 'some response description'
              }
            }
          },
          {
            operationId: 'Test',
            method: 'get',
            tags: [],
            pathParameters: [],
            queryParameters: [],
            response: { type: 'any' },
            pathPattern: '',
            responses: {
              200: {
                description: 'some response description'
              }
            }
          }
        ]
      })
    );
  });
  it('gets main operationId based on levenshtein algo', () => {
    expect(getMainOperation(api_2)).toEqual(
      expect.objectContaining({
        operationId: 'Test'
      })
    );
  });

  it('gets undefined main operationId if no closest match found using levenshtein algo', () => {
    const extractorFn = (x: OpenApiOperation) => x.operationId;
    expect(
      getLevenshteinClosest('ResourceApi', api_2.operations, extractorFn)
    ).toBeUndefined();
  });

  it('gets getAll operation if no closest match found', () => {
    expect(getGetAllOperation(api_2.operations)).toEqual(
      expect.objectContaining({
        operationId: 'getAll'
      })
    );
  });

  it('gets undefined if no getAll operation found', () => {
    expect(getGetAllOperation(api_1.operations)).toBeUndefined();
  });

  it('gets any get operation if no getAll operation found', () => {
    expect(getGetOperation(api_1.operations)).toEqual(
      expect.objectContaining({
        operationId: 'DummyFunction',
        method: 'get'
      })
    );
  });

  it('returns empty params string if there are no parameters', () => {
    const operation = {
      operationId: 'getAll',
      pathParameters: [] as OpenApiParameter[],
      queryParameters: [] as OpenApiParameter[]
    } as OpenApiOperation;
    expect(getOperationParamCode(operation)).toEqual('');
  });

  it('generates param string with path params', () => {
    const operation = {
      pathParameters: [pathParam1, pathParam2],
      queryParameters: [] as OpenApiParameter[]
    } as OpenApiOperation;

    expect(getOperationParamCode(operation)).toMatchInlineSnapshot(
      '"path-Param1, Path-Param2"'
    );
  });

  it('generates param string with path, mandatory query params and skips optional query params', () => {
    const operation = {
      pathParameters: [pathParam1],
      queryParameters: [queryParam1, queryParam2, queryParam3]
    } as OpenApiOperation;

    expect(getOperationParamCode(operation)).toMatchInlineSnapshot(
      "\"path-Param1, { query-Param1: 'myQueryParam1', query-Param3: 'myQueryParam3' }\""
    );
  });

  it('generates param string with path params and mandatory request body', () => {
    const operation = {
      pathParameters: [pathParam1],
      queryParameters: [] as OpenApiParameter[],
      requestBody: { required: true }
    } as OpenApiOperation;

    expect(getOperationParamCode(operation)).toMatchInlineSnapshot(
      '"path-Param1, myRequestBody"'
    );
  });

  it('generates param string with path, mandatory query params and optional request body', () => {
    const operation = {
      pathParameters: [pathParam1],
      queryParameters: [queryParam1, queryParam2, queryParam3],
      requestBody: { required: false }
    } as OpenApiOperation;

    expect(getOperationParamCode(operation)).toMatchInlineSnapshot(
      "\"path-Param1, undefined, { query-Param1: 'myQueryParam1', query-Param3: 'myQueryParam3' }\""
    );
  });
});
