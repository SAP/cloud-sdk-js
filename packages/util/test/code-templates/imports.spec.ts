import { imports } from '../../src/code-templates';

describe('imports', () => {
  it('transforms empty list', () => {
    expect(imports()).toMatchInlineSnapshot('""');
  });

  it('transforms one import line with one import', () => {
    expect(imports({ imports: ['A'], module: '.mod' })).toMatchInlineSnapshot(
      '"import { A } from \'.mod\';"'
    );
  });

  it('transforms multiple import lines with multiple imports', () => {
    expect(
      imports(
        { imports: ['A'], module: '.mod' },
        { imports: ['A', 'B'], module: '.mod2' }
      )
    ).toMatchInlineSnapshot(`
      "import { A } from '.mod';
      import { A, B } from '.mod2';"
    `);
  });
});
