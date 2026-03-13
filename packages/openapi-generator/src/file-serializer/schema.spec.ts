import { serializeSchema } from './schema';

it('serializeSchema serializes reference schema', () => {
  expect(
    serializeSchema({
      $ref: '#/components/schemas/my-schema',
      schemaName: 'MySchema',
      fileName: 'my-schema'
    })
  ).toEqual('MySchema');
});

describe('serializeSchema for object schemas', () => {
  it('serializes object schema with nested properties and no additional properties', () => {
    expect(
      serializeSchema({
        properties: [
          {
            name: 'simpleProperty',
            required: true,
            nullable: true,
            schema: { type: 'integer' },
            schemaProperties: {
              minimum: 8
            }
          },

          {
            name: 'nested-property',
            required: false,
            nullable: false,
            schema: {
              properties: [
                {
                  name: 'stringProperty',
                  required: false,
                  nullable: false,
                  schema: { type: 'string' },
                  schemaProperties: {
                    pattern: '^[p{L}-.^_|~d]+$'
                  }
                }
              ]
            },

            schemaProperties: {}
          }
        ]
      })
    ).toMatchInlineSnapshot(`
      "{
            /**
             * Minimum: 8.
             */
            'simpleProperty': number | null;
            'nested-property'?: {
                  /**
                   * Pattern: "^[p{L}-.^_|~d]+$".
                   */
                  'stringProperty'?: string;
                };
          }"
    `);
  });

  it('serializes object schema without properties, but additional properties', () => {
    expect(
      serializeSchema({
        properties: [],
        additionalProperties: { type: 'any' }
      })
    ).toEqual('Record<string, any>');
  });

  it('serializes object schema without properties, but specific additional properties', () => {
    expect(
      serializeSchema({
        properties: [],
        additionalProperties: { type: 'string' }
      })
    ).toEqual('Record<string, string>');
  });

  it('serializes object schema without properties and no additional properties', () => {
    expect(
      serializeSchema({
        properties: []
      })
    ).toEqual('Record<string, any>');
  });

  it('serializes object schema with properties and additional properties', () => {
    expect(
      serializeSchema({
        properties: [
          {
            name: 'simpleProperty',
            required: true,
            nullable: false,
            schema: { type: 'integer' },
            schemaProperties: {}
          }
        ],
        additionalProperties: { type: 'string' }
      })
    ).toMatchInlineSnapshot(`
      "{
            'simpleProperty': number;
          } & Record<string, string>"
    `);
  });

  it('serializes object schema with array items and no additional properties', () => {
    expect(
      serializeSchema({
        properties: [
          {
            name: 'objectArrayProp',
            nullable: false,
            required: true,
            schema: {
              uniqueItems: false,
              items: {
                properties: [
                  {
                    name: 'name',
                    required: true,
                    nullable: false,
                    schema: { type: 'string' },
                    schemaProperties: {}
                  }
                ],
                additionalProperties: { type: 'any' }
              }
            },
            schemaProperties: {}
          }
        ],
        additionalProperties: { type: 'any' }
      })
    ).toMatchInlineSnapshot(`
    "{
          'objectArrayProp': ({
                'name': string;
              } & Record<string, any>)[];
        } & Record<string, any>"
    `);
  });
});

describe('serializeSchema for array schemas', () => {
  it('serializes array schema', () => {
    expect(
      serializeSchema({
        uniqueItems: false,
        items: { type: 'string' }
      })
    ).toEqual('string[]');
  });

  it('serializes array schema with nested array', () => {
    expect(
      serializeSchema({
        uniqueItems: false,
        items: { items: { type: 'string' } }
      })
    ).toEqual('string[][]');
  });

  it('serializes array schema with unique items', () => {
    expect(
      serializeSchema({
        uniqueItems: true,
        items: { type: 'string' }
      })
    ).toEqual('Set<string>');
  });
});

it('serializeSchema serializes enum schema', () => {
  expect(
    serializeSchema({
      type: 'string',
      enum: ["'one'", "'two'"]
    })
  ).toEqual("'one' | 'two'");
});

describe('serializeSchema for xOf schemas', () => {
  it('serializes array schema for oneOf', () => {
    expect(
      serializeSchema({
        oneOf: [
          {
            $ref: '#/components/schemas/XOr1',
            schemaName: 'XOr1',
            fileName: 'x-or-1'
          },
          {
            $ref: '#/components/schemas/XOr2',
            schemaName: 'XOr2',
            fileName: 'x-or-2'
          }
        ]
      })
    ).toEqual('XOr1 | XOr2');
  });

  it('serializes array schema for oneOf with discriminator', () => {
    const oneOf = [
      {
        $ref: '#/components/schemas/XOr1',
        schemaName: 'XOr1',
        fileName: 'x-or-1'
      },
      {
        $ref: '#/components/schemas/XOr2',
        schemaName: 'XOr2',
        fileName: 'x-or-2'
      }
    ];

    expect(
      serializeSchema({
        oneOf,
        discriminator: {
          propertyName: 'discr',
          mapping: {
            a: oneOf[0],
            b: oneOf[1]
          }
        }
      })
    ).toEqual("({ discr: 'a' } & XOr1) | ({ discr: 'b' } & XOr2)");
  });

  it('serializes array schema for anyOf', () => {
    expect(
      serializeSchema({
        anyOf: [
          {
            $ref: '#/components/schemas/InclusiveOr1',
            schemaName: 'InclusiveOr1',
            fileName: 'inclusive-or-1'
          },
          {
            $ref: '#/components/schemas/InclusiveOr2',
            schemaName: 'InclusiveOr2',
            fileName: 'inclusive-or-2'
          }
        ]
      })
    ).toEqual('InclusiveOr1 | InclusiveOr2');
  });

  it('serializes array schema for anyOf with discriminator', () => {
    const anyOf = [
      {
        $ref: '#/components/schemas/InclusiveOr1',
        schemaName: 'InclusiveOr1',
        fileName: 'inclusive-or-1'
      },
      {
        $ref: '#/components/schemas/InclusiveOr2',
        schemaName: 'InclusiveOr2',
        fileName: 'inclusive-or-2'
      }
    ];

    expect(
      serializeSchema({
        anyOf,
        discriminator: {
          propertyName: 'discr',
          mapping: {
            a: anyOf[0],
            b: anyOf[1]
          }
        }
      })
    ).toEqual(
      "({ discr: 'a' } & InclusiveOr1) | ({ discr: 'b' } & InclusiveOr2)"
    );
  });

  it('serializes array schema for allOf', () => {
    expect(
      serializeSchema({
        allOf: [
          {
            $ref: '#/components/schemas/And1',
            schemaName: 'And1',
            fileName: 'and-1'
          },
          {
            $ref: '#/components/schemas/And2',
            schemaName: 'And2',
            fileName: 'and-2'
          }
        ]
      })
    ).toEqual('And1 & And2');
  });
});

it('serializes array schemas for enum', () => {
  expect(
    serializeSchema({
      type: 'array',
      items: {
        type: 'string',
        enum: ["'One'", "'Two'"]
      }
    })
  ).toEqual("('One' | 'Two')[]");
});

it('serializeSchema serializes not schema', () => {
  expect(
    serializeSchema({
      not: { type: 'string' }
    })
  ).toEqual('any');
});
