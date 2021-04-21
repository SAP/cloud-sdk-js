import { pascalCase } from '@sap-cloud-sdk/util';
import { ensureUniqueNames } from './unique-naming';

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
