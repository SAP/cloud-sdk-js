import { createRefs } from '../../test/test-util';
import { parseOperationName, parseParameters } from './operation';

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
      name: 'anyParamWithSchema',
      schema: { type: 'string' }
    };
    const numberParam = {
      in: 'query',
      name: 'anyParamWithSchema',
      schema: { type: 'integer' }
    };

    expect(
      parseParameters(
        {
          parameters: [
            anyParamNoSchema,
            anyParamWithSchema,
            stringParam,
            numberParam
          ]
        },
        await createRefs()
      )
    ).toStrictEqual([
      { ...anyParamNoSchema, type: 'any' },
      { ...anyParamWithSchema, type: 'any' },
      { ...stringParam, type: 'string' },
      { ...numberParam, type: 'number' }
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
