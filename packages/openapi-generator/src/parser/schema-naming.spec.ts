import { ensureValidSchemaNames } from './schema-naming';

describe('schema-naming', () => {
  it('adds prefix if schema starts with integer', () => {
    expect(
      ensureValidSchemaNames(['1234ABC'], { strictNaming: false })
    ).toEqual(['schema1234ABC']);
  });

  it('removes special character', () => {
    expect(
      ensureValidSchemaNames(['#som%eth.ing'], { strictNaming: false })
    ).toEqual(['something']);
  });

  it('throws if the strict naming is on', () => {
    expect(() =>
      ensureValidSchemaNames(['1234ABC', '#som%eth.ing'], {
        strictNaming: true
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "The service specification contains invalid schema names. Adjust the definition file or enable automatic name adjustment with \`skipValidation\`.
      	Invalid names starting with a number: '1234ABC'
      	Invalid names containing illegal characters: '#som%eth.ing'"
    `);
  });
});
