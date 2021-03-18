import { OpenApiDocument } from '../openapi-types';
import { indexFile } from './index-file';

describe('indexFile', () => {
  it('returns the index file code', () => {
    const document = {
      tags: ['test', 'default']
    } as OpenApiDocument;
    expect(indexFile(document)).toMatchInlineSnapshot(`
      "export * from './openapi/model';
      export * from './test-api';
      export * from './default-api';"
    `);
  });
});
