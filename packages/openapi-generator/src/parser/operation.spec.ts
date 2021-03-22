import { OpenAPIV3 } from 'openapi-types';
import { OpenApiParameter } from '../../dist/openapi-types';
import { createRefs, emptyObjectSchema } from '../../test/test-util';
import {
  getOperation,
  parseParameters,
  renamePathParametersAndPath
} from './operation';

describe('getOperation', () => {
  const operation = { operationId: 'someOperation' };
  const pathItem: OpenAPIV3.PathItemObject = {
    get: operation
  };

  it('retrieves the operation', () => {
    expect(getOperation(pathItem, 'get')).toStrictEqual(operation);
  });

  it('throws an error if there is no operation for the given method', () => {
    expect(() =>
      getOperation(pathItem, 'post')
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not parse operation. Operation for method \'post\' does not exist."'
    );
  });
});

describe('parseParameters', () => {
  it('returns empty arrays if there are no parameters', async () => {
    expect(parseParameters([], await createRefs())).toEqual([]);
  });

  it('resolves references', async () => {
    const refSchema: OpenAPIV3.ParameterObject = {
      name: 'refParam',
      in: 'query',
      schema: { type: 'object' }
    };
    expect(
      parseParameters(
        [{ $ref: '#/components/parameters/RefSchema' }],
        await createRefs({
          parameters: {
            RefSchema: refSchema
          }
        })
      )
    ).toEqual([{ ...refSchema, schema: emptyObjectSchema }]);
  });

  it('removes duplicates from parameters, keeping the last elements only', async () => {
    const queryParam1: OpenAPIV3.ParameterObject = {
      name: 'param1',
      in: 'query',
      schema: { type: 'string' }
    };
    const queryParam2: OpenAPIV3.ParameterObject = {
      name: 'param2',
      in: 'query',
      schema: { type: 'string' }
    };
    const pathParam: OpenAPIV3.ParameterObject = {
      name: 'param1',
      in: 'path',
      schema: { type: 'string' }
    };
    const queryParam1Replacement: OpenAPIV3.ParameterObject = {
      name: 'param1',
      in: 'query',
      example: 'test',
      schema: { type: 'string' }
    };
    expect(
      parseParameters(
        [queryParam1, queryParam2, pathParam, queryParam1Replacement],
        await createRefs()
      )
    ).toEqual([queryParam2, pathParam, queryParam1Replacement]);
  });
});

describe('renamePathParametersAndPath', () => {
  it('returns path parameters with unique camel case names', async () => {
    const parameters: OpenApiParameter[] = [
      { name: 'path-param', in: 'path', schema: { type: 'string' } },
      { name: 'pathParam', in: 'path', schema: { type: 'string' } },
      { name: 'PathParam1', in: 'path', schema: { type: 'string' } },
      { name: 'path_param', in: 'path', schema: { type: 'string' } }
    ];
    expect(
      renamePathParametersAndPath(
        '/root/{path-param}/{pathParam}/path/{PathParam1}/sub-path/{path_param}',
        parameters
      )
    ).toEqual({
      pathTemplate:
        // eslint-disable-next-line no-template-curly-in-string
        '/root/${pathParam}/${pathParam1}/path/${pathParam2}/sub-path/${pathParam3}',
      pathParameters: parameters.map((param, i) => ({
        ...param,
        name: 'pathParam' + (i ? i : '')
      }))
    });
  });
});
