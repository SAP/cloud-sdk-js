import {
  OpenApiOperation,
  OpenApiParameter,
  OpenApiReferenceSchema
} from '../openapi-types';
import { operationDocumentation, serializeOperation } from './operation';

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
          required: true,
          schemaProperties: {}
        },
        {
          in: 'path',
          name: 'subId',
          originalName: 'subId',
          schema: { type: 'string' },
          required: true,
          schemaProperties: {}
        }
      ],
      queryParameters: [
        {
          in: 'query',
          name: 'limit',
          originalName: 'limit',
          schema: { type: 'number' },
          schemaProperties: {}
        }
      ],
      responses: { 200: { description: 'some response description' } },
      response: { type: 'string' },
      pathPattern: 'test/{id}/{subId}'
    };
    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of get requests to the 'test/{id}/{subId}' endpoint.
       * @param id - Path parameter.
       * @param subId - Path parameter.
       * @param queryParameters - Object containing the following keys: limit.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
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
          required: true,
          schemaProperties: {}
        }
      ],
      queryParameters: [],
      responses: { 200: { description: 'some response description' } },
      response: {
        additionalProperties: { type: 'any' },
        properties: []
      },
      pathPattern: 'test/{id}'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of delete requests to the 'test/{id}' endpoint.
       * @param id - Path parameter.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
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
          schema: { type: 'number' },
          schemaProperties: {}
        }
      ],
      responses: { 200: { description: 'some response description' } },
      response: { type: 'any' },
      pathPattern: 'test'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of get requests to the 'test' endpoint.
       * @param queryParameters - Object containing the following keys: limit.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
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
          required: true,
          schemaProperties: {}
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
      responses: { 200: { description: 'some response description' } },
      response: { type: 'any' },
      pathPattern: 'test/{id}'
    };
    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of post requests to the 'test/{id}' endpoint.
       * @param id - Path parameter.
       * @param body - Request body.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
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
      responses: { 200: { description: 'some response description' } },
      requestBody: {
        required: false,
        schema: {
          $ref: '#/components/schemas/RefType',
          schemaName: 'RefType'
        } as OpenApiReferenceSchema
      },
      response: { type: 'string' },
      pathPattern: 'test'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of post requests to the 'test' endpoint.
       * @param body - Request body.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
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

  function getOperation(): OpenApiOperation {
    return {
      response: { type: 'string' },
      method: 'GET',
      pathPattern: 'my/Api',
      pathParameters: [] as OpenApiParameter[],
      queryParameters: [] as OpenApiParameter[]
    } as OpenApiOperation;
  }

  it('creates a description for operations if not present', () => {
    const operation = getOperation();
    expect(operationDocumentation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of GET requests to the 'my/Api' endpoint.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
       */"
    `);
  });

  it('uses the description for operations if present', () => {
    const operation = {
      ...getOperation(),
      description: 'This is my Operation.'
    };
    expect(operationDocumentation(operation)).toMatch(/This is my Operation/);
  });

  it('creates documentation with path parameters', () => {
    const operation = getOperation();
    operation.pathParameters = [
      { name: 'pathParameter1' },
      { name: 'path-parameter-2' }
    ] as OpenApiParameter[];
    expect(operationDocumentation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of GET requests to the 'my/Api' endpoint.
       * @param pathParameter1 - Path parameter.
       * @param path-parameter-2 - Path parameter.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
       */"
    `);
  });

  it('uses path parameter description if present', () => {
    const operation = getOperation();
    operation.pathParameters = [
      {
        name: 'pathParameter1',
        description: 'This is my parameter description'
      }
    ] as OpenApiParameter[];
    expect(operationDocumentation(operation)).toMatch(
      /This is my parameter description/
    );
  });

  it('creates documentation with query parameters object', () => {
    const operation = getOperation();
    operation.queryParameters = [
      { name: 'queryParameter1' },
      { name: 'queryParameter2' }
    ] as OpenApiParameter[];
    expect(operationDocumentation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of GET requests to the 'my/Api' endpoint.
       * @param queryParameters - Object containing the following keys: queryParameter1, queryParameter2.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
       */"
    `);
  });

  it('creates documentation with body parameter', () => {
    const operation = getOperation();
    operation.requestBody = { schema: { type: 'string' }, required: true };
    expect(operationDocumentation(operation)).toMatchInlineSnapshot(`
      "/**
       * Create a request builder for execution of GET requests to the 'my/Api' endpoint.
       * @param body - Request body.
       * @returns The request builder, use the \`execute()\` method to trigger the request.
       */"
    `);
  });

  it('uses the body description if present', () => {
    const operation = getOperation();
    operation.requestBody = {
      schema: { type: 'string' },
      description: 'My body description',
      required: true
    };
    expect(operationDocumentation(operation)).toMatch(/My body description/);
  });

  it('creates the signature in order path parameter, body, queryParameter and returns last', () => {
    const operation = getOperation();
    operation.pathParameters = [
      { name: 'pathParameter1' }
    ] as OpenApiParameter[];
    operation.requestBody = { schema: { type: 'string' }, required: false };
    operation.queryParameters = [
      { name: 'queryParameter1' },
      { name: 'queryParameter2' }
    ] as OpenApiParameter[];
    operation.requestBody = { schema: { type: 'string' }, required: true };
    expect(operationDocumentation(operation)).toMatch(
      /@param pathParameter1.*\s.*@param body.*\s.*@param queryParameters.*\s.*@returns/
    );
  });
});
