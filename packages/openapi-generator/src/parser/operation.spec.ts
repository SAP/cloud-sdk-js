import { OpenAPIV3 } from 'openapi-types';
import { parseOperationName, getOperation } from './operation';

describe('parseOperationName', () => {
  it('parses the operation name from the operationId', () => {
    expect(
      parseOperationName({ operationId: 'testOperationId' }, 'pattern', 'get')
    ).toEqual('testOperationId');
  });

  it('parses the operation name from the description', () => {
    expect(
      parseOperationName({ description: 'Do something' }, 'pattern', 'get')
    ).toEqual('doSomething');
  });

  it('parses the operation name from the pattern and method', () => {
    expect(parseOperationName({}, '/entity', 'get')).toEqual('getEntity');
  });

  it('parses the operation name from the pattern and method for post', () => {
    expect(parseOperationName({}, '/entity/property', 'post')).toEqual(
      'createEntityProperty'
    );
  });

  it('parses the operation name from the pattern and method with one placeholders', () => {
    expect(
      parseOperationName({}, '/entity/{entityId}/property', 'get')
    ).toEqual('getEntityPropertyByEntityId');
  });

  it('parses the operation name from the pattern and method with multiple placeholders', () => {
    expect(
      parseOperationName({}, '/entity/{entityId}/property/{propertyId}', 'get')
    ).toEqual('getEntityPropertyByEntityIdAndPropertyId');
  });

  it('parses the operation name from the pattern and method with only placeholders', () => {
    expect(parseOperationName({}, '/{placeholder}', 'get')).toEqual(
      'getByPlaceholder'
    );
  });
});

describe('getOperation', () => {
  const operationParam = { in: 'query', name: 'operationParam' };
  const pathParam = { in: 'path', required: true, name: 'pathParam' };
  const pathItem: OpenAPIV3.PathItemObject = {
    get: { parameters: [operationParam] },
    parameters: [pathParam]
  };

  it('merges parameters', () => {
    expect(getOperation(pathItem, 'get').parameters).toStrictEqual([
      pathParam,
      operationParam
    ]);
  });

  it('throws an error if there is no operation for the given method', () => {
    expect(() =>
      getOperation(pathItem, 'post')
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not parse operation. Operation for method \'post\' does not exist."'
    );
  });
});
