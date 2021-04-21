import { unixEOL } from './string-formatter';
import { trim, encodeBase64, removeFileExtension } from './string';

describe('encodeBase64', () => {
  it('encodes a string', () => {
    expect(encodeBase64('test')).toMatchInlineSnapshot('"dGVzdA=="');
  });
});

describe('trim', () => {
  it('trims leading and trailing empty lines', () => {
    expect(trim(`${unixEOL}${unixEOL}A${unixEOL}`)).toEqual(`${unixEOL}A`);
  });

  it('trims two whitespace lines', () => {
    expect(trim(` ${unixEOL} `)).toEqual('');
  });

  it('removes file extension', () => {
    expect(removeFileExtension('test')).toBe('test');
    expect(removeFileExtension('test.png')).toBe('test');
    expect(removeFileExtension('one.test.png')).toBe('one.test');
  });
});
