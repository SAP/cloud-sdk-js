import { OpenAPIV3 } from 'openapi-types';
import { createTestRefs, emptyObjectSchema } from '../../test/test-util';
import { OpenApiParameter } from '../openapi-types';
import {
  parseParameters,
  getRelevantParameters,
  parsePathParameters,
  parsePathPattern
} from './operation';

const defaultOptions = { strictNaming: true };
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
        await createTestRefs()
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
        await createTestRefs({
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
        await createTestRefs()
      )
    ).toEqual([queryParam2, pathParam, queryParam1Replacement]);
  });
});

describe('parseParameters', () => {
  it('returns empty arrays if there are no parameters', async () => {
    expect(parseParameters([], await createTestRefs(), defaultOptions)).toEqual(
      []
    );
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
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual([
      {
        name: 'pathParam',
        originalName: 'pathParam',
        in: 'path',
        schema: emptyObjectSchema,
        schemaProperties: {}
      }
    ]);
  });
});

describe('parsePathParameters', () => {
  it('returns empty arrays if there are no parameters', async () => {
    expect(
      parsePathParameters([], await createTestRefs(), {
        strictNaming: false
      })
    ).toEqual([]);
  });

  it('parses multiple path parameters', async () => {
    const refs = await createTestRefs();
    const pathParam1: OpenAPIV3.ParameterObject = {
      name: 'param1',
      in: 'path',
      schema: { type: 'string' }
    };
    const pathParam2: OpenAPIV3.ParameterObject = {
      name: 'param2',
      in: 'path',
      schema: { type: 'string' }
    };
    expect(
      parsePathParameters([pathParam1, pathParam2], refs, {
        strictNaming: false
      })
    ).toEqual([
      { ...pathParam1, originalName: 'param1', schemaProperties: {} },
      { ...pathParam2, originalName: 'param2', schemaProperties: {} }
    ]);
  });
});

describe('parsePathTemplate', () => {
  it('returns the original path when there is no pattern', async () => {
    expect(parsePathPattern('/test', [])).toEqual('/test');
  });

  it('throws an error if the path parameters do not match placeholders', async () => {
    expect(() =>
      parsePathPattern('/test/{id}', [])
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not find path parameter for placeholder \'{id}\'."'
    );
  });

  it('throws an error if placeholders do not match path parameters', async () => {
    const parameters: OpenApiParameter[] = [
      {
        name: 'pathParam1',
        originalName: 'path-param-1',
        in: 'path',
        schema: { type: 'string' },
        schemaProperties: {}
      },
      {
        name: 'pathParam2',
        originalName: 'path-param-2',
        in: 'path',
        schema: { type: 'string' },
        schemaProperties: {}
      }
    ];
    expect(() =>
      parsePathPattern('/test/{path-param-1}', parameters)
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not find placeholder for path parameter(s) \'path-param-2\'."'
    );
  });

  it('parses path template for parameters', async () => {
    const parameters: OpenApiParameter[] = [
      {
        name: 'pathParam',
        originalName: 'path-param',
        in: 'path',
        schema: { type: 'string' },
        schemaProperties: {}
      },
      {
        name: 'pathParam1',
        originalName: 'pathParam',
        in: 'path',
        schema: { type: 'string' },
        schemaProperties: {}
      },
      {
        name: 'pathParam2',
        originalName: 'PathParam1',
        in: 'path',
        schema: { type: 'string' },
        schemaProperties: {}
      },
      {
        name: 'pathParam3',
        originalName: 'path_param',
        in: 'path',
        schema: { type: 'string' },
        schemaProperties: {}
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
