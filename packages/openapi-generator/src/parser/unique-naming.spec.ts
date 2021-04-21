import { pascalCase } from '@sap-cloud-sdk/util';
import { ensureUniqueNames } from './unique-naming';

it('ensureUniqueNames replaces duplicate names using defaults', () => {
  expect(
    ensureUniqueNames([
      'someDuplicateName1',
      'someDuplicateName',
      'someDuplicateName'
    ])
  ).toEqual(['someDuplicateName1', 'someDuplicateName', 'someDuplicateName2']);
});

it('ensureUniqueNames replaces duplicate names using pascal case', () => {
  expect(
    ensureUniqueNames(
      ['someDuplicateName1', 'SomeDuplicateName', 'someDuplicateName'],
      {
        format: pascalCase
      }
    )
  ).toEqual(['SomeDuplicateName1', 'SomeDuplicateName', 'SomeDuplicateName2']);
});

it('ensureUniqueNames replaces duplicate names if they occur in the reserved words', () => {
  const uniqueItems = ensureUniqueNames(['reserved', 'reserved1'], {
    reservedWords: ['reserved']
  });

  expect(uniqueItems).toEqual(['reserved2', 'reserved1']);
});
