import { indexFile } from './index-file';

describe('indexFile', () => {
  it('returns the index file code', () => {
    expect(indexFile()).toMatchInlineSnapshot(`
      "export * from './openapi/model';
      export * from './api';"
    `);
  });
});
