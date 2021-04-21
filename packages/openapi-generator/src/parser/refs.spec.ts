import { OpenAPIV3 } from 'openapi-types';
import { emptyDocument } from '../../test/test-util';
import { createRefs, OpenApiDocumentRefs } from './refs';
describe('OpenApiDocumentRefs', () => {
  let refs: OpenApiDocumentRefs;
  const typeName: OpenAPIV3.SchemaObject = { type: 'string' };
  beforeAll(async () => {
    refs = await createRefs({
      ...emptyDocument,
      components: { schemas: { typeName } }
    });
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

    it('throws an error for non schema reference', async () => {
      expect(() =>
        refs.getSchemaNaming('#/components/responses/typeName')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not get schema naming for reference path \'#/components/responses/typeName\'. Path does not reference a schema."'
      );
    });
  });
});
