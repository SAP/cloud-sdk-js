import {
  trim,
  encodeBase64,
  removeFileExtension,
  trimRight,
  trimLeft
} from './string';

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

  it('trims two whitespace lines 2', () => {
    expect(
      trim(` 
     `)
    ).toEqual('');
  });

  it('trims left and right', () => {
    expect(trim(' text ')).toEqual('text');
    expect(trim('text ')).toEqual('text');
    expect(trim(' text')).toEqual('text');
  });

  it('trims right whitespace', () => {
    expect(trimRight(' text ')).toEqual(' text');
  });

  it('trims right whitespace with new line', () => {
    expect(trimRight(' line1 \n line2 ')).toEqual(' line1 \n line2');
  });

  it('trims right whitespace and new line', () => {
    expect(trimRight(' text ')).toEqual(' text');
  });

  it('trims left whitespace', () => {
    expect(trimLeft(' text ')).toEqual('text ');
  });

  it('trims left whitespace with new line', () => {
    expect(trimLeft(' line1 \n line2 ')).toEqual('line1 \n line2 ');
  });

  it('removes file extension', () => {
    expect(removeFileExtension('test')).toBe('test');
    expect(removeFileExtension('test.png')).toBe('test');
    expect(removeFileExtension('one.test.png')).toBe('one.test');
  });
});
