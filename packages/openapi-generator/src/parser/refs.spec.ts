import { createTestRefs } from '../../test/test-util';
import { resolveObject } from './refs';

it('resolves reference', async () => {
  const resolvedObject = {
    title: 'TEST'
  };
  expect(
    resolveObject(
      { $ref: '#/components/schemas/typeName' },
      await createTestRefs({
        schemas: {
          typeName: resolvedObject
        }
      })
    )
  ).toEqual(resolvedObject);
});

it('returns the original object if it is not a reference', async () => {
  const resolvedObject = {
    title: 'TEST'
  };
  expect(resolveObject(resolvedObject, await createTestRefs({}))).toEqual(
    resolvedObject
  );
});

it('returns undefined if undefined was passed', async () => {
  expect(resolveObject(undefined, await createTestRefs({}))).toBeUndefined();
});

describe('getSchemaNaming', () => {
  beforeAll(() => {

  });

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
