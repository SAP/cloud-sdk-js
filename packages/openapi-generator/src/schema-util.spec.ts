import {
  OpenApiReferenceSchema,
  OpenApiSchemaProperties
} from './openapi-types';
import { collectRefs, getSchemaPropertiesDocumentation } from './schema-util';

describe('collectRefs', () => {
  it('collects empty array for undefined', () => {
    expect(collectRefs(undefined)).toEqual([]);
  });

  it('collects all unique references within a schema', () => {
    expect(
      collectRefs({
        allOf: [
          { type: 'string' },
          {
            properties: [
              {
                name: 'refProperty',
                required: false,
                schema: {
                  $ref: 'ref1',
                  schemaName: 'Ref1'
                } as OpenApiReferenceSchema,
                schemaProperties: {}
              }
            ]
          },
          { $ref: 'ref2', schemaName: 'Ref2' } as OpenApiReferenceSchema,
          {
            anyOf: [
              { $ref: 'ref3', schemaName: 'Ref3' } as OpenApiReferenceSchema
            ]
          },
          { $ref: 'ref3', schemaName: 'Ref3' } as OpenApiReferenceSchema
        ]
      }).map(ref => ref.$ref)
    ).toStrictEqual(['ref1', 'ref2', 'ref3']);
  });

  it('collects one reference if the schema is a reference', () => {
    const ref = { $ref: 'test', schemaName: 'Test' } as OpenApiReferenceSchema;
    expect(collectRefs(ref)).toEqual([ref]);
  });

  it('creates documentation for schema properties', () => {
    const schemaProperties: OpenApiSchemaProperties = {
      deprecated: true,
      example: 'testString',
      minLength: 2,
      maxLength: 10,
      default: 'test'
    };
    expect(getSchemaPropertiesDocumentation(schemaProperties)).toEqual([
      '@deprecated',
      '@example "testString"',
      'Min Length: 2.',
      'Max Length: 10.',
      'Default: "test".'
    ]);
  });
});
