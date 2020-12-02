import { emptyApiDefinition } from '../test/test-util';
import { createSpecWithGlobalTag } from './generator';

describe('createSpecWithGlobalTag', () => {
  it("replaces all tags with 'default'", () => {
    const newSpec = createSpecWithGlobalTag({
      ...emptyApiDefinition,
      paths: {
        '/pattern1': {
          get: {
            tags: ['tag1', 'tag2']
          },
          post: {
            tags: ['tag']
          }
        },
        '/pattern1/pattern2': {
          get: {},
          post: {
            tags: ['tag']
          }
        }
      }
    });

    expect(newSpec).toEqual({
      ...emptyApiDefinition,
      tags: [{ name: 'default' }],
      paths: {
        '/pattern1': {
          get: {
            tags: ['default']
          },
          post: {
            tags: ['default']
          }
        },
        '/pattern1/pattern2': {
          get: { tags: ['default'] },
          post: {
            tags: ['default']
          }
        }
      }
    });
  });
});
