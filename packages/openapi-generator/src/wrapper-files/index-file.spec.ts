import { indexFile } from './index-file';

describe('indexFile', () => {
  it('returns the index file code', () => {
    expect(indexFile(['test-api.ts', 'default-api.ts'])).toMatchInlineSnapshot(`
      "export * from './openapi/model';
      export * from './test-api';
      export * from './default-api';"
    `);
  });
});
