import { OpenAPIV3 } from 'openapi-types';
import { emptyObjectSchema } from '../../test/test-util';
import { parseSchema } from './schema';

describe('parseSchema', () => {
  it('parses reference schema', () => {
    const schema = { $ref: 'test' };
    expect(parseSchema(schema)).toEqual(schema);
  });

  it('parses simple schema', () => {
    const schema: OpenAPIV3.SchemaObject = { type: 'string' };
    expect(parseSchema(schema)).toEqual(schema);
  });

  it('parses array schema', () => {
    const schema: OpenAPIV3.SchemaObject = {
      type: 'array',
      items: { type: 'string' }
    };

    expect(parseSchema(schema)).toEqual({
      ...schema,
      uniqueItems: false
    });
  });

  it('parses array schema with unique items', () => {
    const schema: OpenAPIV3.SchemaObject = {
      type: 'array',
      uniqueItems: true,
      items: { type: 'string' }
    };
    expect(parseSchema(schema)).toEqual(schema);
  });

  it('parses array schema with nested object schema', () => {
    const schema: OpenAPIV3.SchemaObject = {
      type: 'array',
      uniqueItems: true,
      items: { type: 'object' }
    };
    expect(parseSchema(schema)).toEqual({
      ...schema,
      items: emptyObjectSchema
    });
  });

  it('parses object schema with nested object schema with additional properties', () => {
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
    expect(parseSchema(schema)).toEqual({
      type: 'object',
      properties: [
        { name: 'simpleProperty', required: true, schema: { type: 'string' } },
        {
          name: 'nestedObjectProperty',
          required: false,
          schema: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              additionalProperties: true,
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
      additionalProperties: true
    });
  });

  it('throws an error if there are neither propertes nor additional properties', () => {
    expect(() =>
      parseSchema({
        type: 'object',
        additionalProperties: false,
        properties: {}
      })
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not parse object schema without neither properties nor additional properties."'
    );
  });

  it('parses enum schema', () => {
    const schema: OpenAPIV3.SchemaObject = {
      enum: ['1', '2', '3'],
      type: 'number'
    };
    expect(parseSchema(schema)).toEqual(schema);
  });

  it('parses string enum schema', () => {
    const schema: OpenAPIV3.SchemaObject = {
      enum: ['one', 'two', 'three'],
      type: 'string'
    };
    expect(parseSchema(schema)).toEqual({
      type: 'string',
      enum: ["'one'", "'two'", "'three'"]
    });
  });

  it('parses oneOf, anyOf, allOf schemas', () => {
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
    expect(parseSchema(schema)).toEqual({
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

  it('parses not schema', () => {
    const schema: OpenAPIV3.SchemaObject = {
      not: { type: 'object' }
    };
    expect(parseSchema(schema)).toEqual({
      not: emptyObjectSchema
    });
  });
});
