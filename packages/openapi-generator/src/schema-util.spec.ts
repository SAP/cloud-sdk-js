import {
  collectRefs,
  hasNotSchema,
  parseFileNameFromRef,
  parseTypeNameFromRef
} from './schema-util';

describe('parseTypeNameFromRef', () => {
  it('gets the type name for reference object from schema reference mapping', () => {
    expect(
      parseTypeNameFromRef(
        {
          $ref: '#/components/schemas/typeName'
        },
        {
          '#/components/schemas/typeName': 'TypeName'
        }
      )
    ).toEqual('TypeName');
  });

  it('gets the type name for reference path from schema reference mapping', () => {
    expect(
      parseTypeNameFromRef('#/components/schemas/typeName', {
        '#/components/schemas/typeName': 'TypeName'
      })
    ).toEqual('TypeName');
  });

  it('throws an error for unknown type reference', () => {
    expect(() =>
      parseTypeNameFromRef('#/components/schemas/typeName', {})
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not find schema name for reference path \'#/components/schemas/typeName\'. Schema does not exist."'
    );
  });
});

describe('parseFileNameFromRef', () => {
  it('gets the last part of a reference as type name', () => {
    expect(
      parseFileNameFromRef({
        $ref: '#/components/schemas/typeName'
      })
    ).toEqual('type-name');
  });

  it('gets the last part of a string as type name', () => {
    expect(parseFileNameFromRef('#/components/schemas/typeName')).toEqual(
      'type-name'
    );
  });
});

describe('hasNotSchema', () => {
  it('returns true if there is at least one descendant with a not schema', () => {
    expect(
      hasNotSchema({
        oneOf: [
          { type: 'string' },
          {
            properties: [
              {
                name: 'notProperty',
                required: false,
                schema: { not: { type: 'number' } }
              }
            ]
          }
        ]
      })
    ).toBe(true);
  });

  it('returns true if the root schema is not schema', () => {
    expect(
      hasNotSchema({
        not: { type: 'string' }
      })
    ).toBe(true);
  });

  it('returns false if there is no not schema', () => {
    expect(
      hasNotSchema({
        oneOf: [
          { type: 'string' },
          {
            properties: [
              {
                name: 'notProperty',
                required: false,
                schema: { oneOf: [{ type: 'number' }, { type: 'string' }] }
              }
            ]
          }
        ]
      })
    ).toBe(false);
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
                schema: { $ref: 'ref1', schemaName: 'Ref1' }
              }
            ]
          },
          { $ref: 'ref2', schemaName: 'Ref2' },
          {
            anyOf: [{ $ref: 'ref3', schemaName: 'Ref3' }]
          },
          { $ref: 'ref3', schemaName: 'Ref3' }
        ]
      }).map(ref => ref.$ref)
    ).toStrictEqual(['ref1', 'ref2', 'ref3']);
  });

  it('collects one reference if the schema is a reference', () => {
    const ref = { $ref: 'test', schemaName: 'Test' };
    expect(collectRefs(ref)).toEqual([ref]);
  });
});
