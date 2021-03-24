import { interfaceFile } from './interface-file';
describe('interface-file', () => {
  it('serializes interface file for schema', () => {
    expect(
      interfaceFile({
        name: 'MySchema',
        schema: {
          type: 'object',
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
          export type MySchema = {
            'string-property': string;
          };"
    `);
  });

  it('serializes interface file for schema including references', () => {
    expect(
      interfaceFile({
        name: 'MySchema',
        schema: {
          type: 'object',
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
          export type MySchema = {
            'otherSchema1': OtherSchema1;
            'otherSchema2': OtherSchema2;
          };"
    `);
  });

  it('serializes interface file for schema including not schema', () => {
    expect(
      interfaceFile({
        name: 'MySchema',
        schema: {
          type: 'array',
          items: { not: { type: 'integer' } }
        }
      })
    ).toMatchInlineSnapshot(`
      "    import { Except } from '@sap-cloud-sdk/core';
          export type MySchema = Except<any, number>[];"
    `);
  });
});
