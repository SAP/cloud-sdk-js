import { resolve, $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { parseTypeName, resolveObject } from './refs';

export const emptyApiDefinition = {
  openapi: '3.0.0',
  info: { title: 'Spec', version: '1.0.0' },
  paths: {}
} as const;

export function createRefs(
  components: OpenAPIV3.ComponentsObject = {}
): Promise<$Refs> {
  return resolve({ ...emptyApiDefinition, components });
}

describe('parseTypeName', () => {
  it('get the last part of a reference as type name', () => {
    expect(
      parseTypeName({
        $ref: '#/components/schemas/typeName'
      })
    ).toEqual('TypeName');
  });
});

describe('resolveObject', () => {
  it('resolves reference', async () => {
    const resolvedObject = {
      title: 'TEST'
    };
    expect(
      resolveObject(
        { $ref: '#/components/schemas/typeName' },
        await createRefs({
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
    expect(resolveObject(resolvedObject, await createRefs({}))).toEqual(
      resolvedObject
    );
  });

  it('returns undefined if undefined was passed', async () => {
    expect(resolveObject(undefined, await createRefs({}))).toBeUndefined();
  });
});
