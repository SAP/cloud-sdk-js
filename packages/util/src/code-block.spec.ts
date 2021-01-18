import { codeBlock } from './code-block';

describe('codeBlock', () => {
  it('transforms empty string', () => {
    expect(codeBlock``).toMatchInlineSnapshot('""');
  });

  it('trims string with different indentations', () => {
    expect(codeBlock`
    A
      B
    `).toMatchInlineSnapshot(`
      "    A
            B"
    `);
  });

  it('transforms nested code blocks', () => {
    const nested = codeBlock`
B
C
`;
    expect(codeBlock`
    A
      ${nested}
      ${nested}
`).toMatchInlineSnapshot(`
      "    A
            B
            C
            B
            C"
    `);
  });

  it('transforms nested variables', () => {
    const nested = 1;
    expect(codeBlock`
    A ${nested}
`).toMatchInlineSnapshot('"    A 1"');
  });

  it('does not throw on undefined values', () => {
    expect(() => codeBlock`A + ${undefined} + B`).not.toThrow();
  });
});
