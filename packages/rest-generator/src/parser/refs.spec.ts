import { createRefs } from '../../test/test-util';
import { parseTypeName, resolveObject } from './refs';

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
