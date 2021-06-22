import { OpenAPIV3 } from 'openapi-types';
import { createTestRefs, emptyObjectSchema } from '../../test/test-util';
import { OpenApiObjectSchema } from '../openapi-types';
import { parseSchema } from './schema';

describe('parseSchema', () => {
  it('parses reference schema', async () => {
    const schema = { $ref: '#/components/schemas/test' };
    expect(
      parseSchema(
        schema,
        await createTestRefs({ schemas: { test: { type: 'string' } } })
      )
    ).toEqual({
      ...schema,
      schemaName: 'Test',
      fileName: 'test'
    });
  });

  it('parses simple schema', async () => {
    const schema: OpenAPIV3.SchemaObject = { type: 'string' };
    expect(parseSchema(schema, await createTestRefs())).toEqual(schema);
  });

  it('parses simple schema with description', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      type: 'object',
      properties: { prop1: { description: 'My Description', type: 'string' } }
    };
    expect(
      (parseSchema(schema, await createTestRefs()) as OpenApiObjectSchema)
        .properties[0].description
    ).toBe('My Description');
  });

  it('parses array schema', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      type: 'array',
      items: { type: 'string' }
    };

    expect(parseSchema(schema, await createTestRefs())).toEqual({
      items: { type: 'string' }
    });
  });

  it('parses array schema with unique items', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      type: 'array',
      uniqueItems: true,
      items: { type: 'string' }
    };
    expect(parseSchema(schema, await createTestRefs())).toEqual({
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
    expect(parseSchema(schema, await createTestRefs())).toEqual({
      uniqueItems: true,
      items: emptyObjectSchema
    });
  });

  it('parses object schema with nested object schema with additional properties', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      required: ['simpleProperty'],
      properties: {
        simpleProperty: { type: 'string' },
        nestedObjectProperty: {
          additionalProperties: {
            properties: { simpleProperty: { type: 'string' } }
          }
        }
      }
    };
    expect(parseSchema(schema, await createTestRefs())).toEqual({
      properties: [
        { name: 'simpleProperty', required: true, schema: { type: 'string' } },
        {
          name: 'nestedObjectProperty',
          required: false,
          schema: {
            additionalProperties: {
              additionalProperties: { type: 'any' },
              properties: [
                {
                  name: 'simpleProperty',
                  required: false,
                  schema: { type: 'string' }
                }
              ]
            },
            properties: []
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
          })
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
          })
        ) as OpenApiObjectSchema
      ).properties[0].description
    ).toEqual('Property Description');
  });

  it('throws an error if there are neither propertes nor additional properties', async () => {
    const refs = await createTestRefs();
    expect(() =>
      parseSchema(
        {
          type: 'object',
          additionalProperties: false,
          properties: {}
        },
        refs
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
    expect(parseSchema(schema, await createTestRefs())).toEqual(schema);
  });

  it('parses string enum schema', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      enum: ['one', 'two', 'three'],
      type: 'string'
    };
    expect(parseSchema(schema, await createTestRefs())).toEqual({
      type: 'string',
      enum: ["'one'", "'two'", "'three'"]
    });
  });

  it('parses string enum schema with integers', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      enum: [1, 2, 3],
      type: 'string'
    };
    expect(parseSchema(schema, await createTestRefs())).toEqual({
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
    expect(parseSchema(schema, await createTestRefs())).toEqual({
      type: 'string',
      enum: ["'1'", "'2'", "'3'", null]
    });
  });

  it('parses string enum schema with a null value and no nullable set', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      enum: [1, 2, 3, null],
      type: 'string'
    };
    expect(async () => {
      parseSchema(schema, await createTestRefs());
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      '"null was used as a parameter in an enum, although the schema was not declared as nullable"'
    );
  });

  it('parses string enum schema with escaping', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      enum: ["valueWith'Quot'es"],
      type: 'string'
    };
    expect(parseSchema(schema, await createTestRefs())).toEqual({
      type: 'string',
      enum: ["'valueWith\\'Quot\\'es'"]
    });
  });

  it("parses enum schema with 'string' as default", async () => {
    const schema: OpenAPIV3.SchemaObject = {
      enum: ['one', 'two', 'three']
    };
    expect(parseSchema(schema, await createTestRefs())).toEqual({
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
    expect(parseSchema(schema, await createTestRefs())).toEqual({
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

  it('parses not schema', async () => {
    const schema: OpenAPIV3.SchemaObject = {
      not: { type: 'object' }
    };
    expect(parseSchema(schema, await createTestRefs())).toEqual({
      not: emptyObjectSchema
    });
  });
});
