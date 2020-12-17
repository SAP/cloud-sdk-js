import { createRefs } from '../../test/test-util';
import {
  filterDuplicateParams,
  parseParameters,
  renameEquallyNamedParams
} from './parameters';

describe('parseParameters', () => {
  it('returns empty array if there are no parameters', async () => {
    expect(parseParameters({}, await createRefs())).toEqual([]);
  });

  it('parses inline parameters', async () => {
    const anyParamNoSchema = { in: 'query', name: 'anyParamNoSchema' };
    const anyParamWithSchema = {
      in: 'query',
      name: 'anyParamWithSchema',
      schema: {}
    };
    const stringParam = {
      in: 'query',
      name: 'stringParam',
      schema: { type: 'string' }
    };
    const numberParam = {
      in: 'query',
      name: 'numberParam',
      schema: { type: 'integer' }
    };
    const enumStringParam = {
      in: 'query',
      name: 'enumStringParam',
      schema: {
        type: 'string',
        enum: ['value1', 'value2']
      }
    };
    const enumNumberParam = {
      in: 'query',
      name: 'enumNumberParam',
      schema: {
        type: 'integer',
        enum: [1, 2]
      }
    };
    const enumBooleanParam = {
      in: 'query',
      name: 'enumBooleanParam',
      schema: {
        type: 'boolean',
        enum: ['true', 'false']
      }
    };

    expect(
      parseParameters(
        {
          parameters: [
            anyParamNoSchema,
            anyParamWithSchema,
            stringParam,
            numberParam,
            enumStringParam,
            enumNumberParam,
            enumBooleanParam
          ]
        },
        await createRefs()
      )
    ).toStrictEqual([
      { ...anyParamNoSchema, type: 'any' },
      { ...anyParamWithSchema, type: 'any' },
      { ...stringParam, type: 'string' },
      { ...numberParam, type: 'number' },
      { ...enumStringParam, type: "'value1' | 'value2'" },
      { ...enumNumberParam, type: '1 | 2' },
      { ...enumBooleanParam, type: 'boolean' }
    ]);
  });

  it('parses referenced parameters', async () => {
    const referencedParam = { in: 'query', name: 'referencedParam' };
    const parameterSchema = { $ref: '#/components/schemas/parameterSchema' };
    const referencedParamWithReferencedSchema = {
      in: 'query',
      name: 'referencedParamWithReferencedSchema',
      schema: parameterSchema
    };

    expect(
      parseParameters(
        {
          parameters: [
            {
              $ref: '#/components/parameters/referencedParam'
            },
            {
              $ref:
                '#/components/parameters/referencedParamWithReferencedSchema'
            }
          ]
        },
        await createRefs({
          parameters: { referencedParam, referencedParamWithReferencedSchema },
          schemas: { parameterSchema }
        })
      )
    ).toStrictEqual([
      { ...referencedParam, type: 'any' },
      { ...referencedParamWithReferencedSchema, type: 'any' }
    ]);
  });
});

describe('filterDuplicateParams', () => {
  it('removes duplicates from parameters, keeping the last elements only', () => {
    const queryParam1 = {
      name: 'param1',
      in: 'query'
    };
    const queryParam2 = {
      name: 'param2',
      in: 'query'
    };
    const pathParam1 = {
      name: 'param1',
      in: 'path'
    };
    const queryParam1Replacement = {
      name: 'param1',
      in: 'query',
      format: 'uuid'
    };

    expect(
      filterDuplicateParams([
        queryParam1,
        queryParam2,
        queryParam1Replacement,
        pathParam1
      ])
    ).toStrictEqual([queryParam2, queryParam1Replacement, pathParam1]);
  });
});

describe('renameEquallyNamedParams', () => {
  it('renames parameters', () => {
    expect(
      renameEquallyNamedParams([
        {
          name: 'name',
          in: 'query'
        },
        {
          name: 'name',
          in: 'path'
        }
      ])
    ).toStrictEqual([
      {
        name: 'name',
        in: 'query'
      },
      {
        name: 'name2',
        in: 'path'
      }
    ]);
  });
});
