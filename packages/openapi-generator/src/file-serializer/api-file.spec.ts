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
              schema: { type: 'string' },
              required: true
            }
          ],
          queryParameters: [],
          // eslint-disable-next-line no-template-curly-in-string
          pathTemplate: 'test/${id}'
        }
      ]
    };
    expect(apiFile(api)).toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';


      export const TestApi = {
        getFn: (id: string) => new OpenApiRequestBuilder(
          'get',
          \`test/\${id}\`
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
          pathTemplate: 'test'
        },
        {
          operationId: 'createFn',
          method: 'post',
          tags: [],
          pathParameters: [],
          queryParameters: [],
          requestBody: {
            name: 'body',
            required: true,
            schema: { $ref: '#/components/schemas/RefType' }
          },
          pathTemplate: 'test'
        }
      ]
    };
    expect(apiFile(api)).toMatchInlineSnapshot(`
      "import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
      import { RefType } from './model';

      export const TestApi = {
        getFn: () => new OpenApiRequestBuilder(
          'get',
          'test'
        ),
        createFn: (body: RefType) => new OpenApiRequestBuilder(
          'post',
          'test',
          {
                body
              }
        )
      };"
    `);
  });
});
