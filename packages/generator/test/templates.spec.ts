import {
  codeBlock,
  zip,
  indent,
  trim
} from '../src/template-compilation/templates/general/common';

describe('zip', () => {
  it('zips two arrays', () => {
    expect(zip([1, 3, 5], [2, 4])).toEqual([1, 2, 3, 4, 5]);
  });

  it('zips two arrays when the second is empty', () => {
    expect(zip(['test'], [])).toEqual(['test']);
  });

  it('throws when the first array is as long as the second', () => {
    expect(() => zip([1, 3], [2, 4])).toThrow();
  });

  it('throws when the first array has two items more than the second', () => {
    expect(() => zip([1, 3, 5, 6], [2, 4])).toThrow();
  });

  it('throws when second array is longer than the first', () => {
    expect(() => zip([1], [2, 4])).toThrow();
  });
});

describe('indent', () => {
  it('indents one lined string', () => {
    expect(indent('A', ' ')).toEqual(' A');
  });

  it('indents multi lined string', () => {
    expect(indent('\nA\n', ' ')).toEqual(' \n A\n ');
  });
});

describe('trim', () => {
  it('trims leading and trailing empty lines', () => {
    expect(trim('\n\nA\n')).toEqual('\nA');
  });

  it('trims two whitespace lines', () => {
    expect(trim(' \n ')).toEqual('');
  });
});

describe('codeBlock', () => {
  it('transforms empty string', () => {
    expect(codeBlock``).toEqual('');
  });

  it('trims string with different indentations', () => {
    expect(codeBlock`
    A
      B
    `).toEqual('    A\n      B');
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
`).toEqual('    A\n      B\n      C\n      B\n      C');
  });

  it('transforms nested variables', () => {
    const nested = 1;
    expect(codeBlock`
    A ${nested}
`).toEqual('    A 1');
  });
});
