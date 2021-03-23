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
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'path',
          name: 'subId',
          schema: { type: 'string' },
          required: true
        }
      ],
      queryParameters: [
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'number' }
        }
      ],
      response: { type: 'string' },
      // eslint-disable-next-line no-template-curly-in-string
      pathTemplate: 'test/${id}/${subId}'
    };
    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "getFn: (id: string, subId: string, queryParameters?: {'limit'?: number}) => new OpenApiRequestBuilder<string>(
        'get',
        \`test/\${id}/\${subId}\`,
        {
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
          schema: { type: 'string' },
          required: true
        }
      ],
      queryParameters: [],
      response: { type: 'object', additionalProperties: true, properties: [] },
      // eslint-disable-next-line no-template-curly-in-string
      pathTemplate: 'test/${id}'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "deleteFn: (id: string) => new OpenApiRequestBuilder<Record<string, any>>(
        'delete',
        \`test/\${id}\`
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
          schema: { type: 'number' }
        }
      ],
      response: { type: 'any' },
      pathTemplate: 'test'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "getFn: (queryParameters?: {'limit'?: number}) => new OpenApiRequestBuilder<any>(
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
          schema: { type: 'string' },
          required: true
        }
      ],
      queryParameters: [],
      requestBody: {
        name: 'body',
        required: true,
        schema: {
          type: 'object',
          properties: [],
          additionalProperties: true
        }
      },
      response: { type: 'any' },
      // eslint-disable-next-line no-template-curly-in-string
      pathTemplate: 'test/${id}'
    };
    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "createFn: (id: string, body: Record<string, any>) => new OpenApiRequestBuilder<any>(
        'post',
        \`test/\${id}\`,
        {
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
        name: 'body',
        required: false,
        schema: { $ref: '#/components/schemas/RefType' }
      },
      response: { type: 'string' },
      pathTemplate: 'test'
    };

    expect(serializeOperation(operation)).toMatchInlineSnapshot(`
      "fnWithRefBody: (body: RefType | undefined) => new OpenApiRequestBuilder<string>(
        'post',
        'test',
        {
              body
            }
      )"
    `);
  });
});
