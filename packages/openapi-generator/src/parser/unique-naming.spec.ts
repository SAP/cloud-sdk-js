import { pascalCase } from '@sap-cloud-sdk/util';
import { ensureUniqueNames, validateUniqueNames } from './unique-naming';

describe('ensureUniqueNames', () => {
  it('replaces duplicate names using defaults', () => {
    expect(ensureUniqueNames(['duplicate', 'duplicate'])).toEqual([
      'duplicate',
      'duplicate1'
    ]);
  });

  it('replaces duplicate names using pascal case', () => {
    expect(
      ensureUniqueNames(['Duplicate', 'duplicate'], {
        format: pascalCase
      })
    ).toEqual(['Duplicate', 'Duplicate1']);
  });

  it('replaces duplicate names, while keeping camel case names as is', () => {
    expect(
      ensureUniqueNames(['duplicate1', 'duplicate', 'duplicate'])
    ).toEqual(['duplicate1', 'duplicate', 'duplicate2']);
  });

  it('replaces duplicate names if they occur in the reserved words', () => {
    const uniqueItems = ensureUniqueNames(['reserved', 'reserved1'], {
      reservedWords: ['reserved']
    });

    expect(uniqueItems).toEqual(['reserved2', 'reserved1']);
  });
});

describe('validateUniqueNames', () => {
  it('does not throw for empty list of names', () => {
    expect(() => validateUniqueNames([])).not.toThrow();
  });

  it('does not throw for unique names', () => {
    expect(() =>
      validateUniqueNames(['uniqueName1', 'UniqueName2'])
    ).not.toThrow();
  });

  it('throws an error if there are duplicate names', () => {
    expect(() => validateUniqueNames(['duplicate', 'duplicate']))
      .toThrowErrorMatchingInlineSnapshot(`
      "Some names are not unique after formatting.
      	Formatted name: 'duplicate', original names: 'duplicate', 'duplicate'."
    `);
  });

  it('throws an error if there are duplicate names after formatting (default)', () => {
    expect(() => validateUniqueNames(['Duplicate', 'duplicate']))
      .toThrowErrorMatchingInlineSnapshot(`
      "Some names are not unique after formatting.
      	Formatted name: 'duplicate', original names: 'Duplicate', 'duplicate'."
    `);
  });

  it('throws an error if there are duplicate names after formatting (pascal case)', () => {
    expect(() =>
      validateUniqueNames(['Duplicate', 'duplicate'], { format: pascalCase })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Some names are not unique after formatting.
      	Formatted name: 'Duplicate', original names: 'Duplicate', 'duplicate'."
    `);
  });

  it('throws an error if reserved words are used', () => {
    expect(() =>
      validateUniqueNames(['reserved'], { reservedWords: ['reserved'] })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Some names are reserved words after formatting.
      	Formatted name: 'reserved', original names: 'reserved'."
    `);
  });

  it('lists all duplicates when throwing error', () => {
    expect(() =>
      validateUniqueNames([
        'duplicate1',
        'Duplicate1',
        'duplicate2',
        'Duplicate2'
      ])
    ).toThrowErrorMatchingInlineSnapshot(`
      "Some names are not unique after formatting.
      	Formatted name: 'duplicate1', original names: 'duplicate1', 'Duplicate1'.
      	Formatted name: 'duplicate2', original names: 'duplicate2', 'Duplicate2'."
    `);
  });
});
