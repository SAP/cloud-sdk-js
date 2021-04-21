import { createRefs } from '../../test/test-util';
import { resolveObject } from './refs';

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
