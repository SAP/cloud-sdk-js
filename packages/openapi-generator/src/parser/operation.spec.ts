import { OpenAPIV3 } from 'openapi-types';
import { createRefs, emptyObjectSchema } from '../../test/test-util';
import { OpenApiParameter } from '../openapi-types';
import {
  parseParameters,
  getRelevantParameters,
  parsePathParameters,
  parsePathPattern
} from './operation';

describe('getRelevantParameters', () => {
  it('ignores cookie and header parameters', async () => {
    expect(
      getRelevantParameters(
        [
          {
            name: 'param1',
            in: 'cookie',
            schema: { type: 'string' }
          },
          {
            name: 'param2',
            in: 'header',
            schema: { type: 'string' }
          }
        ],
        await createRefs()
      )
    ).toEqual([]);
  });

  it('resolves references', async () => {
    const refSchema: OpenAPIV3.ParameterObject = {
      name: 'refParam',
      in: 'query',
      schema: { type: 'object' }
    };
    expect(
      getRelevantParameters(
        [{ $ref: '#/components/parameters/RefSchema' }],
        await createRefs({
          parameters: {
            RefSchema: refSchema
          }
        })
      )
    ).toEqual([refSchema]);
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
      getRelevantParameters(
        [queryParam1, queryParam2, pathParam, queryParam1Replacement],
        await createRefs()
      )
    ).toEqual([queryParam2, pathParam, queryParam1Replacement]);
  });
});

describe('parseParameters', () => {
  it('returns empty arrays if there are no parameters', async () => {
    expect(parseParameters([], {} as any)).toEqual([]);
  });

  it('parses the parameter schema', async () => {
    expect(
      parseParameters(
        [
          {
            name: 'pathParam',
            in: 'path',
            schema: { type: 'object' }
          }
        ],
        {} as any
      )
    ).toEqual([
      {
        name: 'pathParam',
        originalName: 'pathParam',
        in: 'path',
        schema: emptyObjectSchema
      }
    ]);
  });
});

describe('parsePathParameters', () => {
  it('returns empty arrays if there are no parameters', async () => {
    expect(parsePathParameters([], '/test', {} as any)).toEqual([]);
  });

  it('throws an error if the parameters do not match the path pattern', async () => {
    expect(() =>
      parsePathParameters([], '/test/{id}', {} as any)
    ).toThrowErrorMatchingInlineSnapshot(
      '"Path parameter \'id\' provided in path is missing in path parameters."'
    );
  });

  it('returns path parameters with unique camel case names in correct order', async () => {
    const pathParam1: OpenAPIV3.ParameterObject = {
      name: 'pathParam',
      in: 'path',
      schema: { type: 'string' }
    };
    const pathParam2: OpenAPIV3.ParameterObject = {
      name: 'PathParam1',
      in: 'path',
      schema: { type: 'string' }
    };
    const pathParam3: OpenAPIV3.ParameterObject = {
      name: 'path-param',
      in: 'path',
      schema: { type: 'string' }
    };
    const pathParam4: OpenAPIV3.ParameterObject = {
      name: 'path_param',
      in: 'path',
      schema: { type: 'string' }
    };
    expect(
      parsePathParameters(
        [pathParam1, pathParam2, pathParam3, pathParam4],
        '/root/{path-param}/{pathParam}/path/{PathParam1}/sub-path/{path_param}',
        {} as any
      )
    ).toEqual(
      [pathParam3, pathParam1, pathParam2, pathParam4].map((param, i) => ({
        ...param,
        originalName: param.name,
        name: 'pathParam' + (i ? i : '')
      }))
    );
  });
});

describe('parsePathTemplate', () => {
  it('returns the original path when there is no pattern', async () => {
    expect(parsePathPattern('/test', [])).toEqual('/test');
  });

  it('throws an error if the path and parameters do not match', async () => {
    expect(() =>
      parsePathPattern('/test/{id}', [])
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not find parameter for placeholder \'{id}\'."'
    );
  });

  it('parses path template for parameters', async () => {
    const parameters: OpenApiParameter[] = [
      {
        name: 'pathParam',
        originalName: 'path-param',
        in: 'path',
        schema: { type: 'string' }
      },
      {
        name: 'pathParam1',
        originalName: 'pathParam',
        in: 'path',
        schema: { type: 'string' }
      },
      {
        name: 'pathParam2',
        originalName: 'PathParam1',
        in: 'path',
        schema: { type: 'string' }
      },
      {
        name: 'pathParam3',
        originalName: 'path_param',
        in: 'path',
        schema: { type: 'string' }
      }
    ];
    expect(
      parsePathPattern(
        '/root/{path-param}/{pathParam}/path/{PathParam1}/sub-path/{path_param}',
        parameters
      )
    ).toEqual(
      '/root/{pathParam}/{pathParam1}/path/{pathParam2}/sub-path/{pathParam3}'
    );
  });
});
