import { indent, trim, encodeBase64 } from './string';

describe('encodeBase64', () => {
  it('encodes a string', () => {
    expect(encodeBase64('test')).toMatchInlineSnapshot('"dGVzdA=="');
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
