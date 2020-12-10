import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import { emptyApiDefinition } from '../test/test-util';
import {
  convertDocToGlobalTag,
  convertDocToOpenApi3
} from './document-converter';

describe('convertDocToGlobalTag', () => {
  it("replaces all tags with 'default'", () => {
    const newSpec = convertDocToGlobalTag({
      ...emptyApiDefinition,
      paths: {
        '/pattern1': {
          get: {
            tags: ['tag1', 'tag2']
          },
          post: {
            tags: ['tag']
          }
        },
        '/pattern1/pattern2': {
          get: {},
          post: {
            tags: ['tag']
          }
        }
      }
    });

    expect(newSpec).toEqual({
      ...emptyApiDefinition,
      tags: [{ name: 'default' }],
      paths: {
        '/pattern1': {
          get: {
            tags: ['default']
          },
          post: {
            tags: ['default']
          }
        },
        '/pattern1/pattern2': {
          get: { tags: ['default'] },
          post: {
            tags: ['default']
          }
        }
      }
    });
  });
});

describe('convertDocToOpenApi3', () => {
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
  it('converts Swagger documents to OpenApi', async () => {
    expect(await convertDocToOpenApi3(swaggerDoc)).toStrictEqual(openApiDoc);
  });

  it('does not change OpenApi documents', async () => {
    expect(await convertDocToOpenApi3(openApiDoc)).toStrictEqual(openApiDoc);
  });
});
