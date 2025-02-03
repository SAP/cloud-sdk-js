import { createLogger } from '@sap-cloud-sdk/util';
import { createTestRefs, emptyObjectSchema } from '../../test/test-util';
import { parseSchema, parseSchemaProperties } from './schema';
import type { OpenApiObjectSchema } from '../openapi-types';
import type { OpenAPIV3 } from 'openapi-types';

describe('schema parser', () => {
  describe('parseSchema()', () => {
    const defaultOptions = {
      strictNaming: true,
      schemaPrefix: '',
      resolveExternal: true
    };

    it('parses reference schema', async () => {
      const schema = { $ref: '#/components/schemas/test' };
      expect(
        parseSchema(
          schema,
          await createTestRefs({ schemas: { test: { type: 'string' } } }),
          defaultOptions
        )
      ).toEqual({
        ...schema,
        schemaName: 'Test',
        fileName: 'test'
      });
    });

    it('parses simple schema', async () => {
      const schema: OpenAPIV3.SchemaObject = { type: 'string' };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual(schema);
    });

    it('parses simple schema with description', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'object',
        properties: { prop1: { description: 'My Description', type: 'string' } }
      };
      expect(
        (
          parseSchema(
            schema,
            await createTestRefs(),
            defaultOptions
          ) as OpenApiObjectSchema
        ).properties[0].description
      ).toBe('My Description');
    });

    it('parses simple schema with nullable property', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'object',
        properties: {
          prop1: {
            description: 'My Description',
            type: 'string',
            nullable: true
          }
        }
      };
      expect(
        (
          parseSchema(
            schema,
            await createTestRefs(),
            defaultOptions
          ) as OpenApiObjectSchema
        ).properties[0].nullable
      ).toBe(true);
    });

    it('parses array schema', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'array',
        items: { type: 'string' }
      };

      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        items: { type: 'string' }
      });
    });

    it('parses array schema with unique items', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'array',
        uniqueItems: true,
        items: { type: 'string' }
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        uniqueItems: true,
        items: { type: 'string' }
      });
    });

    it('parses array schema with nested object schema', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'array',
        uniqueItems: true,
        items: { type: 'object' }
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        uniqueItems: true,
        items: emptyObjectSchema
      });
    });

    it('parses object schema with nested object schema with additional properties', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        required: ['simpleProperty'],
        properties: {
          simpleProperty: {
            type: 'string'
          },
          nestedObjectProperty: {
            additionalProperties: {
              properties: { simpleProperty: { type: 'string' } }
            }
          }
        }
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        properties: [
          {
            name: 'simpleProperty',
            description: undefined,
            required: true,
            nullable: false,
            schema: {
              type: 'string'
            },
            schemaProperties: {}
          },
          {
            name: 'nestedObjectProperty',
            required: false,
            description: undefined,
            nullable: false,
            schema: {
              additionalProperties: {
                additionalProperties: { type: 'any' },
                properties: [
                  {
                    name: 'simpleProperty',
                    description: undefined,
                    required: false,
                    nullable: false,
                    schema: {
                      type: 'string'
                    },
                    schemaProperties: {}
                  }
                ]
              },
              properties: []
            },
            schemaProperties: {}
          }
        ],
        additionalProperties: { type: 'any' }
      });
    });

    it('parses object schema with schema properties', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        required: ['simpleProperty'],
        properties: {
          simpleProperty: {
            type: 'string',
            deprecated: true,
            example: 'test',
            maxLength: 10,
            default: 'testString',
            nullable: false
          }
        }
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        properties: [
          {
            name: 'simpleProperty',
            description: undefined,
            required: true,
            nullable: false,
            schema: {
              type: 'string'
            },
            schemaProperties: {
              deprecated: true,
              example: 'test',
              maxLength: 10,
              default: 'testString'
            }
          }
        ],
        additionalProperties: { type: 'any' }
      });
    });

    it('parses object schema with referenced property description as undefined', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        description: 'Object Description',
        type: 'object',
        properties: {
          prop: {
            $ref: '#/components/schemas/PropertySchema'
          }
        }
      };
      expect(
        (
          parseSchema(
            schema,
            await createTestRefs({
              schemas: { PropertySchema: { type: 'string' } }
            }),
            defaultOptions
          ) as OpenApiObjectSchema
        ).properties[0].description
      ).toBeUndefined();
    });

    it('parses object schema with inline property description', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        description: 'Object Description',
        type: 'object',
        properties: {
          prop: {
            description: 'Property Description',
            type: 'string'
          }
        }
      };

      expect(
        (
          parseSchema(
            schema,
            await createTestRefs({
              schemas: { PropertySchema: { type: 'string' } }
            }),
            defaultOptions
          ) as OpenApiObjectSchema
        ).properties[0].description
      ).toEqual('Property Description');
    });

    it('parses schema properties and ignores unknown and undefined properties', () => {
      const schemaProperties = {
        deprecated: true,
        example: 100,
        minimum: 10,
        maximum: 1000,
        default: 10,
        maxLength: undefined,
        minLength: undefined,
        format: undefined,
        unknownProperty: undefined
      };
      expect(parseSchemaProperties(schemaProperties)).toEqual({
        deprecated: true,
        example: 100,
        minimum: 10,
        maximum: 1000,
        default: 10
      });
    });

    it('throws an error if there are neither properties nor additional properties', async () => {
      const refs = await createTestRefs();
      expect(() =>
        parseSchema(
          {
            type: 'object',
            additionalProperties: false,
            properties: {}
          },
          refs,
          defaultOptions
        )
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not parse object schema without neither properties nor additional properties."'
      );
    });

    it('parses enum schema', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        enum: ['1', '2', '3'],
        type: 'number'
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual(schema);
    });

    it('parses string enum schema', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        enum: ['one', 'two', 'three'],
        type: 'string'
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        type: 'string',
        enum: ["'one'", "'two'", "'three'"]
      });
    });

    it('parses string enum schema with integers', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        enum: [1, 2, 3],
        type: 'string'
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        type: 'string',
        enum: ["'1'", "'2'", "'3'"]
      });
    });

    it('parses string enum schema with a null value and nullable set to true', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        enum: [1, 2, 3, null],
        type: 'string',
        nullable: true
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        type: 'string',
        enum: ["'1'", "'2'", "'3'", null]
      });
    });

    it('parses string enum schema with a null value, no nullable set, and skipValidation set to false', async () => {
      const logger = createLogger('openapi-generator');
      jest.spyOn(logger, 'warn');
      const schema: OpenAPIV3.SchemaObject = {
        enum: [1, 2, 3, null],
        type: 'string'
      };
      parseSchema(schema, await createTestRefs(), {
        strictNaming: false,
        schemaPrefix: '',
        resolveExternal: true
      });
      expect(logger.warn).toHaveBeenCalledWith(
        'null was used as a parameter in an enum, although the schema was not declared as nullable'
      );
    });

    it('parses string enum schema with a null value and no nullable set and strictNaming set to true', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        enum: [1, 2, 3, null],
        type: 'string'
      };
      expect(async () => {
        parseSchema(schema, await createTestRefs(), defaultOptions);
      }).rejects.toThrowErrorMatchingInlineSnapshot(
        '"null was used as a parameter in an enum, although the schema was not declared as nullable"'
      );
    });

    it('parses string enum schema with escaping', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        enum: ["valueWith'Quot'es"],
        type: 'string'
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        type: 'string',
        enum: ["'valueWith\\'Quot\\'es'"]
      });
    });

    it("parses enum schema with 'string' as default", async () => {
      const schema: OpenAPIV3.SchemaObject = {
        enum: ['one', 'two', 'three']
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        type: 'string',
        enum: ["'one'", "'two'", "'three'"]
      });
    });

    it('parses oneOf, anyOf, allOf schemas', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        oneOf: [
          { type: 'object' },
          {
            anyOf: [
              { type: 'object' },
              { allOf: [{ type: 'object' }, { type: 'string' }] }
            ]
          }
        ]
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        oneOf: [
          emptyObjectSchema,
          {
            anyOf: [
              emptyObjectSchema,
              { allOf: [emptyObjectSchema, { type: 'string' }] }
            ]
          }
        ]
      });
    });

    it('parses xOf schema ignoring type:object at same level', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'object',
        oneOf: [
          { type: 'object' },
          {
            anyOf: [
              { type: 'object' },
              { allOf: [{ type: 'object' }, { type: 'string' }] }
            ]
          }
        ]
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        oneOf: [
          emptyObjectSchema,
          {
            anyOf: [
              emptyObjectSchema,
              { allOf: [emptyObjectSchema, { type: 'string' }] }
            ]
          }
        ]
      });
    });

    it('normalizes xOf schemas with properties at same level', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'object',
        properties: { prop1: { type: 'string' } },
        oneOf: [
          { type: 'object' },
          {
            allOf: [{ type: 'object' }, { type: 'string' }]
          }
        ]
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        oneOf: [
          emptyObjectSchema,
          { allOf: [emptyObjectSchema, { type: 'string' }] },
          {
            additionalProperties: { type: 'any' },
            properties: [
              {
                name: 'prop1',
                description: undefined,
                required: false,
                nullable: false,
                schema: {
                  type: 'string'
                },
                schemaProperties: {}
              }
            ]
          }
        ]
      });
    });

    it('parses xOf schemas with required', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        oneOf: [
          { type: 'object' },
          {
            allOf: [
              { type: 'object', properties: { prop1: { type: 'string' } } },
              { type: 'string' }
            ],
            required: ['prop1']
          }
        ]
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        oneOf: [
          emptyObjectSchema,
          {
            allOf: [
              {
                additionalProperties: { type: 'any' },
                properties: [
                  {
                    name: 'prop1',
                    description: undefined,
                    required: true,
                    nullable: false,
                    schema: {
                      type: 'string'
                    },
                    schemaProperties: {}
                  }
                ]
              },
              { type: 'string' }
            ]
          }
        ]
      });
    });

    it('parses not schema', async () => {
      const schema: OpenAPIV3.SchemaObject = {
        not: { type: 'object' }
      };
      expect(
        parseSchema(schema, await createTestRefs(), defaultOptions)
      ).toEqual({
        not: emptyObjectSchema
      });
    });

    describe('schemas with discriminator', () => {
      const components: OpenAPIV3.ComponentsObject = {
        schemas: {
          SchemaA: {
            properties: {
              c: { type: 'string' },
              discriminatingProperty: { type: 'string' }
            }
          },
          SchemaB: {
            properties: {
              c: { type: 'integer' },
              discriminatingProperty: { type: 'string' }
            }
          }
        }
      };

      it('adds discriminator when discriminator has mapping', async () => {
        const discriminator = {
          propertyName: 'discriminatingProperty',
          mapping: {
            a: '#/components/schemas/SchemaA',
            b: '#/components/schemas/SchemaB'
          }
        };
        expect(
          parseSchema(
            {
              oneOf: [
                { $ref: '#/components/schemas/SchemaA' },
                { $ref: '#/components/schemas/SchemaB' }
              ],
              discriminator
            },
            await createTestRefs(components),
            defaultOptions
          )
        ).toEqual(
          expect.objectContaining({
            discriminator: {
              propertyName: discriminator.propertyName,
              mapping: {
                a: {
                  $ref: '#/components/schemas/SchemaA',
                  schemaName: 'SchemaA',
                  fileName: 'schema-a'
                },
                b: {
                  $ref: '#/components/schemas/SchemaB',
                  schemaName: 'SchemaB',
                  fileName: 'schema-b'
                }
              }
            }
          })
        );
      });

      it('adds discriminator mapping when discriminator has no mapping', async () => {
        const discriminator = {
          propertyName: 'discriminatingProperty',
          mapping: {
            SchemaA: '#/components/schemas/SchemaA',
            SchemaB: '#/components/schemas/SchemaB'
          }
        };
        expect(
          parseSchema(
            {
              oneOf: [
                { $ref: '#/components/schemas/SchemaA' },
                { $ref: '#/components/schemas/SchemaB' }
              ],
              discriminator: {
                propertyName: discriminator.propertyName
              }
            },
            await createTestRefs(components),
            defaultOptions
          )
        ).toEqual(
          expect.objectContaining({
            discriminator: {
              propertyName: discriminator.propertyName,
              mapping: {
                SchemaA: {
                  $ref: '#/components/schemas/SchemaA',
                  schemaName: 'SchemaA',
                  fileName: 'schema-a'
                },
                SchemaB: {
                  $ref: '#/components/schemas/SchemaB',
                  schemaName: 'SchemaB',
                  fileName: 'schema-b'
                }
              }
            }
          })
        );
      });

      it('parses as oneOf if there is a discriminator', async () => {
        const discriminator = {
          propertyName: 'discriminatingProperty',
          mapping: {
            a: '#/components/schemas/SchemaA',
            b: '#/components/schemas/SchemaB'
          }
        };
        expect(
          parseSchema(
            {
              type: 'object',
              discriminator
            },
            await createTestRefs(components),
            defaultOptions
          )
        ).toEqual(
          expect.objectContaining({
            oneOf: []
          })
        );
      });
    });
  });
});
