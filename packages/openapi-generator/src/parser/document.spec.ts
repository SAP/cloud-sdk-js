import { createRefs, emptyApiDefinition } from '../../test/test-util';
import { parseAllOperations } from './document';

describe('parseAllOperations', () => {
  it('returns empty array when there are no paths', async () => {
    expect(parseAllOperations(emptyApiDefinition, await createRefs())).toEqual(
      []
    );
  });

  it('returns and operation for every existing path', async () => {
    const apiDefinition = {
      ...emptyApiDefinition,
      paths: {
        '/entity': {
          get: {},
          post: {}
        },
        '/entity/{placeholder}': {
          get: {},
          post: {},
          delete: {}
        }
      }
    };
    expect(
      parseAllOperations(apiDefinition, await createRefs()).length
    ).toEqual(5);
  });
});
