import { operationNameExtension } from '../extensions';
import { OperationInfo } from './parsing-info';
import {
  getOperationNameFromPatternAndMethod,
  nameOperations
} from './operation-naming';

it('nameOperations adds retrieves initial names for operations', () => {
  const uniqueOperations = nameOperations([
    { operation: { operationId: 'getX', summary: 'operation1' } },
    { method: 'get', pathPattern: '/x', operation: { summary: 'operation2' } },
    {
      operation: {
        [operationNameExtension]: 'nameFromExtension',
        summary: 'operation3'
      }
    }
  ] as OperationInfo[]);

  expect(uniqueOperations.map(({ operation }) => operation)).toEqual([
    expect.objectContaining({
      operationId: 'nameFromExtension',
      summary: 'operation3'
    }),
    { operationId: 'getX', summary: 'operation1' },
    { operationId: 'getX', summary: 'operation2' }
  ]);
});

it('nameOperations throws an error if there are duplicate extensions', () => {
  const operations = [
    {
      operation: {
        [operationNameExtension]: 'nameFromExtension',
        summary: 'operation1'
      }
    },
    {
      operation: {
        [operationNameExtension]: 'NameFromExtension',
        summary: 'operation2'
      }
    }
  ] as OperationInfo[];

  expect(() => nameOperations(operations)).toThrowErrorMatchingInlineSnapshot(
    "\"Operation name 'NameFromExtension' provided for 'x-sap-cloud-sdk-operation-name' resolves to 'nameFromExtension' and is not unique.\""
  );
});

describe('getOperationNameFromPatternAndMethod', () => {
  it('parses the operation name from the pattern and method', () => {
    expect(getOperationNameFromPatternAndMethod('/entity', 'get')).toEqual(
      'getEntity'
    );
  });

  it('parses the operation name from the pattern and method for post', () => {
    expect(
      getOperationNameFromPatternAndMethod('/entity/property', 'post')
    ).toEqual('createEntityProperty');
  });

  it('parses the operation name from the pattern and method with one placeholder', () => {
    expect(
      getOperationNameFromPatternAndMethod('/entity/{entityId}/property', 'get')
    ).toEqual('getEntityPropertyByEntityId');
  });

  it('parses the operation name from the pattern and method with multiple placeholders', () => {
    expect(
      getOperationNameFromPatternAndMethod(
        '/entity/{entityId}/property/{propertyId}',
        'get'
      )
    ).toEqual('getEntityPropertyByEntityIdAndPropertyId');
  });

  it('parses the operation name from the pattern and method with only placeholders', () => {
    expect(
      getOperationNameFromPatternAndMethod('/{placeholder}', 'get')
    ).toEqual('getByPlaceholder');
  });
});
