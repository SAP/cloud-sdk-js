import { pascalCase } from '@sap-cloud-sdk/util';
import { ensureUniqueNames } from './unique-naming';

it('ensureUniqueNames replaces duplicate names using defaults (getName, setName, formatName)', () => {
  const uniqueItems = ensureUniqueNames([
    { name: 'someDuplicateName1', id: '1' },
    { name: 'someDuplicateName', id: '2' },
    { name: 'someDuplicateName', id: '3' }
  ]);

  expect(uniqueItems).toEqual([
    { name: 'someDuplicateName1', id: '1' },
    { name: 'someDuplicateName', id: '2' },
    { name: 'someDuplicateName2', id: '3' }
  ]);
});

it('ensureUniqueNames replaces duplicate names using pascal case', () => {
  const uniqueItems = ensureUniqueNames(
    [
      { name: 'someDuplicateName1', id: '1' },
      { name: 'SomeDuplicateName', id: '2' },
      { name: 'someDuplicateName', id: '3' }
    ],
    {
      formatName: pascalCase
    }
  );

  expect(uniqueItems).toEqual([
    { name: 'SomeDuplicateName1', id: '1' },
    { name: 'SomeDuplicateName', id: '2' },
    { name: 'SomeDuplicateName2', id: '3' }
  ]);
});

it('ensureUniqueNames replaces duplicate names if they occur in the reserved words', () => {
  const uniqueItems = ensureUniqueNames(
    [{ name: 'reserved' }, { name: 'reserved1' }],
    {
      reservedWords: ['reserved']
    }
  );

  expect(uniqueItems).toEqual([{ name: 'reserved2' }, { name: 'reserved1' }]);
});

it('ensureUniqueNames replaces duplicate names for operations', () => {
  const uniqueOperations = ensureUniqueNames(
    [
      { operation: { operationId: 'getX', summary: 'operation1' } },
      { operation: { operationId: 'getX', summary: 'operation2' } },
      { operation: { operationId: 'getX1', summary: 'operation3' } }
    ],
    {
      getName: ({ operation }) => operation.operationId!,
      transformItem: (operationInfo, operationId) => {
        operationInfo.operation.operationId = operationId;
        return operationInfo;
      }
    }
  );

  expect(uniqueOperations.map(({ operation }) => operation)).toEqual([
    { operationId: 'getX', summary: 'operation1' },
    { operationId: 'getX2', summary: 'operation2' },
    { operationId: 'getX1', summary: 'operation3' }
  ]);
});
