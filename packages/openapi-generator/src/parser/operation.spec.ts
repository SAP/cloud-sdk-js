import { OpenAPIV3 } from 'openapi-types';
import { getOperation } from './operation';

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
