import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import mock from 'mock-fs';
import { convertDocToOpenApiV3, parseFileAsJson } from './document-converter';

describe('document-converter', () => {
  describe('convertDocToOpenApiV3', () => {
    const swaggerDoc: OpenAPIV2.Document = {
      info: { title: 'Test Service', version: '1.0.0' },
      swagger: '2.0',
      paths: {
        'path/{pathParam}': {
          parameters: [
            {
              in: 'path',
              name: 'pathParam',
              required: true,
              type: 'string'
            }
          ],
          post: {
            operationId: 'postPathByPathParam',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
              {
                in: 'query',
                name: 'queryParam',
                type: 'integer'
              },
              {
                in: 'body',
                name: 'bodyParam',
                schema: {
                  $ref: '#/components/schemas/TestItem'
                }
              }
            ],

            responses: {
              200: {
                description: 'response',
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/TestItem'
                  }
                }
              }
            }
          }
        }
      },
      definitions: {
        TestItem: {
          properties: {
            someProperty: {
              type: 'string'
            }
          }
        }
      }
    };

    const openApiDoc: OpenAPIV3.Document = {
      info: { title: 'Test Service', version: '1.0.0' },
      openapi: '3.0.0',
      paths: {
        'path/{pathParam}': {
          parameters: [
            {
              in: 'path',
              name: 'pathParam',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          post: {
            operationId: 'postPathByPathParam',
            parameters: [
              {
                in: 'query',
                name: 'queryParam',
                schema: {
                  type: 'integer'
                }
              }
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/TestItem'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/TestItem'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          TestItem: {
            properties: {
              someProperty: {
                type: 'string'
              }
            }
          }
        }
      }
    };

    it('converts Swagger documents to OpenAPI', async () => {
      expect(await convertDocToOpenApiV3(swaggerDoc)).toStrictEqual(openApiDoc);
    });

    it('does not change OpenAPI documents', async () => {
      expect(await convertDocToOpenApiV3(openApiDoc)).toStrictEqual(openApiDoc);
    });
  });

  describe('parseFileAsJson', () => {
    it('does not throw error for JSON or YAML files', async () => {
      const jsonContent = { test: 'test' };
      mock({
        '/path/': {
          'spec.json': JSON.stringify(jsonContent),
          'spec.yaml': 'test: test',
          'spec.yml': 'test: test'
        }
      });
      expect(await parseFileAsJson('/path/spec.json')).toStrictEqual(
        jsonContent
      );
      expect(await parseFileAsJson('/path/spec.yaml')).toStrictEqual(
        jsonContent
      );
      expect(await parseFileAsJson('/path/spec.yml')).toStrictEqual(
        jsonContent
      );
      mock.restore();
    });

    it('throws an error for non JSON or YAML files', async () => {
      mock({
        '/path/': {
          'no-extension': 'test',
          'other-extension.test': 'test'
        }
      });
      await expect(() =>
        parseFileAsJson('/path/no-extension')
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Could not parse OpenAPI specification at /path/no-extension. Only JSON and YAML files are allowed."'
      );
      await expect(() =>
        parseFileAsJson('/path/other-extension.test')
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Could not parse OpenAPI specification at /path/other-extension.test. Only JSON and YAML files are allowed."'
      );
      mock.restore();
    });
  });
});
