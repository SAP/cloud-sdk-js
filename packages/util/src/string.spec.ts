import { trim, encodeBase64 } from './string';

describe('encodeBase64', () => {
  it('encodes a string', () => {
    expect(encodeBase64('test')).toMatchInlineSnapshot('"dGVzdA=="');
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
