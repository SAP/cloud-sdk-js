import { OpenAPIV3 } from 'openapi-types';
import { createRefs, emptyObjectSchema } from '../../test/test-util';
import { parseParameters } from './parameters';

describe('parseParameters', () => {
  it('returns empty arrays if there are no parameters', async () => {
    expect(parseParameters({}, await createRefs())).toEqual({
      pathParameters: [],
      queryParameters: []
    });
  });

  it('resolves references', async () => {
    const refSchema: OpenAPIV3.ParameterObject = {
      name: 'refParam',
      in: 'query',
      schema: { type: 'object' }
    };
    expect(
      parseParameters(
        { parameters: [{ $ref: '#/components/parameters/RefSchema' }] },
        await createRefs({
          parameters: {
            RefSchema: refSchema
          }
        })
      )
    ).toEqual({
      pathParameters: [],
      queryParameters: [{ ...refSchema, schema: emptyObjectSchema }]
    });
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
        {
          parameters: [
            queryParam1,
            queryParam2,
            pathParam,
            queryParam1Replacement
          ]
        },
        await createRefs()
      )
    ).toEqual({
      pathParameters: [pathParam],
      queryParameters: [queryParam2, queryParam1Replacement]
    });
  });

  it('returns path parameters with unique camel case names', async () => {
    const parameters: OpenAPIV3.ParameterObject[] = [
      { name: 'path-param', in: 'path', schema: { type: 'string' } },
      { name: 'pathParam', in: 'path', schema: { type: 'string' } },
      { name: 'PathParam1', in: 'path', schema: { type: 'string' } },
      { name: 'path_param', in: 'path', schema: { type: 'string' } }
    ];
    expect(parseParameters({ parameters }, await createRefs())).toEqual({
      pathParameters: parameters.map((param, i) => ({
        ...param,
        name: 'pathParam' + (i ? i : '')
      })),
      queryParameters: []
    });
  });
});
