import { OpenApiReferenceSchema } from './openapi-types';
import { collectRefs, getSchemaNamingFromRef } from './schema-util';

describe('getSchemaNamingFromRef', () => {
  it('gets the schema naming for reference object from schema reference mapping', () => {
    const schemaNaming = {
      schemaName: 'TypeName',
      fileName: 'type-name'
    };
    expect(
      getSchemaNamingFromRef(
        {
          $ref: '#/components/schemas/typeName'
        },
        {
          '#/components/schemas/typeName': schemaNaming
        }
      )
    ).toEqual(schemaNaming);
  });

  it('gets the schema naming for reference path from schema reference mapping', () => {
    const schemaNaming = {
      schemaName: 'TypeName',
      fileName: 'type-name'
    };
    expect(
      getSchemaNamingFromRef('#/components/schemas/typeName', {
        '#/components/schemas/typeName': schemaNaming
      })
    ).toEqual(schemaNaming);
  });

  it('throws an error for unknown type reference', () => {
    expect(() =>
      getSchemaNamingFromRef('#/components/schemas/typeName', {})
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not find schema naming for reference path \'#/components/schemas/typeName\'. Schema does not exist."'
    );
  });
});

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
                } as OpenApiReferenceSchema
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
});
