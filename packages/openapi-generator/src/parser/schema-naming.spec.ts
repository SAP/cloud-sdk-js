import { ensureUValidSchemaNames } from './schema-naming';

describe('schema-naming', () => {
  it('adds prefix if schema starts with integer', () => {
    expect(
      ensureUValidSchemaNames(['1234ABC'], { strictNaming: false })
    ).toEqual(['schema1234ABC']);
  });

  it('removes special character', () => {
    expect(
      ensureUValidSchemaNames(['#som%eth.ing'], { strictNaming: false })
    ).toEqual(['something']);
  });

  it('throws if the strict naming is on', () => {
    expect(() =>
      ensureUValidSchemaNames(['1234ABC', '#som%eth.ing'], {
        strictNaming: true
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Your OpenApi definition contains the invalid schema names. The SDK generator can adjust such names automatically if you disable 'strictNaming' or you adjust the schema. The errors are:
      The schema 1234ABC starts with an integer.
      The schema #som%eth.ing contains an illegal character."
    `);
  });
});
