import { schemaFile } from './schema-file';
describe('schema-file', () => {
  it('serializes schema file for schema', () => {
    expect(
      schemaFile({
        name: 'MySchema',
        schema: {
          properties: [
            {
              name: 'string-property',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ]
        }
      })
    ).toMatchInlineSnapshot(`
      "    
          /**
           * Representation of the 'MySchema' schema
           */
          export type MySchema = {
            'string-property': string;
          };"
    `);
  });

  it('serializes schema file for schema including references', () => {
    expect(
      schemaFile({
        name: 'MySchema',
        schema: {
          properties: [
            {
              name: 'otherSchema1',
              required: true,
              schema: {
                $ref: '#/components/schema/OtherSchema1'
              }
            },
            {
              name: 'otherSchema2',
              description: 'Description other Schema 2',
              required: true,
              schema: {
                $ref: '#/components/schema/OtherSchema2'
              }
            }
          ]
        }
      })
    ).toMatchInlineSnapshot(`
      "    import type { OtherSchema1 } from './other-schema-1';
          import type { OtherSchema2 } from './other-schema-2';
          /**
           * Representation of the 'MySchema' schema
           */
          export type MySchema = {
            'otherSchema1': OtherSchema1;
            /**
             * Description other Schema 2
             */
            'otherSchema2': OtherSchema2;
          };"
    `);
  });

  it('serializes schema file for schema including not schema', () => {
    expect(
      schemaFile({
        name: 'MySchema',
        schema: {
          items: { not: { type: 'integer' } }
        }
      })
    ).toMatchInlineSnapshot(`
      "    import { Except } from '@sap-cloud-sdk/core';
          /**
           * Representation of the 'MySchema' schema
           */
          export type MySchema = Except<any, number>[];"
    `);
  });

  it('serializes schema file for schema with description', () => {
    expect(
      schemaFile({
        name: 'MySchema',
        schema: {
          properties: [
            {
              name: 'string-property',
              description: 'My description',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ]
        }
      })
    ).toMatchInlineSnapshot(`
      "    
          /**
           * Representation of the 'MySchema' schema
           */
          export type MySchema = {
            /**
             * My description
             */
            'string-property': string;
          };"
    `);
  });
});
