import { serializeImports } from './imports';

describe('serializeImports', () => {
  it('serializes an empty list of imports', () => {
    expect(serializeImports([])).toEqual('');
  });

  it('filters imports with empty name list', () => {
    expect(
      serializeImports([
        { names: ['test'], moduleIdentifier: './module1' },
        { names: [], moduleIdentifier: './module2' }
      ])
    ).toEqual("import { test } from './module1';");
  });

  it('serializes multiple imports', () => {
    expect(
      serializeImports([
        { names: ['test'], moduleIdentifier: './module1' },
        { names: ['x1', 'x2'], moduleIdentifier: './module2' }
      ])
    ).toMatchInlineSnapshot(`
      "import { test } from './module1';
      import { x1, x2 } from './module2';"
    `);
  });
});
