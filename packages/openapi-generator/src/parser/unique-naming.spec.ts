import { pascalCase } from '@sap-cloud-sdk/util';
import { ensureUniqueNames } from './unique-naming';

describe('ensureUniqueNames', () => {
  describe('with strictNaming enabled', () => {
    const options = { strictNaming: true };
    it('does not throw for empty list of names', () => {
      expect(() => ensureUniqueNames([], options)).not.toThrow();
    });

    it('does not throw for unique names', () => {
      expect(() =>
        ensureUniqueNames(['uniqueName1', 'UniqueName2'], options)
      ).not.toThrow();
    });

    it('throws an error if there are duplicate names', () => {
      expect(() => ensureUniqueNames(['duplicate', 'duplicate'], options))
        .toThrowErrorMatchingInlineSnapshot(`
        "Some names are not unique after formatting.
        	Formatted name: 'duplicate', original names: 'duplicate', 'duplicate'."
      `);
    });

    it('throws an error if there are duplicate names after formatting (default)', () => {
      expect(() => ensureUniqueNames(['Duplicate', 'duplicate'], options))
        .toThrowErrorMatchingInlineSnapshot(`
        "Some names are not unique after formatting.
        	Formatted name: 'duplicate', original names: 'Duplicate', 'duplicate'."
      `);
    });

    it('throws an error if there are duplicate names after formatting (pascal case)', () => {
      expect(() =>
        ensureUniqueNames(['Duplicate', 'duplicate'], options, {
          format: pascalCase
        })
      ).toThrowErrorMatchingInlineSnapshot(`
        "Some names are not unique after formatting.
        	Formatted name: 'Duplicate', original names: 'Duplicate', 'duplicate'."
      `);
    });

    it('throws an error if reserved words are used', () => {
      expect(() =>
        ensureUniqueNames(['reserved'], options, {
          reservedWords: ['reserved']
        })
      ).toThrowErrorMatchingInlineSnapshot(`
        "Some names are reserved words after formatting.
        	Formatted name: 'reserved', original names: 'reserved'."
      `);
    });

    it('lists all duplicates when throwing error', () => {
      expect(() =>
        ensureUniqueNames(
          ['duplicate1', 'Duplicate1', 'duplicate2', 'Duplicate2'],
          options
        )
      ).toThrowErrorMatchingInlineSnapshot(`
        "Some names are not unique after formatting.
        	Formatted name: 'duplicate1', original names: 'duplicate1', 'Duplicate1'.
        	Formatted name: 'duplicate2', original names: 'duplicate2', 'Duplicate2'."
      `);
    });
  });

  describe('with strictNaming disabled', () => {
    const options = { strictNaming: false };

    it('replaces duplicate names using defaults', () => {
      expect(ensureUniqueNames(['duplicate', 'duplicate'], options)).toEqual([
        'duplicate',
        'duplicate1'
      ]);
    });

    it('replaces duplicate names using pascal case', () => {
      expect(
        ensureUniqueNames(['Duplicate', 'duplicate'], options, {
          format: pascalCase
        })
      ).toEqual(['Duplicate', 'Duplicate1']);
    });

    it('replaces duplicate names, while keeping camel case names as is', () => {
      expect(
        ensureUniqueNames(['duplicate1', 'duplicate', 'duplicate'], options)
      ).toEqual(['duplicate1', 'duplicate', 'duplicate2']);
    });

    it('replaces duplicate names if they occur in the reserved words', () => {
      const uniqueItems = ensureUniqueNames(
        ['reserved', 'reserved1'],
        options,
        {
          reservedWords: ['reserved']
        }
      );

      expect(uniqueItems).toEqual(['reserved2', 'reserved1']);
    });
  });
});
