import { OpenAPIV3 } from 'openapi-types';
import { emptyDocument } from '../../test/test-util';
import { createRefs, OpenApiDocumentRefs } from './refs';
describe('OpenApiDocumentRefs', () => {
  let refs: OpenApiDocumentRefs;
  const typeName: OpenAPIV3.SchemaObject = { type: 'string' };
  beforeAll(async () => {
    refs = await createRefs(
      {
        ...emptyDocument,
        components: { schemas: { typeName } }
      },
      { strictNaming: true }
    );
  });

  describe('resolveObject', () => {
    it('resolves reference', async () => {
      expect(
        refs.resolveObject({ $ref: '#/components/schemas/typeName' })
      ).toEqual(typeName);
    });

    it('returns the original object if it is not a reference', async () => {
      const resolvedObject = {
        title: 'TEST'
      };
      expect(refs.resolveObject(resolvedObject)).toEqual(resolvedObject);
    });

    it('returns undefined if undefined was passed', async () => {
      expect(refs.resolveObject(undefined)).toBeUndefined();
    });
  });

  describe('getSchemaNaming', () => {
    it('gets the schema naming for reference object from schema reference mapping', async () => {
      expect(
        refs.getSchemaNaming({
          $ref: '#/components/schemas/typeName'
        })
      ).toEqual({
        schemaName: 'TypeName',
        fileName: 'type-name'
      });
    });

    it('gets the schema naming for reference path from schema reference mapping', async () => {
      expect(refs.getSchemaNaming('#/components/schemas/typeName')).toEqual({
        schemaName: 'TypeName',
        fileName: 'type-name'
      });
    });

    it('throws an error for unknown type reference', async () => {
      expect(() =>
        refs.getSchemaNaming('#/components/schemas/unknown')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not find schema naming for reference path \'#/components/schemas/unknown\'. Schema does not exist."'
      );
    });

    it('renames a schema if needed due to illegal names', async () => {
      refs = await createRefs(
        {
          ...emptyDocument,
          components: { schemas: { '123456': {}, 'something.Else%': {} } }
        },
        { strictNaming: false }
      );
      expect(refs.getSchemaNaming('#/components/schemas/123456')).toEqual({
        fileName: 'schema-123456',
        schemaName: 'Schema123456'
      });

      expect(
        refs.getSchemaNaming('#/components/schemas/something.Else%')
      ).toEqual({
        fileName: 'something-else',
        schemaName: 'SomethingElse'
      });
    });

    it('ensures uniqueness also if schemas are renamed.', async () => {
      refs = await createRefs(
        {
          ...emptyDocument,
          components: {
            schemas: { '123456': {}, schema123456: {}, schema12345_6: {} }
          }
        },
        { strictNaming: false }
      );
      expect(refs.getSchemaNaming('#/components/schemas/123456')).toEqual({
        fileName: 'schema-123456',
        schemaName: 'Schema123456'
      });

      expect(refs.getSchemaNaming('#/components/schemas/schema123456')).toEqual(
        {
          fileName: 'schema-123456-1',
          schemaName: 'Schema123456_1'
        }
      );

      // The to camalCase removes the _ in the origirnal name.
      expect(
        refs.getSchemaNaming('#/components/schemas/schema12345_6')
      ).toEqual({
        fileName: 'schema-123456-2',
        schemaName: 'Schema123456_2'
      });
    });

    it('throws if renaming is necessary and strictNames is on', async () => {
      await expect(
        createRefs(
          {
            ...emptyDocument,
            components: { schemas: { '123456': {} } }
          },
          { strictNaming: true }
        )
      ).rejects.toThrowError(
        'The service specification contains invalid schema names.'
      );
    });

    it('renames a schema if needed due to duplicate names', async () => {
      refs = await createRefs(
        {
          ...emptyDocument,
          components: { schemas: { name: {}, Name: {} } }
        },
        { strictNaming: false }
      );
      expect(refs.getSchemaNaming('#/components/schemas/name')).toEqual({
        fileName: 'name-1',
        schemaName: 'Name_1'
      });

      expect(refs.getSchemaNaming('#/components/schemas/Name')).toEqual({
        fileName: 'name',
        schemaName: 'Name'
      });
    });

    it('renames a schema if needed due to duplicate names with separator', async () => {
      refs = await createRefs(
        {
          ...emptyDocument,
          components: { schemas: { name400: {}, Name400: {} } }
        },
        { strictNaming: false }
      );
      expect(refs.getSchemaNaming('#/components/schemas/name400')).toEqual({
        fileName: 'name-400-1',
        schemaName: 'Name400_1'
      });

      expect(refs.getSchemaNaming('#/components/schemas/Name400')).toEqual({
        fileName: 'name-400',
        schemaName: 'Name400'
      });
    });

    it('throws an error for non schema reference', async () => {
      expect(() =>
        refs.getSchemaNaming('#/components/responses/typeName')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not get schema naming for reference path \'#/components/responses/typeName\'. Path does not reference a schema."'
      );
    });
  });
});
