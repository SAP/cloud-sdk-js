import { OpenApiOperation } from '../openapi-types';
import { serializeOperation } from './operation';

describe('serializeOperation', () => {
  it('serializes operation with path and query parameters', () => {
    const operation: OpenApiOperation = {
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
        },
        {
          in: 'path',
          name: 'subId',
          originalName: 'subId',
          schema: { type: 'string' },
          required: true
        }
      ],
      queryParameters: [
        {
          in: 'query',
          name: 'limit',
          originalName: 'limit',
          schema: { type: 'number' }
        }
      ],
      response: { type: 'string' },
      pathPattern: 'test/{id}/{subId}'
    };
    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Makes a get request to the 'test/{id}/{subId}' endpoint and returns a 'string'
       * 
       * @param id Path parameter with the original name id
       * @param subId Path parameter with the original name subId
       * @param queryParameters Object containing the query parameters.
       * @returns string
       */
      getFn: (id: string, subId: string, queryParameters?: {'limit'?: number}) => new OpenApiRequestBuilder<string>(
        'get',
        'test/{id}/{subId}',
        {
              pathParameters: { id, subId },
              queryParameters
            }
      )"
    `);
  });

  it('serializes operation with only path parameters', () => {
    const operation: OpenApiOperation = {
      operationId: 'deleteFn',
      method: 'delete',
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
      response: {
        additionalProperties: { type: 'any' },
        properties: []
      },
      pathPattern: 'test/{id}'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Makes a delete request to the 'test/{id}' endpoint and returns a 'Record<string, any>'
       * 
       * @param id Path parameter with the original name id
       * @returns Record<string, any>
       */
      deleteFn: (id: string) => new OpenApiRequestBuilder<Record<string, any>>(
        'delete',
        'test/{id}',
        {
              pathParameters: { id }
            }
      )"
    `);
  });

  it('serializes operation with only query parameters', () => {
    const operation: OpenApiOperation = {
      operationId: 'getFn',
      method: 'get',
      tags: [],
      pathParameters: [],
      queryParameters: [
        {
          in: 'query',
          name: 'limit',
          originalName: 'limit',
          schema: { type: 'number' }
        }
      ],
      response: { type: 'any' },
      pathPattern: 'test'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Makes a get request to the 'test' endpoint and returns a 'any'
       * 
       * @param queryParameters Object containing the query parameters.
       * @returns any
       */
      getFn: (queryParameters?: {'limit'?: number}) => new OpenApiRequestBuilder<any>(
        'get',
        'test',
        {
              queryParameters
            }
      )"
    `);
  });

  it('serializes operation with inline request body', () => {
    const operation: OpenApiOperation = {
      operationId: 'createFn',
      method: 'post',
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
      requestBody: {
        required: true,
        schema: {
          properties: [],
          additionalProperties: { type: 'any' }
        }
      },
      response: { type: 'any' },
      pathPattern: 'test/{id}'
    };
    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Makes a post request to the 'test/{id}' endpoint and returns a 'any'
       * 
       * @param id Path parameter with the original name id
       * @param body Request body
       * @returns any
       */
      createFn: (id: string, body: Record<string, any>) => new OpenApiRequestBuilder<any>(
        'post',
        'test/{id}',
        {
              pathParameters: { id },
              body
            }
      )"
    `);
  });

  it('serializes operation with referenced request body', () => {
    const operation: OpenApiOperation = {
      operationId: 'fnWithRefBody',
      method: 'post',
      tags: [],
      pathParameters: [],
      queryParameters: [],
      requestBody: {
        required: false,
        schema: { $ref: '#/components/schemas/RefType' }
      },
      response: { type: 'string' },
      pathPattern: 'test'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Makes a post request to the 'test' endpoint and returns a 'string'
       * 
       * @param body Request body
       * @returns string
       */
      fnWithRefBody: (body: RefType | undefined) => new OpenApiRequestBuilder<string>(
        'post',
        'test',
        {
              body
            }
      )"
    `);
  });
});
